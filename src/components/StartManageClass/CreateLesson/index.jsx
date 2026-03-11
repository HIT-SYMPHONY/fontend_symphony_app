import React, { useMemo } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { Select, TimePicker } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { lessonCreationSchema } from '../../../utils/lessonValidate.js'
import { createLesson } from '../../../apis/lesson.api'
import TiptapEditor from '../../TiptapEditor'
import { DISPLAY_TIME_FORMAT, API_TIME_FORMAT } from 'constants/commonConstant.js'
import './style.scss'

const CreateLessonID = () => {
  const navigate = useNavigate()
  const { classId } = useParams()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(lessonCreationSchema),
    defaultValues: {
      classRoomId: classId,
      dayOfWeek: 'MONDAY',
    },
    mode: 'onTouched',
  })
  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onMutate: () => {
      const toastId = toast.loading('Đang tạo bài học...')
      return toastId
    },
    onSuccess: (data, variables, context) => {
      toast.success('Tạo bài học thành công!', { id: context })
      queryClient.invalidateQueries({ queryKey: ['lessons', classId] })
      navigate(`/manage/classes/${classId}/lessons`)
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo bài học.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: context,
      })
    },
  })
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

  const onSubmit = (data) => {
    const payload = {
      ...data,
      startTime: data.startTime ? data.startTime.format(API_TIME_FORMAT) : null,
      endTime: data.endTime ? data.endTime.format(API_TIME_FORMAT) : null,
      content: data.content ? JSON.stringify(data.content) : '',
    }
    console.log(content)
    createLessonMutation.mutate(payload)
  }

  const { isPending: isSubmitting } = createLessonMutation

  return (
    <div className='createlesson'>
      <div className='createlesson__start'>
        <Icon
          icon='material-symbols:book-2-rounded'
          width='30'
          height='30'
          className='createlesson__start__icon'
        />
        <h3>Bài học</h3>
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
              <label htmlFor='startTime'>Thời gian bắt đầu</label>
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
              <label htmlFor='endTime'>Thời gian kết thúc</label>
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
              <label htmlFor='dayOfWeek'>Ngày học</label>
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
          <button type='submit' className='createlesson__end__submit' disabled={isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateLessonID
