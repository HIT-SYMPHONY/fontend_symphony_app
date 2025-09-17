import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  addMultipleMembers,
  removeMultipleMembers,
  getMembers,
  getNonMembers,
} from '../../../../apis/competitionUser.api'
import LoadMoreButton from '../../../../components/LoadMoreButton'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import useDebounce from '../../../../hooks/useDebounce'
import { intakeOptions, roleFilterOptions , PAGE_SIZE} from '../../../../constants/commonConstant'
import EndOfListMessage from '../../../EndOfListMessage'
import './style.scss'
import TextMessage from '../../../TextMessage'

const MemberOfCompetAdmin = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams()

  const [nonMembers, setNonMembers] = useState([])
  const [members, setMembers] = useState([])
  const [loadingLeft, setLoadingLeft] = useState(true)
  const [loadingRight, setLoadingRight] = useState(true)
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  // Pagination State
  const [currentPageLeft, setCurrentPageLeft] = useState(1)
  const [hasMoreLeft, setHasMoreLeft] = useState(false)
  const [loadingMoreLeft, setLoadingMoreLeft] = useState(false)
  const [currentPageRight, setCurrentPageRight] = useState(1)
  const [hasMoreRight, setHasMoreRight] = useState(false)
  const [loadingMoreRight, setLoadingMoreRight] = useState(false)

  // Left panel state (non-members)
  const [searchQueryLeft, setSearchQueryLeft] = useState('')
  const [selectedIntakeLeft, setSelectedIntakeLeft] = useState('Tất cả')
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('Tất cả')
  const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
  const dropdownRefLeft = useRef(null)

  // Right panel state (members)
  const [searchQueryRight, setSearchQueryRight] = useState('')
  const [selectedIntakeRight, setSelectedIntakeRight] = useState('Tất cả')
  const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
  const dropdownRefRight = useRef(null)

  const debouncedSearchLeft = useDebounce(searchQueryLeft, 500)
  const debouncedSearchRight = useDebounce(searchQueryRight, 500)

  const closeDropdowns = useCallback(() => {
    setIsDropdownOpenLeft(false)
    setIsDropdownOpenRight(false)
  }, [])
  useOnClickOutside([dropdownRefLeft, dropdownRefRight], closeDropdowns)

  // --- CHANGE: Data Fetching Logic for Competitions ---
  const fetchNonMembers = async (page) => {
    if (page === 1) setLoadingLeft(true)
    else setLoadingMoreLeft(true)
    try {
      const params = {
        keyword: debouncedSearchLeft || null,
        intake: selectedIntakeLeft === 'Tất cả' ? null : selectedIntakeLeft,
        role: selectedRoleFilter === 'Tất cả' ? null : selectedRoleFilter,
        pageNum: page,
        pageSize: PAGE_SIZE,
      }
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null))
      const response = await getNonMembers(competitionId, filteredParams)
      const { items = [], meta } = response.data || {}
      setNonMembers((prev) => (page === 1 ? items : [...prev, ...items]))
      setCurrentPageLeft(meta?.pageNum || 1)
      setHasMoreLeft(meta ? meta.pageNum < meta.totalPages : false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi tải danh sách người dùng.')
    } finally {
      if (page === 1) setLoadingLeft(false)
      else setLoadingMoreLeft(false)
    }
  }

  const fetchMembers = async (page) => {
    if (page === 1) setLoadingRight(true)
    else setLoadingMoreRight(true)
    try {
      const params = {
        keyword: debouncedSearchRight || null,
        intake: selectedIntakeRight === 'Tất cả' ? null : selectedIntakeRight,
        pageNum: page,
        pageSize: PAGE_SIZE,
      }
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null))
      const response = await getMembers(competitionId, filteredParams)
      const { items = [], meta } = response.data || {}
      setMembers((prev) => (page === 1 ? items : [...prev, ...items]))
      setCurrentPageRight(meta?.pageNum || 1)
      setHasMoreRight(meta ? meta.pageNum < meta.totalPages : false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi tải danh sách thí sinh.')
    } finally {
      if (page === 1) setLoadingRight(false)
      else setLoadingMoreRight(false)
    }
  }

  useEffect(() => {
    if (competitionId) fetchNonMembers(1)
  }, [competitionId, debouncedSearchLeft, selectedIntakeLeft, selectedRoleFilter, refetchTrigger])

  useEffect(() => {
    if (competitionId) fetchMembers(1)
  }, [competitionId, debouncedSearchRight, selectedIntakeRight, refetchTrigger])

  const handleLoadMoreLeft = () => fetchNonMembers(currentPageLeft + 1)
  const handleLoadMoreRight = () => fetchMembers(currentPageRight + 1)

  const handleAddMembers = async () => {
    if (selectedUserIds.length === 0) return toast.error('Vui lòng chọn thành viên để thêm.')
    const toastId = toast.loading('Đang thêm thí sinh...')
    try {
      await addMultipleMembers({ competitionId, userIds: selectedUserIds })
      setRefetchTrigger((prev) => prev + 1)
      setSelectedUserIds([])
      toast.success('Thêm thí sinh thành công!', { id: toastId })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi thêm thí sinh.', { id: toastId })
    }
  }

  const handleRemoveMembers = async () => {
    if (selectedUserIds.length === 0) return toast.error('Vui lòng chọn thành viên để xóa.')
    const toastId = toast.loading('Đang xóa thí sinh...')
    try {
      await removeMultipleMembers({ competitionId, userIds: selectedUserIds })
      setRefetchTrigger((prev) => prev + 1)
      setSelectedUserIds([])
      toast.success('Xóa thí sinh thành công!', { id: toastId })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa thí sinh.', { id: toastId })
    }
  }

  const handleSelectionChange = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    )
  }

  const handleSelectAll = (list) => {
    const listIds = list.map((item) => item.id)
    if (listIds.length === 0) return
    const allSelected = listIds.every((id) => selectedUserIds.includes(id))
    if (allSelected) {
      setSelectedUserIds((prev) => prev.filter((id) => !listIds.includes(id)))
    } else {
      setSelectedUserIds((prev) => [...new Set([...prev, ...listIds])])
    }
  }

  const handleSelectIntakeLeft = (item) => setSelectedIntakeLeft(item)
  const handleSelectIntakeRight = (item) => setSelectedIntakeRight(item)

  return (
    <div className='member-compet-admin'>
      <div className='member-compet-admin__left'>
        <div className='member-compet-admin__left-title'>
          <Icon
            icon='mdi:book-account'
            width='24'
            height='24'
            className='member-compet-admin__left-title-icon'
          />
          <h3>Quản lý thí sinh cuộc thi</h3>
        </div>
        <div className='member-compet-admin__header'>
          <i
            className='member-compet-admin__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate(`/admin/competitions/${competitionId}`)}></i>
          <div
            className='member-compet-admin__filter'
            onClick={() => setIsDropdownOpenLeft(!isDropdownOpenLeft)}
            ref={dropdownRefLeft}>
            <Icon
              icon='stash:filter-solid'
              width='20'
              height='20'
              className='member-compet-admin__filter-icon'
            />
            <div className='member-compet-admin__filter-label'>{selectedIntakeLeft}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='member-compet-admin__filter-arrow'
            />
            {isDropdownOpenLeft && (
              <div className='member-compet-admin__dropdown'>
                {intakeOptions.map((item, index) => (
                  <div
                    key={index}
                    className='member-compet-admin__dropdown-item'
                    onClick={() => handleSelectIntakeLeft(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='member-compet-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='member-compet-admin__search-input'
              value={searchQueryLeft}
              onChange={(e) => setSearchQueryLeft(e.target.value)}
            />
            <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <div className='member-compet-admin__left-context'>
          <div className='member-compet-admin__left-context__title'>
            <h5>STT</h5>
            <h5>Tên thành viên</h5>
            <h5>Mã sinh viên</h5>
            <h5>Khóa</h5>
          </div>
          <div className='member-compet-admin__left-context__list'>
            {loadingLeft ? (
              <TextMessage></TextMessage>
            ) : (
              nonMembers.map((item, index) => (
                <div className='member-compet-admin__left-context__list-item' key={item.id}>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5 className='member-compet-admin__left-context__list-item-box-h5'>
                      {index + 1}
                    </h5>
                  </div>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5>{item.fullName}</h5>
                  </div>
                  <h5>{item.studentCode}</h5>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5>{item.intake}</h5>
                  </div>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <input
                      type='checkbox'
                      checked={selectedUserIds.includes(item.id)}
                      onChange={() => handleSelectionChange(item.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <LoadMoreButton
            hasMore={hasMoreLeft}
            isLoading={loadingMoreLeft}
            onClick={handleLoadMoreLeft}
          />
          <EndOfListMessage
            isLoading={loadingLeft}
            hasMore={hasMoreLeft}
            itemCount={nonMembers.length}
            itemName='thí sinh'
          />
        </div>
        <div className='member-compet-admin__left-button'>
          <p onClick={() => handleSelectAll(nonMembers)}>Chọn tất cả</p>
          <button onClick={handleAddMembers}>Thêm</button>
          {roleFilterOptions.map((role) => (
            <span
              key={role}
              onClick={() => setSelectedRoleFilter(role)}
              className={selectedRoleFilter === role ? 'member-compet-admin__active-filter' : ''}>
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className='member-compet-admin__among'></div>

      <div className='member-compet-admin__right'>
        <div className='member-compet-admin__left-title'>
          <Icon
            icon='fluent:people-24-filled'
            width='24'
            className='member-compet-admin__left-title-icon'
          />
          <h3>Danh sách thí sinh</h3>
        </div>
        <div className='member-compet-admin__header'>
          <div
            className='member-compet-admin__filter'
            onClick={() => setIsDropdownOpenRight(!isDropdownOpenRight)}
            ref={dropdownRefRight}>
            <Icon
              icon='stash:filter-solid'
              width='20'
              height='20'
              className='member-compet-admin__filter-icon'
            />
            <div className='member-compet-admin__filter-label'>{selectedIntakeRight}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='member-compet-admin__filter-arrow'
            />
            {isDropdownOpenRight && (
              <div className='member-compet-admin__dropdown'>
                {intakeOptions.map((item, index) => (
                  <div
                    key={index}
                    className='member-compet-admin__dropdown-item'
                    onClick={() => handleSelectIntakeRight(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='member-compet-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='member-compet-admin__search-input'
              value={searchQueryRight}
              onChange={(e) => setSearchQueryRight(e.target.value)}
            />
            <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <div className='member-compet-admin__left-context'>
          <div className='member-compet-admin__left-context__title'>
            <h5>STT</h5>
            <h5>Tên thành viên</h5>
            <h5>Mã sinh viên</h5>
            <h5>Khóa</h5>
          </div>
          <div className='member-compet-admin__left-context__list'>
            {loadingRight ? (
              <p>Đang tải...</p>
            ) : (
              members.map((item, index) => (
                <div className='member-compet-admin__left-context__list-item' key={item.id}>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5 className='member-compet-admin__left-context__list-item-box-h5'>
                      {index + 1}
                    </h5>
                  </div>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5>{item.fullName}</h5>
                  </div>
                  <h5>{item.studentCode}</h5>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5>{item.intake}</h5>
                  </div>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <input
                      type='checkbox'
                      checked={selectedUserIds.includes(item.id)}
                      onChange={() => handleSelectionChange(item.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <LoadMoreButton
            hasMore={hasMoreRight}
            isLoading={loadingMoreRight}
            onClick={handleLoadMoreRight}
          />
          <EndOfListMessage
            isLoading={loadingRight}
            hasMore={hasMoreRight}
            itemCount={members.length}
            itemName='thí sinh'
          />
        </div>
        <div className='member-compet-admin__left-button'>
          <p onClick={() => handleSelectAll(members)}>Chọn tất cả</p>
          <button onClick={handleRemoveMembers}>Xóa</button>
          <button>Tạo chat room</button>
        </div>
      </div>
    </div>
  )
}

export default MemberOfCompetAdmin