import React from 'react'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNotification } from 'apis/classroom.api'
import './style.scss'
import { classroomKeys } from 'constants/queryKeys'

const schema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tiêu đề'),
  content: yup.string().required('Vui lòng nhập nội dung'),
})

const CreateNotification = () => {
  const { classId } = useParams()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      content: '',
    },
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data) => {
      return createNotification(classId, data)
    },
    onMutate: () => {
      return toast.loading('Đang tạo thông báo...')
    },
    onSuccess: (data, variables, context) => {
      toast.success('Tạo thông báo thành công!', { id: context })
      reset()
      queryClient.invalidateQueries({
        queryKey: classroomKeys.notifications(classId),
      })
    },
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra', {
        id: context,
      })
    },
  })

  const onSubmit = (data) => {
    if (!classId) {
      toast.error('Không tìm thấy ID lớp học')
      return
    }
    mutation.mutate(data)
  }

  return (
    <div className='memberclass'>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'contents' }}>
        <div className='memberclass__title'>
          <div className='memberclass__title__tap'>
            <Icon
              icon='mingcute:notification-newdot-fill'
              width='30'
              height='30'
              className='memberclass__title__tap__icon'
            />
            <h2>Tạo Thông báo Mới</h2>
          </div>
          <button
            type='submit'
            className='memberclass__title__button'
            disabled={mutation.isPending}>
            {mutation.isPending ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
        <div className='memberclass__context'>
          <span>Tiêu đề</span>
          <input
            type='text'
            placeholder='Nhập tiêu đề thông báo...'
            {...register('title')}
          />
          {errors.title && (
            <span style={{ color: 'red' }}>{errors.title.message}</span>
          )}

          <span>Nội dung</span>
          <textarea
            className='memberclass__context__textarea'
            rows='5'
            placeholder='Nhập nội dung thông báo...'
            {...register('content')}></textarea>
          {errors.content && (
            <span style={{ color: 'red' }}>{errors.content.message}</span>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreateNotification
