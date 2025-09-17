import { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllUsers } from '../../../../apis/user.api'
import placeHolderImage from '../../../../assets/img/Ellipse.png'
import { getDisplayName } from '../../../../utils/formatters'
import EndOfListMessage from '../../../EndOfListMessage'
import TextMessage from '../../../TextMessage'
import LoadMoreButton from '../../../LoadMoreButton'
import useDebounce from '../../../../hooks/useDebounce'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import { roleFilterOptions, PAGE_SIZE } from '../../../../constants/commonConstant'
import './style.scss'

const MainOfAdmin = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [totalElements, setTotalElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('Tất cả')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  useOnClickOutside([dropdownRef], () => setIsDropdownOpen(false))

  const fetchUsers = useCallback(
    async (page, isLoadMore = false) => {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      try {
        const params = {
          pageNum: page,
          pageSize: PAGE_SIZE,
          keyword: debouncedSearchQuery || null,
          role: selectedRole === 'Tất cả' ? null : selectedRole,
        }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )

        const response = await getAllUsers(filteredParams)
        const content = response.data

        if (content && content.items) {
          setUsers((prev) => (isLoadMore ? [...prev, ...content.items] : content.items))
        }
        if (content && content.meta) {
          setTotalElements(content.meta.totalElements)
          setCurrentPage(content.meta.pageNum)
          setHasMore(content.meta.pageNum < content.meta.totalPages)
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách thành viên.')
      } finally {
        if (isLoadMore) {
          setLoadingMore(false)
        } else {
          setLoading(false)
        }
      }
    },
    [debouncedSearchQuery, selectedRole],
  )
  useEffect(() => {
    fetchUsers(1, false)
  }, [fetchUsers])

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      fetchUsers(currentPage + 1, true)
    }
  }

  const handleSelectRole = (role) => {
    setSelectedRole(role)
    setIsDropdownOpen(false)
  }

  return (
    <div className='main-admin'>
      <div className='main-admin__title'>
        <i
          className='fa-solid fa-arrow-left main-admin__title__i'
          onClick={() => navigate('/admin')}></i>
        <div
          className='main-admin__title__choose'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='28'
            height='28'
            className='main-admin__title__choose__icon'
          />
          <div className='main-admin__title__choose__label'>{selectedRole}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='main-admin__title__choose__arrow'
          />
          {isDropdownOpen && (
            <div className='main-admin__title__choose__dropdown'>
              {roleFilterOptions.map((item, index) => (
                <div
                  key={index}
                  className='main-admin__title__choose__dropdown__item'
                  onClick={() => handleSelectRole(item)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='main-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className='fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='main-admin__title__create'
          onClick={() => navigate('/admin/users/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <h2>Danh sách thành viên </h2>
      <h3>Số lượng thành viên: {loading ? '...' : totalElements}</h3>
      <div className='main-admin__context'>
        <div className='main-admin__context__table__tbody-wrapper'>
          <table className='main-admin__context__table'>
            <thead className='main-admin__context__table__thead'>
              <tr className='main-admin__context__table__thead__tr'>
                <th>STT</th>
                <th>Tên</th>
                <th>Phân quyền</th>
                <th>Mã sinh viên</th>
                <th>Ngày tham gia</th>
                <th>Ảnh</th>
              </tr>
            </thead>
            <tbody className='main-admin__context__table__tbody'>
              {loading ? (
                <tr>
                  <td className='loading-message'>Đang tải...</td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} onClick={() => navigate(`/admin/users/${user.id}`)}>
                    <td className='tbody'>
                      <h4>{index + 1}</h4>
                    </td>
                    <td>{getDisplayName(user)}</td>
                    <td>{user.role}</td>
                    <td>{user.studentCode}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className='tbody-td'>
                      <img src={user.imageUrl || placeHolderImage} alt='Profile' />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6'>
                    <TextMessage>Không tìm thấy thành viên nào.</TextMessage>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <LoadMoreButton hasMore={hasMore} isLoading={loadingMore} onClick={handleLoadMore} />
      <EndOfListMessage
        isLoading={loading}
        hasMore={hasMore}
        itemCount={users.length}
        itemName='thành viên'
      />
    </div>
  )
}

export default MainOfAdmin
