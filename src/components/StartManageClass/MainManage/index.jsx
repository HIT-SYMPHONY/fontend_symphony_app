import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { getManagedClasses } from '../../../apis/classroom.api'
import { translateStatus } from '../../../utils/formatters'
import TextMessage from '../../TextMessage/'
import useDebounce from '../../../hooks/useDebounce'
import './style.scss'
import { classroomKeys } from 'constants/queryKeys'

const MainManage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('name') || '')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)
    if (debouncedSearchQuery) {
      newParams.set('name', debouncedSearchQuery)
    }
    else {
      newParams.delete('name')
    }
    setSearchParams(newParams, { replace: true })
  }, [debouncedSearchQuery, setSearchParams])

  const keyword = searchParams.get('name')

  const { data: managedClasses, isLoading } = useQuery({
    queryKey: classroomKeys.managed({ keyword }),
    queryFn: async () => {
      const params = {
        keyword: keyword || null,
      }
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null))
      const response = await getManagedClasses(filteredParams)
      return response.data || []
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Không thể tải danh sách lớp học quản lý.')
    },
  })

  return (
    <div className='manage'>
      <div className='manage__title'>
        <Icon icon='mdi:book-account' width='30' height='30' className='manage__title__icon' />
        <h2>Quản lý lớp học</h2>
      </div>
      <div className='manage__search'>
        <div className='manage__search__container'>
          <input
            type='text'
            placeholder='Nhập tìm kiếm...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className='fa-solid fa-magnifying-glass'></i>
        </div>
      </div>
      <h3>Danh sách lớp quản lý ({isLoading ? '...' : managedClasses?.length || 0})</h3>
      <div className='manage__table'>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div className='manage-table' key={index}>
              <div className='manage-table__img'>
                <Skeleton.Image active style={{ width: 80, height: 80, borderRadius: 10 }} />
              </div>
              <div className='manage-table__context'>
                <div className='manage-table__context__pair'>
                  <Skeleton.Input active style={{ width: 200, height: 24, marginBottom: 8 }} />
                  <Skeleton.Input active style={{ width: 100, height: 20 }} />
                </div>
                <Skeleton.Input active style={{ width: 100, height: 24 }} />
              </div>
            </div>
          ))
        ) : managedClasses?.length > 0 ? (
          managedClasses.map((item) => (
            <div
              className='manage-table'
              key={item.id}
              onClick={() => navigate(`/manage/classes/${item.id}`)}>
              <div className='manage-table__img'>
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className='placeholder-image'></div>
                )}
              </div>
              <div className='manage-table__context'>
                <div className='manage-table__context__pair'>
                  <h4>{item.name}</h4>
                  <span>{translateStatus(item.status)}</span>
                </div>
                <span className='manage-table__context__span'>Xem chi tiết</span>
              </div>
            </div>
          ))
        ) : (
          <TextMessage
            text={
              keyword ? 'Không tìm thấy lớp học nào phù hợp.' : 'Bạn không quản lý lớp học nào.'
            }
          />
        )}
      </div>
    </div>
  )
}

export default MainManage
