import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllUsers, updateUserRoles } from '../../../apis/user.api'
import { getDisplayName } from '../../../utils/formatters'
import useDebounce from '../../../hooks/useDebounce'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import LoadMoreButton from '../../LoadMoreButton'
import EndOfListMessage from '../../EndOfListMessage'
import './style.scss'
import {PAGE_SIZE, roleFilterOptions} from '../../../constants/commonConstant'


const DecentOfAdmin = () => {
  const navigate = useNavigate()

  // State for the left panel
  const [usersLeft, setUsersLeft] = useState([])
  const [loadingLeft, setLoadingLeft] = useState(true)
  const [loadingMoreLeft, setLoadingMoreLeft] = useState(false)
  const [currentPageLeft, setCurrentPageLeft] = useState(1)
  const [hasMoreLeft, setHasMoreLeft] = useState(false)
  const [selectedRoleLeft, setSelectedRoleLeft] = useState('Tất cả')
  const [searchQueryLeft, setSearchQueryLeft] = useState('')
  const [selectedUserIdsLeft, setSelectedUserIdsLeft] = useState([])
  const debouncedSearchLeft = useDebounce(searchQueryLeft, 500)

  // State for the right panel
  const [usersRight, setUsersRight] = useState([])
  const [loadingRight, setLoadingRight] = useState(true)
  const [loadingMoreRight, setLoadingMoreRight] = useState(false)
  const [currentPageRight, setCurrentPageRight] = useState(1)
  const [hasMoreRight, setHasMoreRight] = useState(false)
  const [selectedRoleRight, setSelectedRoleRight] = useState('Tất cả')
  const [searchQueryRight, setSearchQueryRight] = useState('')
  const [selectedUserIdsRight, setSelectedUserIdsRight] = useState([])
  const debouncedSearchRight = useDebounce(searchQueryRight, 500)

  // Common state and refs
  const [refetchTrigger, setRefetchTrigger] = useState(0)
  const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
  const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
  const dropdownRefLeft = useRef(null)
  const dropdownRefRight = useRef(null)

  const closeDropdowns = useCallback(() => {
    setIsDropdownOpenLeft(false)
    setIsDropdownOpenRight(false)
  }, [])
  useOnClickOutside([dropdownRefLeft, dropdownRefRight], closeDropdowns)

  // --- API Fetching Logic ---
  const fetchUsersForPanel = useCallback(
    async (panel, page, isLoadMore = false) => {
      const isLeft = panel === 'left'
      const setLoading = isLeft ? setLoadingLeft : setLoadingRight
      const setLoadingMore = isLeft ? setLoadingMoreLeft : setLoadingMoreRight
      const setUsers = isLeft ? setUsersLeft : setUsersRight
      const setCurrentPage = isLeft ? setCurrentPageLeft : setCurrentPageRight
      const setHasMore = isLeft ? setHasMoreLeft : setHasMoreRight
      const keyword = isLeft ? debouncedSearchLeft : debouncedSearchRight
      const role = isLeft ? selectedRoleLeft : selectedRoleRight
      const roleParam = role === 'Tất cả' ? null : role

      if (isLoadMore) setLoadingMore(true)
      else setLoading(true)

      try {
        const params = {
          pageNum: page,
          pageSize: PAGE_SIZE,
          keyword: keyword || null,
          role: roleParam,
        }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )

        const response = await getAllUsers(filteredParams)
        const { items = [], meta } = response.data || {}

        setUsers((prev) => (isLoadMore ? [...prev, ...items] : items))
        if (meta) {
          setCurrentPage(meta.pageNum)
          setHasMore(meta.pageNum < meta.totalPages)
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Lỗi khi tải danh sách thành viên.')
      } finally {
        if (isLoadMore) setLoadingMore(false)
        else setLoading(false)
      }
    },
    [debouncedSearchLeft, selectedRoleLeft, debouncedSearchRight, selectedRoleRight],
  )

  useEffect(() => {
    fetchUsersForPanel('left', 1)
  }, [selectedRoleLeft, debouncedSearchLeft, refetchTrigger])

  useEffect(() => {
    fetchUsersForPanel('right', 1)
  }, [selectedRoleRight, debouncedSearchRight, refetchTrigger])

  // --- Event Handlers ---
  const handleSelectionChange = (panel, userId) => {
    const setter = panel === 'left' ? setSelectedUserIdsLeft : setSelectedUserIdsRight
    setter((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    )
  }

  const handleSelectAll = (panel) => {
    const users = panel === 'left' ? usersLeft : usersRight
    const userIds = users.map((u) => u.id)
    const currentSelection = panel === 'left' ? selectedUserIdsLeft : selectedUserIdsRight
    const setter = panel === 'left' ? setSelectedUserIdsLeft : setSelectedUserIdsRight
    const allSelected = userIds.length > 0 && userIds.every((id) => currentSelection.includes(id))

    if (allSelected) {
      setter(currentSelection.filter((id) => !userIds.includes(id)))
    } else {
      setter([...new Set([...currentSelection, ...userIds])])
    }
  }

  const updateRoles = async (userIds, newRole, actionName) => {
    const toastId = toast.loading(`Đang ${actionName.toLowerCase()}...`)
    try {
      await updateUserRoles({ roleStr: newRole, usersId: userIds })
      setSelectedUserIdsLeft([])
      setSelectedUserIdsRight([])
      setRefetchTrigger((prev) => prev + 1)
      toast.success(`${actionName} thành công!`, { id: toastId })
    } catch (error) {
      toast.error(error.response?.data?.message || `Lỗi khi ${actionName.toLowerCase()}.`, {
        id: toastId,
      })
    }
  }

  const handleAssignRole = (newRole) => {
    if (selectedUserIdsLeft.length === 0)
      return toast.error('Vui lòng chọn thành viên để gán quyền.')
    updateRoles(selectedUserIdsLeft, newRole, 'Gán quyền')
  }

  const handleRemoveRole = () => {
    if (selectedUserIdsRight.length === 0)
      return toast.error('Vui lòng chọn thành viên để xóa quyền.')
    updateRoles(selectedUserIdsRight, 'USER', 'Xóa quyền') 
  }

  const handleSelectLeft = (item) => {
    setSelectedRoleLeft(item)
    setIsDropdownOpenLeft(false)
  }

  const handleSelectRight = (item) => {
    setSelectedRoleRight(item)
    setIsDropdownOpenRight(false)
  }

  return (
    <div className='decent-admin'>
      <div className='decent-admin__left'>
        <div className='decent-admin__left-title'>
          <Icon
            icon='fluent:people-star-24-filled'
            width='28'
            height='28'
            className='decent-admin__left-title-icon'
          />
          <h3>Phân quyền thành viên</h3>
        </div>
        <div className='decent-admin__header'>
          <i
            className='decent-admin__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate('/admin')}></i>
          <div
            className='decent-admin__filter'
            onClick={() => setIsDropdownOpenLeft(!isDropdownOpenLeft)}
            ref={dropdownRefLeft}>
            <Icon
              icon='stash:filter-solid'
              width='24'
              height='24'
              className='decent-admin__filter-icon'
            />
            <div className='decent-admin__filter-label'>{selectedRoleLeft}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='decent-admin__filter-arrow'
            />
            {isDropdownOpenLeft && (
              <div className='decent-admin__dropdown'>
                {roleFilterOptions.map((item, index) => (
                  <div
                    key={index}
                    className='decent-admin__dropdown-item'
                    onClick={() => handleSelectLeft(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='decent-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='decent-admin__search-input'
              value={searchQueryLeft}
              onChange={(e) => setSearchQueryLeft(e.target.value)}
            />
            <i className='decent-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <div className='decent-admin__left-context'>
          <div className='decent-admin__left-context__tbody-wrapper'>
            <table className='decent-admin__left-context__table'>
              <thead>
                <tr>
                  <th>Tên thành viên</th>
                  <th>Mã sinh viên</th>
                  <th>Khóa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='decent-admin__left-context__tbody'>
                {loadingLeft ? (
                  <tr>
                    <td colSpan='4' style={{ textAlign: 'center', padding: '2rem' }}>
                      Đang tải...
                    </td>
                  </tr>
                ) : usersLeft.length > 0 ? (
                  usersLeft.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <div className='user-info-cell'>
                          <span className='user-index'>
                            <h4>{index + 1}</h4>
                          </span>
                          <span>{getDisplayName(item)}</span>
                        </div>
                      </td>
                      <td>{item.studentCode}</td>
                      <td>{item.intake}</td>
                      <td>
                        <input
                          type='checkbox'
                          checked={selectedUserIdsLeft.includes(item.id)}
                          onChange={() => handleSelectionChange('left', item.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='4'>
                      <p style={{ textAlign: 'center', padding: '2rem' }}>
                        Không tìm thấy thành viên.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <LoadMoreButton
            hasMore={hasMoreLeft}
            isLoading={loadingMoreLeft}
            onClick={() => fetchUsersForPanel('left', currentPageLeft + 1, true)}
          />
          <EndOfListMessage
            isLoading={loadingLeft}
            hasMore={hasMoreLeft}
            itemCount={usersLeft.length}
            itemName='thành viên'
          />
        </div>
        <div className='decent-admin__left-button'>
          <span onClick={() => handleSelectAll('left')} className='decent-admin__left-button-span'>
            Chọn tất cả
          </span>
          <button onClick={() => handleAssignRole('USER')}>USER</button>
          <button onClick={() => handleAssignRole('LEADER')}>LEADER</button>
          <button onClick={() => handleAssignRole('ADMIN')}>ADMIN</button>
        </div>
      </div>

      <div className='decent-admin__among'></div>

      {/* Right Panel */}
      <div className='decent-admin__right'>
        <div className='decent-admin__left-title'>
          <Icon
            icon='fluent:people-24-filled'
            width='24'
            className='decent-admin__left-title-icon'
          />
          <h3>Danh sách phân quyền</h3>
        </div>
        <div className='decent-admin__header'>
          <div className='decent-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='decent-admin__search-input'
              value={searchQueryRight}
              onChange={(e) => setSearchQueryRight(e.target.value)}
            />
            <i className='decent-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
          <div
            className='decent-admin__filter'
            onClick={() => setIsDropdownOpenRight(!isDropdownOpenRight)}
            ref={dropdownRefRight}>
            <Icon
              icon='stash:filter-solid'
              width='24'
              height='24'
              className='decent-admin__filter-icon'
            />
            <div className='decent-admin__filter-label'>{selectedRoleRight}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='decent-admin__filter-arrow'
            />
            {isDropdownOpenRight && (
              <div className='decent-admin__dropdown'>
                {roleFilterOptions.map((item, index) => (
                  <div
                    key={index}
                    className='decent-admin__dropdown-item'
                    onClick={() => handleSelectRight(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='decent-admin__left-context'>
          <div className='decent-admin__left-context__tbody-wrapper'>
            <table className='decent-admin__left-context__table'>
              <thead>
                <tr>
                  <th>Tên thành viên</th>
                  <th>Mã sinh viên</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='decent-admin__left-context__tbody'>
                {loadingRight ? (
                  <tr>
                    <td colSpan='3' style={{ textAlign: 'center', padding: '2rem' }}>
                      Đang tải...
                    </td>
                  </tr>
                ) : usersRight.length > 0 ? (
                  usersRight.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <div className='user-info-cell'>
                          <span className='user-index'>
                            <h4>{index + 1}</h4>
                          </span>
                          <span>{item.fullName}</span>
                        </div>
                      </td>
                      <td>{item.studentCode}</td>
                      <td>
                        <input
                          type='checkbox'
                          checked={selectedUserIdsRight.includes(item.id)}
                          onChange={() => handleSelectionChange('right', item.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='3'>
                      <p style={{ textAlign: 'center', padding: '2rem' }}>
                        Không có thành viên nào với quyền này.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <LoadMoreButton
            hasMore={hasMoreRight}
            isLoading={loadingMoreRight}
            onClick={() => fetchUsersForPanel('right', currentPageRight + 1, true)}
          />
          <EndOfListMessage
            isLoading={loadingRight}
            hasMore={hasMoreRight}
            itemCount={usersRight.length}
            itemName='thành viên'
          />
        </div>
        <div className='decent-admin__left-button'>
          <span onClick={() => handleSelectAll('right')} className='decent-admin__left-button-span'>
            Chọn tất cả
          </span>
          <button onClick={handleRemoveRole}>Xóa</button>
          <button>Tạo nhóm chat</button>
        </div>
      </div>
    </div>
  )
}

export default DecentOfAdmin
