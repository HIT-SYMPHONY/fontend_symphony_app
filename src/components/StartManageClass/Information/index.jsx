import React, { useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { Outlet, useParams, useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import useFetch from '../../../hooks/useFetch'
import { ApiConstant } from '../../../constants/api.constant'
import './style.scss'

const InformationManage = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    data: classroomResponse,
    loading,
    error,
    refetch,
  } = useFetch(classId ? `${ApiConstant.classrooms.getById}${classId}` : null)

  useEffect(() => {
    if (error) {
      toast.error(error.response?.data?.message || 'Không thể tải dữ liệu lớp học.')
      navigate('/manage/classes')
    }
  }, [error, navigate])

  const getCurrentSection = useMemo(() => {
    const path = location.pathname
    if (path.includes('/notifications')) return 'notifications'
    if (path.includes('/lessons')) return 'lessons'
    if (path.includes('/tests')) return 'tests'
    if (path.includes('/members')) return 'members'
    return '' 
  }, [location.pathname])

  const createPath = useMemo(() => {
    switch (getCurrentSection) {
      case 'notifications':
        return `/manage/classes/${classId}/notifications/create`
      case 'lessons':
        return `/manage/classes/${classId}/lessons/create`
      default:
        return null
    }
  }, [getCurrentSection, classId])

  const handleNavigation = (e) => {
    const sectionPath = e.target.value
    const basePath = `/manage/classes/${classId}`
    navigate(sectionPath ? `${basePath}/${sectionPath}` : basePath)
  }

  const handleCreateClick = () => {
    if (createPath) {
      navigate(createPath)
    }
  }

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải thông tin lớp học...</div>
  }

  if (!classroomResponse?.data) {
    return null
  }

  const classroom = classroomResponse.data

  return (
    <div className='manage-infor'>
      <div className='manage-infor__title'>
        <Icon
          icon='mdi:book-account'
          width='30'
          height='30'
          className='manage-infor__title__icon'
        />
        <h2>Quản lý lớp học: {classroom.name}</h2>
      </div>

      <div className='manage-infor__search'>
        <i className='fa-solid fa-arrow-left' onClick={() => navigate(-1)} />
        <select
          className='manage-infor__search__select'
          name='category'
          value={getCurrentSection}
          onChange={handleNavigation}>
          <option value=''>Thông tin lớp học</option>
          <option value='notifications'>Thông báo</option>
          <option value='lessons'>Bài học</option>
          <option value='tests'>Kiểm Tra</option>
          <option value='members'>Danh sách sinh viên</option>
        </select>
        <div className='manage-infor__search__container'>
          <input
            type='text'
            placeholder='Nhập tìm kiếm...'
            className='manage-infor__search__input'
          />
          <i className='fa-solid fa-magnifying-glass manage-infor__search__icon' />
        </div>

        <button
          className='manage-infor__search__button'
          onClick={handleCreateClick}
          disabled={!createPath}>
          <i className='fa-solid fa-plus'></i> <span>Tạo mới</span>
        </button>
      </div>

      <Outlet context={{ classroom, refetchClassroom: refetch }} />
    </div>
  )
}

export function useClassroomContext() {
  return useOutletContext()
}

export default InformationManage
