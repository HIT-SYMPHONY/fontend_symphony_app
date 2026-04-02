import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
// --- NEW: Import useSearchParams ---
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllClassrooms } from '../../../../apis/classroom.api'
import { translateStatus } from '../../../../utils/formatters'
import TextMessage from '../../../TextMessage'
import LoadMoreButton from '../../../LoadMoreButton'
import EndOfListMessage from '../../../EndOfListMessage'
import useDebounce from '../../../../hooks/useDebounce'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import { yearFilterOptions, PAGE_SIZE } from '../../../../constants/commonConstant'
import './style.scss'

const MainOfClassAdmin = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedYear, setSelectedYear] = useState(() => searchParams.get('year') || 'Tất cả')
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('keyword') || '')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const [classrooms, setClassrooms] = useState([])
  const [totalElements, setTotalElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  useOnClickOutside([dropdownRef], () => setIsDropdownOpen(false))
  useEffect(() => {
    const newParams = new URLSearchParams()
    if (debouncedSearchQuery) {
      newParams.set('keyword', debouncedSearchQuery)
    }
    if (selectedYear && selectedYear !== 'Tất cả') {
      newParams.set('year', selectedYear)
    }
    setSearchParams(newParams, { replace: true })
  }, [selectedYear, debouncedSearchQuery, setSearchParams])
  const fetchClasses = useCallback(
    async (page, isLoadMore = false) => {
      if (isLoadMore) setLoadingMore(true)
      else setLoading(true)
      try {
        const params = {
          pageNum: page,
          pageSize: PAGE_SIZE,
          keyword: searchParams.get('keyword') || null,
          startYear: searchParams.get('year') || null,
        }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )

        const response = await getAllClassrooms(filteredParams)
        const content = response.data
        const meta = content?.meta
        if (content && content.items) {
          setClassrooms((prev) => (isLoadMore ? [...prev, ...content.items] : content.items))
        }
        if (meta) {
          setTotalElements(meta.totalElements)
          setCurrentPage(meta.pageNum)
          setHasMore(meta.pageNum < meta.totalPages)
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách lớp học.')
      } finally {
        if (isLoadMore) setLoadingMore(false)
        else setLoading(false)
      }
    },
    [searchParams], 
  )
  useEffect(() => {
    fetchClasses(1, false)
  }, [fetchClasses])

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      fetchClasses(currentPage + 1, true)
    }
  }
  const handleSelectYear = (yearOption) => {
    setSelectedYear(yearOption)
    setIsDropdownOpen(false)
  }

  return (
    <div className='main-class-admin'>
      <div className='main-class-admin__header'>
        <i
          className='main-class-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin')}></i>
        <div
          className='main-class-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='28'
            height='28'
            className='main-class-admin__filter-icon'
          />
          <div className='main-class-admin__filter-label'>{selectedYear}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='main-class-admin__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='main-class-admin__dropdown'>
              {yearFilterOptions.map((option) => (
                <div
                  key={option}
                  className='main-class-admin__dropdown-item'
                  onClick={() => handleSelectYear(option)}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='main-class-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm theo tên...'
            className='main-class-admin__search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className='main-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='main-class-admin__create-button'
          onClick={() => navigate('/admin/classes/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <div className='main-class-admin__content'>
        <h3>Danh sách lớp học ({loading ? '...' : totalElements})</h3>
        <div className='main-class-admin__content-body'>
          {loading ? (
            <TextMessage />
          ) : classrooms.length > 0 ? (
            classrooms.map((item) => (
              <div
                className='main-class-admin__content-body-item'
                key={item.id}
                onClick={() => navigate(`/admin/classes/${item.id}`)}>
                <div className='main-class-admin__content-body-item__img'>
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className='placeholder-image'></div>
                  )}
                </div>
                <div className='main-class-admin__content-body-item__box'>
                  <div className='main-class-admin__content-body-item__box-start'>
                    <h4>{item.name}</h4>
                    <span className={item.status === 'COMPLETED' ? 'span2' : 'span1'}>
                      {translateStatus(item.status)}
                    </span>
                  </div>
                  <span>Xem chi tiết</span>
                </div>
              </div>
            ))
          ) : (
            <TextMessage text='Không tìm thấy lớp học nào phù hợp.' /> 
          )}
        </div>
      </div>
      <LoadMoreButton hasMore={hasMore} isLoading={loadingMore} onClick={handleLoadMore} />
      <EndOfListMessage
        isLoading={loading}
        hasMore={hasMore}
        itemCount={classrooms.length}
        itemName='lớp học'
      />
    </div>
  )
}

export default MainOfClassAdmin