import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllUsers, updateUserRoles } from '../../../apis/user.api'
import './style.scss'
import { getDisplayName } from '../../../utils/formatters'

const DecentOfAdmin = () => {
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
  const [selectedRoleLeft, setSelectedRoleLeft] = useState('Tất cả lớp')
  const [searchQueryLeft, setSearchQueryLeft] = useState('')
  const dropdownRefLeft = useRef(null)

  const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
  const [selectedRoleRight, setSelectedRoleRight] = useState('LEADER')
  const [searchQueryRight, setSearchQueryRight] = useState('')
  const dropdownRefRight = useRef(null)

  const [selectedUserIdsLeft, setSelectedUserIdsLeft] = useState([])
  const [selectedUserIdsRight, setSelectedUserIdsRight] = useState([])

  const roleOptions = ['USER', 'LEADER', 'ADMIN']

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await getAllUsers()
      setAllUsers(response.data || [])
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tải danh sách thành viên.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsersLeft = useMemo(() => {
    let filtered = [...allUsers]
    if (selectedRoleLeft !== 'Tất cả lớp') {
      filtered = filtered.filter((user) => user.role === selectedRoleLeft)
    }
    if (searchQueryLeft) {
      const lowercasedQuery = searchQueryLeft.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(lowercasedQuery) ||
          user.studentCode?.includes(lowercasedQuery),
      )
    }
    return filtered
  }, [allUsers, selectedRoleLeft, searchQueryLeft])

  const filteredUsersRight = useMemo(() => {
    let filtered = allUsers.filter((user) => user.role === selectedRoleRight)
    if (searchQueryRight) {
      const lowercasedQuery = searchQueryRight.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(lowercasedQuery) ||
          user.studentCode?.includes(lowercasedQuery),
      )
    }
    return filtered
  }, [allUsers, selectedRoleRight, searchQueryRight])

  const handleSelectionChange = (panel, userId) => {
    const setter = panel === 'left' ? setSelectedUserIdsLeft : setSelectedUserIdsRight
    setter((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    )
  }

  const handleSelectAll = (panel) => {
    const usersToSelect = panel === 'left' ? filteredUsersLeft : filteredUsersRight
    const userIdsToSelect = usersToSelect.map((user) => user.id)
    const setter = panel === 'left' ? setSelectedUserIdsLeft : setSelectedUserIdsRight
    const currentSelection = panel === 'left' ? selectedUserIdsLeft : selectedUserIdsRight
    const allSelected =
      userIdsToSelect.length > 0 && userIdsToSelect.every((id) => currentSelection.includes(id))

    if (allSelected) {
      setter(currentSelection.filter((id) => !userIdsToSelect.includes(id)))
    } else {
      setter([...new Set([...currentSelection, ...userIdsToSelect])])
    }
  }

  const handleAssignRole = async (newRole) => {
    if (selectedUserIdsLeft.length === 0) {
      toast.error('Vui lòng chọn thành viên từ danh sách bên trái để gán quyền.')
      return
    }
    await updateRoles(selectedUserIdsLeft, newRole, 'Gán quyền')
  }

  const handleRemoveRole = async () => {
    if (selectedUserIdsRight.length === 0) {
      toast.error('Vui lòng chọn thành viên từ danh sách bên phải để xóa quyền.')
      return
    }
    await updateRoles(selectedUserIdsRight, 'USER', 'Xóa quyền')
  }

  const updateRoles = async (userIds, newRole, actionName) => {
    const actionToast = toast.loading(`Đang ${actionName.toLowerCase()}...`)
    const payload = {
      roleStr: newRole,
      usersId: userIds,
    }
    try {
      await updateUserRoles(payload)
      await fetchUsers()
      setSelectedUserIdsLeft([])
      setSelectedUserIdsRight([])
      toast.success(`${actionName} thành công!`, { id: actionToast })
    } catch (error) {
      const message = error.response?.data?.message || `Lỗi khi ${actionName.toLowerCase()}.`
      toast.error(message, { id: actionToast })
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target))
        setIsDropdownOpenLeft(false)
      if (dropdownRefRight.current && !dropdownRefRight.current.contains(event.target))
        setIsDropdownOpenRight(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
                {['Tất cả lớp', ...roleOptions].map((item, index) => (
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
                {loading ? (
                  <tr>
                    <td colSpan='4' style={{ textAlign: 'center', padding: '2rem' }}>
                      Đang tải...
                    </td>
                  </tr>
                ) : (
                  filteredUsersLeft.map((item, index) => (
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
                )}
              </tbody>
            </table>
          </div>
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
                {roleOptions.map((item, index) => (
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
                {loading ? (
                  <tr>
                    <td colSpan='3' style={{ textAlign: 'center', padding: '2rem' }}>
                      Đang tải...
                    </td>
                  </tr>
                ) : (
                  filteredUsersRight.map((item, index) => (
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
                )}
              </tbody>
            </table>
          </div>
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
// onClick={() => setShowNoti(true)}
export default DecentOfAdmin
