import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getManagedClasses } from '../../../apis/classroom.api'
import { translateStatus } from '../../../utils/formatters'
import TextMessage from '../../TextMessage/'
import useDebounce from '../../../hooks/useDebounce'
import './style.scss'

const MainManage = () => {
  const navigate = useNavigate()
  const [managedClasses, setManagedClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const fetchManagedClasses = useCallback(async () => {
    try {
      setLoading(true)
      const params = {
        keyword: debouncedSearchQuery || null,
      }
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null))
      const response = await getManagedClasses(filteredParams)
      setManagedClasses(response.data || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể tải danh sách lớp học quản lý.')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearchQuery])

  useEffect(() => {
    fetchManagedClasses()
  }, [fetchManagedClasses])

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
      <h3>Danh sách lớp quản lý ({loading ? '...' : managedClasses.length})</h3>
      <div className='manage__table'>
        {loading ? (
          <TextMessage text='Đang tải...' />
        ) : managedClasses.length > 0 ? (
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
              searchQuery ? 'Không tìm thấy lớp học nào phù hợp.' : 'Bạn không quản lý lớp học nào.'
            }
          />
        )}
      </div>
    </div>
  )
}

export default MainManage
