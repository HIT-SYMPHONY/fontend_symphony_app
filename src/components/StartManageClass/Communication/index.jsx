import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
// --- NEW: Import TanStack Query hooks ---
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { updateClassroom } from '../../../apis/classroom.api'
import { formatDate, safeParse } from '../../../utils/formatters'
import { useClassroomContext } from '../Information'
import TiptapEditor from '../../TiptapEditor'
import {
  DISPLAY_DATE_FORMAT,
  API_DATE_FORMAT,
} from '../../../constants/commonConstant'
import './style.scss'
import { classroomKeys } from 'constants/queryKeys'

const Communication = () => {
  const { classId } = useParams()
  const { classroom } = useClassroomContext()
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm()

  useEffect(() => {
    if (classroom) {
      const formData = {
        name: classroom.name || '',
        leaderId: classroom.leaderId || '',
        startTime: classroom.startTime ? dayjs(classroom.startTime) : null,
        endTime: classroom.endTime ? dayjs(classroom.endTime) : null,
        duration: classroom.duration || '',
        timeSlot: classroom.timeSlot || '',
        description: safeParse(classroom.description),
      }
      reset(formData)
    }
  }, [classroom, reset])
  const updateClassroomMutation = useMutation({
    mutationFn: (formData) => updateClassroom(classId, formData),
    onMutate: () => {
      const toastId = toast.loading('Đang cập nhật...')
      return toastId
    },
    onSuccess: (updatedData, variables, context) => {
      toast.success('Cập nhật thành công!', { id: context })
      setIsEditing(false)
      queryClient.invalidateQueries({ queryKey: classroomKeys.detail(classId) })
      queryClient.invalidateQueries({ queryKey: classroomKeys.lists() })
      queryClient.invalidateQueries({ queryKey: classroomKeys.summaries() });
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
      const errorMessage =
        typeof message === 'object'
          ? Object.values(message).join('; ')
          : message
      toast.error(errorMessage, { id: context })
    },
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    const formData = {
      name: classroom.name || '',
      leaderId: classroom.leaderId || '',
      startTime: classroom.startTime ? dayjs(classroom.startTime) : null,
      endTime: classroom.endTime ? dayjs(classroom.endTime) : null,
      duration: classroom.duration || '',
      timeSlot: classroom.timeSlot || '',
      description: safeParse(classroom.description),
    }
    reset(formData)
    setIsEditing(false)
  }
  const onSubmit = (data) => {
    const updatePayload = {
      ...classroom,
      name: data.name,
      startTime: data.startTime ? data.startTime.format(API_DATE_FORMAT) : null,
      endTime: data.endTime ? data.endTime.format(API_DATE_FORMAT) : null,
      duration: parseInt(data.duration),
      leaderId: data.leaderId,
      timeSlot: data.timeSlot,
      description: data.description ? JSON.stringify(data.description) : '',
    }

    delete updatePayload.id
    delete updatePayload.status
    delete updatePayload.createdAt
    delete updatePayload.leaderName

    const submissionData = new FormData()
    submissionData.append(
      'data',
      new Blob([JSON.stringify(updatePayload)], { type: 'application/json' }),
    )

    updateClassroomMutation.mutate(submissionData)
  }

  if (!classroom) {
    return <div>Đang tải thông tin...</div>
  }

  const { isPending: isSubmitting } = updateClassroomMutation

  return (
    <div className='manage-infor__context-infor'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='manage-infor__context-infor-form'>
        <div className='manage-infor__context-infor__title'>
          <div className='title-com'>
            <i className='fa-solid fa-circle-info title-com__i'></i>
            <h3>Thông tin lớp học</h3>
          </div>
        </div>
        <div className='manage-infor__context-infor__context'>
          <div className='manage-infor__context-infor__context__box'>
            <div className='box'>
              <h5>Tên lớp học</h5>
              {isEditing ? (
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => <input type='text' {...field} />}
                />
              ) : (
                <span>{classroom.name}</span>
              )}
            </div>
            <div className='box'>
              <h5>Tên Leader</h5>
              <span>{classroom.leaderName}</span>
            </div>
          </div>
          <div className='manage-infor__context-infor__context__box'>
            <div className='box'>
              <h5>Ngày bắt đầu</h5>
              {isEditing ? (
                <Controller
                  name='startTime'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format={DISPLAY_DATE_FORMAT}
                      placeholder='Chọn ngày bắt đầu'
                      className='ant-picker-custom'
                    />
                  )}
                />
              ) : (
                <span>{formatDate(classroom.startTime)}</span>
              )}
            </div>
            <div className='box'>
              <h5>Ngày kết thúc</h5>
              {isEditing ? (
                <Controller
                  name='endTime'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format={DISPLAY_DATE_FORMAT}
                      placeholder='Chọn ngày kết thúc'
                      className='ant-picker-custom'
                    />
                  )}
                />
              ) : (
                <span>{formatDate(classroom.endTime)}</span>
              )}
            </div>
            <div className='box'>
              <h5>Độ dài lớp học (tuần)</h5>
              {isEditing ? (
                <Controller
                  name='duration'
                  control={control}
                  render={({ field }) => <input type='number' {...field} />}
                />
              ) : (
                <span>{classroom.duration}</span>
              )}
            </div>
            <div className='box'>
              <h5>Lịch học</h5>
              {isEditing ? (
                <Controller
                  name='timeSlot'
                  control={control}
                  render={({ field }) => <input type='text' {...field} />}
                />
              ) : (
                <span>{classroom.timeSlot || 'N/A'}</span>
              )}
            </div>
          </div>
          <h5>Mô tả:</h5>
          <div className='manage-infor__context-infor__context__item'>
            {isEditing ? (
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <TiptapEditor value={field.value} onChange={field.onChange} />
                )}
              />
            ) : (
              <div className='description-display'>
                <TiptapEditor value={classroom.description} editable={false} />
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <div className='edit-actions'>
            <button
              type='submit'
              className='manage-infor__context-save-btn manage-infor__context-btn'
              disabled={!isDirty || isSubmitting}>
              <Icon icon='material-symbols:save' width='15' height='15' />{' '}
              {isSubmitting ? 'Đang lưu...' : 'Lưu'}
            </button>
            <button
              type='button'
              className='manage-infor__context-cancel-btn manage-infor__context-btn'
              onClick={handleCancel}>
              <Icon
                icon='material-symbols:cancel-outline'
                width='15'
                height='15'
              />{' '}
              Hủy
            </button>
          </div>
        ) : (
          <button
            type='button'
            className='manage-infor__context-edit-btn manage-infor__context-btn'
            onClick={handleEdit}>
            <Icon icon='iconamoon:edit-fill' width='15' height='15' /> Chỉnh sửa
          </button>
        )}
      </form>
    </div>
  )
}

export default Communication
