import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { competitionCreationSchema } from '../../../../utils/competitionValidate.js'
import { createCompetition } from '../../../../apis/competition.api'
import { getLeaderList } from '../../../../apis/user.api'
import { getDisplayName } from '../../../../utils/formatters.js'
import TiptapEditor from '../../../TiptapEditor'
import { DISPLAY_DATETIME_FORMAT, API_DATETIME_FORMAT } from '../../../../constants/commonConstant.js'
import './style.scss'
import { competitionKeys } from 'constants/queryKeys.js'
import { useQueryClient } from '@tanstack/react-query'



const CreateOfCompetAdmin = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control, 
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(competitionCreationSchema),
    mode: 'onTouched',
  })
  const queryClient = useQueryClient()
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)
  const [leaders, setLeaders] = useState([])

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await getLeaderList()
        setLeaders(response.data || [])
      } catch (error) {
        toast.error('Không thể tải danh sách người phụ trách.')
      }
    }
    fetchLeaders()
  }, [])
  const leaderOptions = useMemo(() => {
    return leaders.map((leader) => ({
      value: leader.id,
      label: `${getDisplayName(leader)} (${leader.studentCode})`,
    }))
  }, [leaders])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ cho phép tệp hình ảnh.')
        e.target.value = null
        return
      }
      setImageFile(file)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data) => {
    const creationToast = toast.loading('Đang tạo cuộc thi...')
    const submissionPayload = {
      name: data.name,
      competitionLeaderId: data.competitionLeaderId,
      startTime: data.startTime ? data.startTime.format(API_DATETIME_FORMAT) : null,
      endTime: data.endTime ? data.endTime.format(API_DATETIME_FORMAT) : null,
      description: data.description ? JSON.stringify(data.description) : '',
      rule: data.rule ? JSON.stringify(data.rule) : '',
      content: data.content ? JSON.stringify(data.content) : '',
    }

    const submissionData = new FormData()
    submissionData.append(
      'data',
      new Blob([JSON.stringify(submissionPayload)], { type: 'application/json' }),
    )
    if (imageFile) {
      submissionData.append('image', imageFile)
    }

    try {
      await createCompetition(submissionData)
      toast.success('Tạo cuộc thi thành công!', { id: creationToast })
      queryClient.invalidateQueries({ queryKey: competitionKeys.lists() })
      navigate('/admin/competitions')
    } catch (error) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo cuộc thi.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: creationToast,
      })
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div className='create-compet-admin'>
      <div className='create-compet-admin__header'>
        <i
          className='create-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate(-1)}></i>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='create-compet-admin__context'>
          <div className='create-compet-admin__context-title'>
            <i className='fa-solid fa-plus'></i>
            <h2>Tạo cuộc thi</h2>
          </div>

          <div className='create-compet-admin__context-enter'>
            <div className='create-compet-admin__context-enter__left'>
              <span>Tên cuộc thi</span>
              <input type='text' {...register('name')} />
              {errors.name && <p className='error-message'>{errors.name.message}</p>}

              <div className='create-compet-admin__context-enter__left-time'>
                <div>
                  <span>Ngày bắt đầu</span>
                  <Controller
                    name='startTime'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <DatePicker
                          {...field}
                          showTime
                          format={DISPLAY_DATETIME_FORMAT}
                          placeholder='Chọn ngày giờ'
                          className='ant-picker-custom'
                          status={error ? 'error' : ''}
                        />
                        {error && <p className='error-message'>{error.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div>
                  <span>Ngày kết thúc</span>
                  <Controller
                    name='endTime'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <DatePicker
                          {...field}
                          showTime
                          format={DISPLAY_DATETIME_FORMAT}
                          placeholder='Chọn ngày giờ'
                          className='ant-picker-custom'
                          status={error ? 'error' : ''}
                        />
                        {error && <p className='error-message'>{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              </div>

              <span>Ảnh bìa cuộc thi</span>
              {!previewUrl ? (
                <div
                  className='create-compet-admin__context-enter__left-upload'
                  onClick={() => fileInputRef.current.click()}>
                  <Icon icon='ic:round-upload' className='upload-icon' />
                  <span>Tải ảnh lên</span>
                </div>
              ) : (
                <img
                  src={previewUrl}
                  alt='Ảnh bìa'
                  className='create-compet-admin__context-enter__left-upload-preview'
                  onClick={() => fileInputRef.current.click()}
                />
              )}
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <span>Giới thiệu</span>
              <Controller
                name='description'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
                )}
              />
            </div>

            <div className='create-compet-admin__context-enter__right'>
              <span>Leader (Phụ trách)</span>
              <Controller
                name='competitionLeaderId'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      placeholder='-- Chọn người phụ trách --'
                      options={leaderOptions}
                      listHeight={200}
                      status={error ? 'error' : ''}
                      className='ant-select-custom'
                    />
                    {error && <p className='error-message'>{error.message}</p>}
                  </>
                )}
              />

              <span>Thể lệ</span>
              <Controller
                name='rule'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
                )}
              />
            </div>
          </div>

          <div className='create-compet-admin__context-content'>
            <label htmlFor='content'>Đề thi</label>
            <br />
            <Controller
              name='content'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
              )}
            />
          </div>

          <div className='create-compet-admin__context-button'>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Đang tạo...' : 'Tạo cuộc thi'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateOfCompetAdmin
