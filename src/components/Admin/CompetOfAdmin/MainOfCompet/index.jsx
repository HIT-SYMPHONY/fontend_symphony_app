import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllCompetitions } from '../../../../apis/competition.api'
import { translateStatus, formatDate } from '../../../../utils/formatters' // 👈 Import helpers
import './style.scss'

const MainOfCompet = () => {
  const navigate = useNavigate()
  const [competitions, setCompetitions] = useState([])
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10, totalElements: 0 })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchCompetitions = useCallback(async (page = 1) => {
    try {
      setLoading(true)
      const params = { pageNum: page, pageSize: 10, sortBy: 'startTime', isAscending: true }
      const response = await getAllCompetitions(params)
      const content = response.data
      if (content && content.items) setCompetitions(content.items)
      if (content && content.meta) {
        setPagination((prev) => ({
          ...prev,
          totalElements: content.meta.totalElements,
          pageNum: content.meta.pageNum,
        }))
      }
    } catch (error) {
      if (error.response?.data?.message) toast.error(error.response.data.message)
      else toast.error('Có lỗi bất thường đã xảy ra.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCompetitions(pagination.pageNum)
  }, [fetchCompetitions, pagination.pageNum])

  const filteredCompetitions = useMemo(() => {
    if (!searchQuery) return competitions
    const lowercasedQuery = searchQuery.toLowerCase()
    return competitions.filter((comp) => comp.name.toLowerCase().includes(lowercasedQuery))
  }, [competitions, searchQuery])

  return (
    <div className='mainofcompet'>
      <div className='mainofcompet__header'>
        <i
          className='mainofcompet__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin')}></i>
        <div className='mainofcompet__search'>
          <input
            type='text'
            placeholder='Tìm kiếm cuộc thi...'
            className='mainofcompet__search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className='mainofcompet__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='mainofcompet__create-button'
          onClick={() => navigate('/admin/competition/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <h3>Danh sách cuộc thi ({loading ? '...' : pagination.totalElements})</h3>
      <div className='mainofcompet__table'>
        {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</div>}
        {!loading &&
          filteredCompetitions.map((item) => (
            <div
              className='mainofcompet__table-box'
              key={item.id}
              onClick={() => navigate(`/admin/competition/${item.id}/information`)}>
              <div className='mainofcompet__table-box__img'>
                {item.image && <img src={item.image} alt={item.name} />}
              </div>
              <div className='mainofcompet__table-box__item'>
                <div className='mainofcompet__table-box__item-start'>
                  <h4>{item.name}</h4>
                  {/* 👇 Use the helper function here */}
                  <span>{translateStatus(item.status)}</span>
                  <p>
                    {/* 👇 And here */}
                    Ngày bắt đầu: {formatDate(item.startTime)}
                  </p>
                </div>
                <i className='fa-solid fa-circle-info mainofcompet__table-box__item-end'></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MainOfCompet
