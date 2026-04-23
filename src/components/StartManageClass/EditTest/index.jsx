import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { postCreationSchema } from '../../../utils/postValidate.js'
import { getPostById, updatePost } from '../../../apis/post.api'
import { safeParse } from '../../../utils/formatters.js'
import TiptapEditor from '../../TiptapEditor'
import TextMessage from '../../TextMessage'
import { DISPLAY_DATETIME_FORMAT, API_DATETIME_FORMAT } from '../../../constants/commonConstant'
import '../../StartManageClass/CreateTest/style.scss'
import { postKeys } from 'constants/queryKeys.js'

const EditTest = () => {
  const navigate = useNavigate()
  const { classId, testId } = useParams()
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(postCreationSchema),
    mode: 'onTouched',
  })
  const { data: test, isLoading: isPageLoading } = useQuery({
    queryKey: postKeys.detail(testId),
    queryFn: async () => {
      if (!testId) return null
      const response = await getPostById(testId)
      return response.data
    },
    enabled: !!testId,
    onError: () => {
      toast.error('Không thể tải thông tin bài kiểm tra.')
    },
  })

  useEffect(() => {
    if (test) {
      reset({
        title: test.title || '',
        deadline: test.deadline ? dayjs(test.deadline) : null,
        content: safeParse(test.content),
      })
    }
  }, [test, reset])

  const updateTestMutation = useMutation({
    mutationFn: (payload) => updatePost(testId, payload),
    onMutate: () => toast.loading('Đang cập nhật bài kiểm tra...'),
    onSuccess: (updatedData, variables, context) => {
      toast.success('Cập nhật thành công!', { id: context })
      // Invalidate queries to trigger automatic refetches
      queryClient.invalidateQueries({ queryKey: postKeys.detail(testId) })
      queryClient.invalidateQueries({ queryKey: postKeys.byClassroom(classId) })
      navigate(`/manage/classes/${classId}/tests`)
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: context,
      })
    },
  })

  const onSubmit = (data) => {
    const payload = {
      ...data,
      deadline: data.deadline ? data.deadline.format(API_DATETIME_FORMAT) : null,
      content: data.content ? JSON.stringify(data.content) : '',
    }
    updateTestMutation.mutate(payload)
  }

  if (isPageLoading) {
    return <TextMessage text='Đang tải bài kiểm tra...' />
  }

  const { isPending: isSubmitting } = updateTestMutation

  return (
    <div className='createtest'>
      <div className='createtest__start'>
        <i
          className='fa-solid fa-arrow-left createlesson__back-icon'
          onClick={() => navigate(`/manage/classes/${classId}/tests`)}></i>
        <Icon
          icon='material-symbols:book-2-rounded'
          width='30'
          height='30'
          className='createtest__start__icon'
        />
        <h3>Chỉnh sửa bài kiểm tra</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='createtest__context'>
          <h4>Tiêu đề</h4>
          <input
            type='text'
            placeholder='Nhập tiêu đề bài tập...'
            className='createtest__context__input'
            {...register('title')}
          />
          {errors.title && <span className='error-message'>{errors.title.message}</span>}

          <div className='createtest__context__time'>
            <div className='createtest__context__time__box'>
              <h4>Ngày giao</h4>
              {/* Display the created date from the fetched data */}
              <span>
                {test?.createdAt ? new Date(test.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
              </span>
            </div>
            <div className='createtest__context__time__box'>
              <h4>Deadline</h4>
              <Controller
                name='deadline'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      {...field}
                      showTime
                      format={DISPLAY_DATETIME_FORMAT}
                      placeholder='Chọn hạn nộp'
                      className='ant-picker-custom'
                      status={error ? 'error' : ''}
                    />
                    {error && <span className='error-message'>{error.message}</span>}
                  </>
                )}
              />
            </div>
          </div>
          <h4>Nội dung</h4>
          <Controller
            name='content'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
            )}
          />
        </div>

        <div className='createtest__end'>
          <button
            type='submit'
            className='createtest__end__submit'
            disabled={!isDirty || isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTest
