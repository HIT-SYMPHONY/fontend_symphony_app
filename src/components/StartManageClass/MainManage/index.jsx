import React, { useState, useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getManagedClasses } from '../../../apis/classroom.api'
import { translateStatus } from '../../../utils/formatters'
import './style.scss'
import TextMessage from '../../TextMessage/'

const MainManage = () => {
  const navigate = useNavigate()
  const [managedClasses, setManagedClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    const fetchManagedClasses = async () => {
      try {
        setLoading(true)
        const response = await getManagedClasses()
        setManagedClasses(response.data || [])
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Không thể tải danh sách lớp học quản lý.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchManagedClasses()
  }, [])
  const filteredClasses = useMemo(() => {
    if (!searchQuery) return managedClasses
    const lowercasedQuery = searchQuery.toLowerCase()
    return managedClasses.filter((cls) => cls.name.toLowerCase().includes(lowercasedQuery))
  }, [managedClasses, searchQuery])

  return (
    <div className='manage'>
      <div className='manage__title'>
        <Icon icon='mdi:book-account' width='30' height='30' className='manage__title__icon' />
        <h2>Quản lý lớp học</h2>
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
      <h3>Danh sách lớp quản lý ({loading ? '...' : filteredClasses.length})</h3>
      <div className='manage__table'>
        {loading ? (
          <TextMessage text='Đang tải...'></TextMessage>
        ) : filteredClasses.length > 0 ? (
          filteredClasses.map((item) => (
            <div className='manage-table' key={item.id}>
              <div className='manage-table__img'>
                {item.image && <img src={item.image} alt={item.name} />}
              </div>
              <div className='manage-table__context'>
                <div className='manage-table__context__pair'>
                  <h4>{item.name}</h4>
                  <span>{translateStatus(item.status)}</span>
                </div>
                <span
                  className='manage-table__context__span'
                  onClick={() => navigate(`/manage/classes/${item.id}`)}>
                  Xem chi tiết
                </span>
              </div>
            </div>
          ))
        ) : (
          <TextMessage text='Bạn không quản lý lớp học nào.'></TextMessage>
        )}
      </div>
    </div>
  )
}

export default MainManage
