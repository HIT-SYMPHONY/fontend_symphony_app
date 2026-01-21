import React, { useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { Outlet, useParams, useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { getClassroomById } from '../../../apis/classroom.api'
import NavigationDropdown from '../../NavigationDropdown'
import TextMessage from '../../TextMessage'
import './style.scss'

const InformationManage = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    data: classroom,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['classroom', classId],
    queryFn: async () => {
      if (!classId) return null
      const response = await getClassroomById(classId)
      return response.data
    },
    enabled: !!classId,
    refetchOnWindowFocus: false,
  })

  const linkOptions = useMemo(() => {
    if (!classId) return []
    const basePath = `/manage/classes/${classId}`
    return [
      { option: 'Thông tin lớp học', link: basePath },
      { option: 'Thông báo', link: `${basePath}/notifications` },
      { option: 'Bài học', link: `${basePath}/lessons` },
      { option: 'Bài tập / Kiểm Tra', link: `${basePath}/tests` },
      { option: 'Danh sách sinh viên', link: `${basePath}/members` },
    ]
  }, [classId])

  useEffect(() => {
    if (isError) {
      toast.error(error.response?.data?.message || 'Không thể tải dữ liệu lớp học.')
      navigate('/manage/classes')
    }
  }, [isError, error, navigate])

  const createPath = useMemo(() => {
    const path = location.pathname
    if (path.endsWith('/create')) return null
    if (path.includes('/notifications')) return `/manage/classes/${classId}/notifications/create`
    if (path.includes('/lessons')) return `/manage/classes/${classId}/lessons/create`
    if (path.includes('/tests')) return `/manage/classes/${classId}/tests/create`
    return null
  }, [location.pathname, classId])

  const handleCreateClick = () => {
    if (createPath) {
      navigate(createPath)
    }
  }

  const outletContext = useMemo(
    () => ({
      classroom,
    }),
    [classroom],
  )

  if (isLoading) {
    return <TextMessage text='Đang tải thông tin lớp học...' />
  }

  if (isError || !classroom) {
    return <TextMessage text='Không tìm thấy dữ liệu lớp học.' />
  }

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
        <NavigationDropdown
          options={linkOptions}
          placeholder='Thông tin lớp học'
          className='manage-infor__search__select'
        />
        <div className='manage-infor__search__container'>
          <input
            type='text'
            placeholder='Nhập tìm kiếm...'
            className='manage-infor__search__input'
          />
          <i className='fa-solid fa-magnifying-glass manage-infor__search__icon' />
        </div>
        <button
          className={`manage-infor__search__button ${!createPath ? 'not-creatable' : ''}`}
          onClick={handleCreateClick}
          disabled={!createPath}>
          <i className='fa-solid fa-plus'></i> <span>Tạo mới</span>
        </button>
      </div>

      <Outlet context={outletContext} />
    </div>
  )
}

export function useClassroomContext() {
  return useOutletContext()
}

export default InformationManage
