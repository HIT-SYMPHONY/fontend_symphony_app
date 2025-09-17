import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllCompetitions } from '../../../../apis/competition.api'
import { translateStatus, formatDate } from '../../../../utils/formatters'
import LoadMoreButton from '../../../../components/LoadMoreButton'
import EndOfListMessage from '../../../../components/EndOfListMessage'
import './style.scss'
import { yearFilterOptions, PAGE_SIZE } from '../../../../constants/commonConstant'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import useDebounce from '../../../../hooks/useDebounce'
import TextMessage from '../../../TextMessage'
const MainOfCompet = () => {
  const navigate = useNavigate()
  const [competitions, setCompetitions] = useState([])
  const [pagination, setPagination] = useState({ pageNum: 1, totalPages: 1, totalElements: 0 })
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const [selectedYear, setSelectedYear] = useState('Tất cả')

  useOnClickOutside([dropdownRef], () => setIsDropdownOpen(false))

  const fetchCompetitions = useCallback(
    async (page, isLoadMore = false) => {
      isLoadMore ? setLoadingMore(true) : setLoading(true)
      try {
        const params = {
          pageNum: page,
          pageSize: PAGE_SIZE,
          keyword: debouncedSearchQuery || null,
          startYear: selectedYear === 'Tất cả' ? null : selectedYear,
        }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )
        const response = await getAllCompetitions(filteredParams)
        const content = response.data
        if (content && content.items) {
          if (isLoadMore) {
            setCompetitions((prev) => [...prev, ...content.items])
          } else {
            setCompetitions(content.items)
          }
        }
        if (content && content.meta) {
          setPagination({
            pageNum: content.meta.pageNum,
            totalPages: content.meta.totalPages,
            totalElements: content.meta.totalElements,
          })
        }
      } catch (error) {
        if (error.response?.data?.message) toast.error(error.response.data.message)
        else toast.error('Có lỗi bất thường đã xảy ra.')
      } finally {
        isLoadMore ? setLoadingMore(false) : setLoading(false)
      }
    },
    [debouncedSearchQuery, selectedYear],
  )

  useEffect(() => {
    fetchCompetitions(1)
  }, [fetchCompetitions])

  const handleLoadMore = () => {
    const nextPage = pagination.pageNum + 1
    fetchCompetitions(nextPage, true)
  }

  const handleSelectYear = (year) => {
    setSelectedYear(year)
    setIsDropdownOpen(false)
  }

  const hasMore = pagination.pageNum < pagination.totalPages

  return (
    <div className='mainofcompet'>
      <div className='mainofcompet__header'>
        <i
          className='mainofcompet__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/home')}></i>
        <div
          className='mainofcompet__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='28'
            height='28'
            className='mainofcompet__filter-icon'
          />
          <div className='mainofcompet__filter-label'>{selectedYear}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='mainofcompet__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='mainofcompet__dropdown'>
              {yearFilterOptions.map((option) => (
                <div
                  key={option}
                  className='mainofcompet__dropdown-item'
                  onClick={() => handleSelectYear(option)}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
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
          onClick={() => navigate('/admin/competitions/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <h3>Danh sách cuộc thi ({loading ? '...' : pagination.totalElements})</h3>
      <div className='mainofcompet__table'>
        {loading ? (
          <TextMessage></TextMessage>
        ) : competitions.length > 0 ? (
          competitions.map((item) => (
            <div
              className='mainofcompet__table-box'
              key={item.id}
              onClick={() => navigate(`/admin/competitions/${item.id}`)}>
              <div className='mainofcompet__table-box__img'>
                {item.image && <img src={item.image} alt={item.name}/>}
              </div>
              <div className='mainofcompet__table-box__item'>
                <div className='mainofcompet__table-box__item-start'>
                  <h4>{item.name}</h4>
                  <span>{translateStatus(item.status)}</span>
                  <p>Ngày bắt đầu: {formatDate(item.startTime)}</p>
                </div>
                <i className='fa-solid fa-circle-info mainofcompet__table-box__item-end'></i>
              </div>
            </div>
          ))
        ) : (
          <TextMessage text={'Không có cuộc thi nào.'}></TextMessage>
        )}
      </div>

      <LoadMoreButton isLoading={loadingMore} hasMore={hasMore} onClick={handleLoadMore} />

      <EndOfListMessage
        isLoading={loading}
        hasMore={hasMore}
        itemCount={competitions.length}
        itemName='cuộc thi'
      />
    </div>
  )
}

export default MainOfCompet
