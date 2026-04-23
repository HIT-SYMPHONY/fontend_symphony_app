import React, { useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import {
  Outlet,
  useParams,
  useNavigate,
  useLocation,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { getClassroomById } from '../../../apis/classroom.api'
import NavigationDropdown from '../../NavigationDropdown'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import useDebounce from 'hooks/useDebounce'
import './style.scss'
import { classroomKeys } from 'constants/queryKeys'

const InformationManage = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('keyword') || '')

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  useEffect(() => {
    setSearchParams(
      (prevParams) => {
        if (debouncedSearchQuery) {
          prevParams.set('keyword', debouncedSearchQuery)
        } else {
          prevParams.delete('keyword')
        }
        return prevParams
      },
      { replace: true },
    )
  }, [debouncedSearchQuery, setSearchParams])

  // React Query Fetching
  const {
    data: classroom,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: classroomKeys.detail(classId),
    queryFn: async () => {
      if (!classId) return null
      const response = await getClassroomById(classId)
      return response.data
    },
    enabled: !!classId,
    refetchOnWindowFocus: false,
  })

  // Navigation Links
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

  // Dynamic Create Path logic
  const createPath = useMemo(() => {
    const path = location.pathname
    if (path.endsWith('/create')) return null
    if (path.includes('/notifications')) return `/manage/classes/${classId}/notifications/create`
    if (path.includes('/lessons')) return `/manage/classes/${classId}/lessons/create`
    if (path.includes('/tests')) return `/manage/classes/${classId}/tests/create`
    return null
  }, [location.pathname, classId])

  const handleCreateClick = () => {
    if (createPath) navigate(createPath)
  }

  const outletContext = useMemo(() => ({ classroom }), [classroom])

  if (isError) {
    return (
      <ApiErrorDisplay
        title='Không thể tải dữ liệu lớp học'
        refetchQueries={[refetch]}
        backUrl='/manage/classes'
      />
    )
  }

  if (isLoading) {
    return (
      <div className='manage-infor'>
        <div className='manage-infor__title flex gap-2 items-center mb-4'>
          <Skeleton.Button active shape='circle' size='large' />
          <Skeleton.Input active size='large' style={{ width: 300 }} />
        </div>

        <div className='manage-infor__search flex gap-4 mb-6'>
          <Skeleton.Button active style={{ width: 40 }} />
          <Skeleton.Input active style={{ width: 200 }} />
          <Skeleton.Input active style={{ width: 300 }} />
          <Skeleton.Button active style={{ width: 100 }} />
        </div>

        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    )
  }

  // Main Render Layout
  return (
    <div className='manage-infor'>
      <div className='manage-infor__title'>
        <Icon
          icon='mdi:book-account'
          width='30'
          height='30'
          className='manage-infor__title__icon'
        />
        <h2>Quản lý lớp học: {classroom?.name}</h2>
      </div>

      <div className='manage-infor__search'>
        <i className='fa-solid fa-arrow-left cursor-pointer' onClick={() => navigate(-1)} />

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
