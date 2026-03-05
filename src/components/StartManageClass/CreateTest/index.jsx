import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DatePicker } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import { postCreationSchema } from '../../../utils/postValidate'
import { createPost } from '../../../apis/post.api'
import TiptapEditor from '../../TiptapEditor'
import { DISPLAY_DATETIME_FORMAT, API_DATETIME_FORMAT } from '../../../constants/commonConstant'
import './style.scss'

const CreateTest = () => {
  const navigate = useNavigate()
  const { classId } = useParams()
  const queryClient = useQueryClient()

  const [currentDate, setCurrentDate] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postCreationSchema),
    defaultValues: {
      classRoomId: classId,
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString('vi-VN')
    setCurrentDate(formattedDate)
  }, [])

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onMutate: () => toast.loading('Đang tạo bài tập...'),
    onSuccess: (data, variables, context) => {
      toast.success('Tạo bài tập thành công!', { id: context })
      queryClient.invalidateQueries({ queryKey: ['tests', classId] })
      navigate(`/manage/classes/${classId}/tests`)
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo bài tập.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: context,
      })
    },
  })

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      classRoomId: data.classRoomId,
      deadline: data.deadline ? data.deadline.format(API_DATETIME_FORMAT) : null,
      content: data.content ? JSON.stringify(data.content) : '',
    }
    createPostMutation.mutate(payload)
  }

  const { isPending: isSubmitting } = createPostMutation

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
        <h3>Kiểm tra / Bài tập</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='createtest__form'>
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
              <span>{currentDate}</span>
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
          <button type='submit' className='createtest__end__submit' disabled={isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTest