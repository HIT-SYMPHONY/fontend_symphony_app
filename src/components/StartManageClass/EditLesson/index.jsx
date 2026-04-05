import React, { useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Select, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { lessonUpdateSchema } from '../../../utils/lessonValidate.js'
import { getLessonById, updateLesson } from '../../../apis/lesson.api'
import { safeParse } from '../../../utils/formatters.js'
import TiptapEditor from '../../TiptapEditor'
import TextMessage from '../../TextMessage'
import '../ManageLesson/style.scss'
import { DISPLAY_TIME_FORMAT, API_TIME_FORMAT } from 'constants/commonConstant.js'
import { lessonKeys } from 'constants/queryKeys.js'

const EditLesson = () => {
  const navigate = useNavigate()
  const { classId, lessonId } = useParams()
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(lessonUpdateSchema),
    mode: 'onTouched',
  })

  const { data: lesson, isLoading: isPageLoading } = useQuery({
    queryKey: lessonKeys.detail(lessonId),
    queryFn: async () => {
      if (!lessonId) return null
      const response = await getLessonById(lessonId)
      return response.data
    },
    enabled: !!lessonId,
    onError: () => {
      toast.error('Không thể tải thông tin bài học.')
    },
  })

  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title || '',
        location: lesson.location || '',
        startTime: lesson.startTime ? dayjs(lesson.startTime, API_TIME_FORMAT) : null,
        endTime: lesson.endTime ? dayjs(lesson.endTime, API_TIME_FORMAT) : null,
        dayOfWeek: lesson.dayOfWeek || 'MONDAY',
        content: safeParse(lesson.content),
      })
    }
  }, [lesson, reset])

  const updateLessonMutation = useMutation({
    mutationFn: (payload) => updateLesson(lessonId, payload),
    onMutate: () => toast.loading('Đang cập nhật bài học...'),
    onSuccess: (updatedData, variables, context) => {
      toast.success('Cập nhật bài học thành công!', { id: context })
   queryClient.invalidateQueries({ queryKey: lessonKeys.detail(lessonId) })
      queryClient.invalidateQueries({ queryKey: lessonKeys.byClassroom(classId) })
      navigate(`/manage/classes/${classId}/lessons`)
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
      startTime: data.startTime ? data.startTime.format(API_TIME_FORMAT) : null,
      endTime: data.endTime ? data.endTime.format(API_TIME_FORMAT) : null,
      content: data.content ? JSON.stringify(data.content) : '',
    }
    updateLessonMutation.mutate(payload)
  }

  const dayOfWeekOptions = useMemo(
    () => [
      { value: 'MONDAY', label: 'Thứ 2' },
      { value: 'TUESDAY', label: 'Thứ 3' },
      { value: 'WEDNESDAY', label: 'Thứ 4' },
      { value: 'THURSDAY', label: 'Thứ 5' },
      { value: 'FRIDAY', label: 'Thứ 6' },
      { value: 'SATURDAY', label: 'Thứ 7' },
      { value: 'SUNDAY', label: 'Chủ nhật' },
    ],
    [],
  )

  if (isPageLoading) {
    return <TextMessage text='Đang tải bài học...' />
  }

  const { isPending: isSubmitting } = updateLessonMutation

  return (
    <div className='createlesson'>
      <div className='createlesson__start'>
        <i
          className='fa-solid fa-arrow-left createlesson__back-icon'
          onClick={() => navigate(`/manage/classes/${classId}/lessons`)}></i>
        <Icon
          icon='material-symbols:book-2-rounded'
          width='30'
          height='30'
          className='createlesson__start__icon'
        />
        <h3>Chỉnh sửa bài học</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='createlesson__context'>
          <div className='createlesson__title'>
            <div className='createlesson__wrapper'>
              <label htmlFor='title'>Tên bài học</label>
              <input
                type='text'
                placeholder='Nhập tên bài học... '
                className='createlesson__context__input'
                id='title'
                {...register('title')}
              />
              {errors.title && <span className='error-message'>{errors.title.message}</span>}
            </div>
            <div className='createlesson__wrapper'>
              <label htmlFor='location'>Địa điểm</label>
              <input
                placeholder='Nhập địa điểm...'
                type='text'
                id='location'
                className='createlesson__context__input'
                {...register('location')}
              />
              {errors.location && <span className='error-message'>{errors.location.message}</span>}
            </div>
          </div>

          <div className='createlesson__time'>
            <div className='createlesson__time-wrap'>
              <label>Thời gian bắt đầu</label>
              <Controller
                name='startTime'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TimePicker
                      {...field}
                      format={DISPLAY_TIME_FORMAT}
                      placeholder='Chọn giờ'
                      className='ant-picker-custom'
                      status={error ? 'error' : ''}
                    />
                    {error && <span className='error-message'>{error.message}</span>}
                  </>
                )}
              />
            </div>
            <div className='createlesson__time-wrap'>
              <label>Thời gian kết thúc</label>
              <Controller
                name='endTime'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TimePicker
                      {...field}
                      format={DISPLAY_TIME_FORMAT}
                      placeholder='Chọn giờ'
                      className='ant-picker-custom'
                      status={error ? 'error' : ''}
                    />
                    {error && <span className='error-message'>{error.message}</span>}
                  </>
                )}
              />
            </div>
            <div className='createlesson__time-wrap'>
              <label>Ngày học</label>
              <Controller
                name='dayOfWeek'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      options={dayOfWeekOptions}
                      className='ant-select-custom'
                      status={error ? 'error' : ''}
                    />
                    {error && <span className='error-message'>{error.message}</span>}
                  </>
                )}
              />
            </div>
          </div>
          <label htmlFor='content'>Nội dung</label>
          <Controller
            name='content'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
            )}
          />
        </div>

        <div className='createlesson__end'>
          <button type='submit' className='createlesson__end__submit'>
            {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditLesson
