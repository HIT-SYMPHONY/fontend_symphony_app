import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { competitionCreationSchema } from '../../../../utils/competitionValidate.js'
import { createCompetition } from '../../../../apis/competition.api'
import { getLeaderList } from '../../../../apis/user.api'
import './style.scss'

const CreateOfCompetAdmin = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(competitionCreationSchema),
  })

  const [loading, setLoading] = useState(false)
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ cho phép hình ảnh PNG, JPG, JPEG, WEBP hoặc GIF')
        return
      }
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const submissionPayload = {
      name: data.name,
      description: data.description,
      rule: data.rule,
      content: data.content,
      competitionLeaderId: data.competitionLeaderId,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    }
    const submissionData = new FormData()
    submissionData.append(
      'data',
      new Blob([JSON.stringify(submissionPayload)], { type: 'application/json' }),
    )
    if (imageFile) {
      submissionData.append('image', imageFile)
    }
    const creationToast = toast.loading('Đang tạo cuộc thi...')
    try {
      await createCompetition(submissionData)
      toast.success('Tạo cuộc thi thành công!', { id: creationToast })
    } catch (error) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo cuộc thi.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: creationToast,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='create-compet-admin'>
      <div className='create-compet-admin__header'>
        <i
          className='create-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competitions')}></i>
        <button
          className='mainofcompet__create-button'
          onClick={() => navigate('/admin/competitions/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
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
              {errors.name && <span className='error-message'>{errors.name.message}</span>}

              <div className='create-compet-admin__context-enter__left-time'>
                <div>
                  <span>Ngày bắt đầu</span>
                  <input type='datetime-local' {...register('startTime')} />
                  {errors.startTime && (
                    <span className='error-message'>{errors.startTime.message}</span>
                  )}
                </div>
                <div>
                  <span>Ngày kết thúc</span>
                  <input type='datetime-local' {...register('endTime')} />
                  {errors.endTime && (
                    <span className='error-message'>{errors.endTime.message}</span>
                  )}
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

              <span>Giới thiệu </span>
              <textarea
                placeholder='Nhập giới thiệu'
                className='create-compet-admin__context-enter__left-textarea'
                {...register('description')}></textarea>
            </div>

            <div className='create-compet-admin__context-enter__right'>
              <span>Leader (Phụ trách)</span>
              <select {...register('competitionLeaderId')}>
                <option value=''>-- Chọn người phụ trách --</option>
                {leaders.map((leader) => (
                  <option key={leader.id} value={leader.id}>
                    {leader.fullName}
                  </option>
                ))}
              </select>
              {errors.competitionLeaderId && (
                <span className='error-message'>{errors.competitionLeaderId.message}</span>
              )}

              <span>Thể lệ</span>
              <textarea
                placeholder='Nhập thể lệ'
                className='create-compet-admin__context-enter__right-textarea'
                {...register('rule')}></textarea>
            </div>
          </div>

          <div className='create-compet-admin__context-content'>
            <label htmlFor='content'>Đề thi</label>
            <br />
            <textarea id='content' placeholder='Nhập đề thi' {...register('content')}></textarea>
            {errors.content && <span className='error-message'>{errors.content.message}</span>}
          </div>

          <div className='create-compet-admin__context-button'>
            <button type='submit' disabled={loading}>
              {loading ? 'Đang tạo...' : 'Tạo'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateOfCompetAdmin
