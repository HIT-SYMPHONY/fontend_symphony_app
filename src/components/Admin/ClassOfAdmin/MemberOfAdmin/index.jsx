import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  getMembersInClassroom,
  getMembersNotInClassroom,
  addMembersToClassroom,
  removeMembersFromClassroom,
} from '../../../../apis/classroom.api'
import LoadMoreButton from '../../../../components/LoadMoreButton'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import useDebounce from '../../../../hooks/useDebounce'
import { intakeOptions, roleFilterOptions } from '../../../../constants/commonConstant'
import EndOfListMessage from '../../../EndOfListMessage'
import './style.scss'
import TextMessage from '../../../TextMessage'
import { getDisplayName } from 'utils/formatters'
import { get } from 'react-hook-form'

const PAGE_SIZE = 10

const MemberOfClassAdmin = () => {
  const navigate = useNavigate()
  const { classId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [nonMembers, setNonMembers] = useState([])
  const [membersInClass, setMembersInClass] = useState([])
  const [loadingLeft, setLoadingLeft] = useState(true)
  const [loadingRight, setLoadingRight] = useState(true)
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const [refetchTrigger, setRefetchTrigger] = useState(0)
  const [currentPageLeft, setCurrentPageLeft] = useState(1)
  const [hasMoreLeft, setHasMoreLeft] = useState(false)
  const [loadingMoreLeft, setLoadingMoreLeft] = useState(false)
  const [currentPageRight, setCurrentPageRight] = useState(1)
  const [hasMoreRight, setHasMoreRight] = useState(false)
  const [loadingMoreRight, setLoadingMoreRight] = useState(false)
  const [searchQueryLeft, setSearchQueryLeft] = useState(
    () => searchParams.get('keywordLeft') || '',
  )
  const [selectedIntakeLeft, setSelectedIntakeLeft] = useState(
    () => searchParams.get('intakeLeft') || 'Tất cả',
  )
  const [selectedRoleFilter, setSelectedRoleFilter] = useState(
    () => searchParams.get('roleLeft') || 'Tất cả',
  )
  const [searchQueryRight, setSearchQueryRight] = useState(
    () => searchParams.get('keywordRight') || '',
  )
  const [selectedIntakeRight, setSelectedIntakeRight] = useState(
    () => searchParams.get('intakeRight') || 'Tất cả',
  )
  const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
  const dropdownRefLeft = useRef(null)
  const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
  const dropdownRefRight = useRef(null)

  const debouncedSearchLeft = useDebounce(searchQueryLeft, 500)
  const debouncedSearchRight = useDebounce(searchQueryRight, 500)

  const closeDropdowns = useCallback(() => {
    setIsDropdownOpenLeft(false)
    setIsDropdownOpenRight(false)
  }, [])
  useOnClickOutside([dropdownRefLeft, dropdownRefRight], closeDropdowns)
  useEffect(() => {
    const newParams = new URLSearchParams()
    const setParam = (key, value, defaultValue) => {
      if (value && value !== defaultValue) {
        newParams.set(key, value)
      }
    }
    setParam('keywordLeft', debouncedSearchLeft, '')
    setParam('intakeLeft', selectedIntakeLeft, 'Tất cả')
    setParam('roleLeft', selectedRoleFilter, 'Tất cả')
    setParam('keywordRight', debouncedSearchRight, '')
    setParam('intakeRight', selectedIntakeRight, 'Tất cả')

    setSearchParams(newParams, { replace: true })
  }, [
    debouncedSearchLeft,
    selectedIntakeLeft,
    selectedRoleFilter,
    debouncedSearchRight,
    selectedIntakeRight,
    setSearchParams,
  ])
  const fetchNonMembers = useCallback(
    async (page, isLoadMore = false) => {
      if (!isLoadMore) setLoadingLeft(true)
      else setLoadingMoreLeft(true)
      try {
        const params = {
          keyword: searchParams.get('keywordLeft') || null,
          intake: searchParams.get('intakeLeft') || null,
          role: searchParams.get('roleLeft') || null,
          pageNum: page,
          pageSize: PAGE_SIZE,
        }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )
        const response = await getMembersNotInClassroom(classId, filteredParams)
        const { items = [], meta } = response.data || {}

        setNonMembers((prev) => (!isLoadMore ? items : [...prev, ...items]))
        setCurrentPageLeft(meta?.pageNum || 1)
        setHasMoreLeft(meta ? meta.pageNum < meta.totalPages : false)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Lỗi khi tải danh sách người dùng.')
      } finally {
        if (!isLoadMore) setLoadingLeft(false)
        else setLoadingMoreLeft(false)
      }
    },
    [classId, searchParams],
  )

  const fetchMembers = useCallback(
    async (page, isLoadMore = false) => {
      if (!isLoadMore) setLoadingRight(true)
      else setLoadingMoreRight(true)
      try {
        const params = {
          keyword: searchParams.get('keywordRight') || null,
          intake: searchParams.get('intakeRight') || null,
          pageNum: page,
          pageSize: PAGE_SIZE,
        }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )
        const response = await getMembersInClassroom(classId, filteredParams)
        const { items = [], meta } = response.data || {}

        setMembersInClass((prev) => (!isLoadMore ? items : [...prev, ...items]))
        setCurrentPageRight(meta?.pageNum || 1)
        setHasMoreRight(meta ? meta.pageNum < meta.totalPages : false)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Lỗi khi tải thành viên lớp.')
      } finally {
        if (!isLoadMore) setLoadingRight(false)
        else setLoadingMoreRight(false)
      }
    },
    [classId, searchParams],
  )
  useEffect(() => {
    if (classId) {
      fetchNonMembers(1)
    }
  }, [fetchNonMembers, refetchTrigger])

  useEffect(() => {
    if (classId) {
      fetchMembers(1)
    }
  }, [fetchMembers, refetchTrigger])
  const handleLoadMoreLeft = () => fetchNonMembers(currentPageLeft + 1, true)
  const handleLoadMoreRight = () => fetchMembers(currentPageRight + 1, true)

  const handleAddMembers = async () => {
    if (selectedUserIds.length === 0) return toast.error('Vui lòng chọn thành viên để thêm.')
    const toastId = toast.loading('Đang thêm thành viên...')
    try {
      await addMembersToClassroom(classId, { memberIds: selectedUserIds })
      setRefetchTrigger((prev) => prev + 1)
      setSelectedUserIds([])
      toast.success('Thêm thành viên thành công!', { id: toastId })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi thêm thành viên.', { id: toastId })
    }
  }

  const handleRemoveMembers = async () => {
    if (selectedUserIds.length === 0) return toast.error('Vui lòng chọn thành viên để xóa.')
    const toastId = toast.loading('Đang xóa thành viên...')
    try {
      await removeMembersFromClassroom(classId, { memberIds: selectedUserIds })
      setRefetchTrigger((prev) => prev + 1)
      setSelectedUserIds([])
      toast.success('Xóa thành viên thành công!', { id: toastId })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa thành viên.', { id: toastId })
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

  const handleSelectIntakeLeft = (item) => {
    setSelectedIntakeLeft(item)
    setIsDropdownOpenLeft(false)
  }

  const handleSelectIntakeRight = (item) => {
    setSelectedIntakeRight(item)
    setIsDropdownOpenRight(false)
  }

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
          <h3>Quản lý thành viên lớp</h3>
        </div>
        <div className='member-compet-admin__header'>
          <i
            className='member-compet-admin__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate(`/admin/classes/${classId}`)}></i>
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
                    <h5>{getDisplayName(item)}</h5>
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
            isLoading={loadingMoreLeft}
            hasMore={hasMoreLeft}
            itemCount={nonMembers.length}
            itemName='thành viên'
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
          <h3>Danh sách thành viên lớp</h3>
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
              <TextMessage></TextMessage>
            ) : (
              membersInClass.map((item, index) => (
                <div className='member-compet-admin__left-context__list-item' key={item.id}>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5 className='member-compet-admin__left-context__list-item-box-h5'>
                      {index + 1}
                    </h5>
                  </div>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5>{getDisplayName(item)}</h5>
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
            isLoading={loadingMoreRight}
            hasMore={hasMoreRight}
            itemCount={membersInClass.length}
            itemName='thành viên'
          />
        </div>
        <div className='member-compet-admin__left-button'>
          <p onClick={() => handleSelectAll(membersInClass)}>Chọn tất cả</p>
          <button onClick={handleRemoveMembers}>Xóa</button>
          <button>Tạo chat room</button>
        </div>
      </div>
    </div>
  )
}

export default MemberOfClassAdmin
