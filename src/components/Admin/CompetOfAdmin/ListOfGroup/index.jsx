import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  getMyNotifications,
  deleteNotification,
} from '../../../../apis/notification.api'
import { formatDate } from '../../../../utils/formatters'
import './style.scss'

const ListOfGroup = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams() // Keep for dynamic nav links

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState({})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông báo')
  const dropdownRef = useRef(null)

  const classOptions = [
    { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
    { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
    { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
    { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
  ]

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true)
      // Fetches notifications for the logged-in user, no ID needed.
      const res = await getMyNotifications({ pageNum: 1, pageSize: 100 }) // Fetch up to 100
      setItems(res.data?.items || [])
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tải thông báo.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const handleDelete = async (notificationId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa thông báo này?')) return

    const deleteToast = toast.loading('Đang xóa...')
    try {
      await deleteNotification(notificationId)
      toast.success('Xóa thông báo thành công!', { id: deleteToast })
      fetchNotifications()
    } catch (err) {
      const message = err.response?.data?.message || 'Xóa thất bại.'
      toast.error(message, { id: deleteToast })
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item) => setSelectedClass(item)
  const handleOption = (item) => {
    if (item?.link) {
      handleSelect(item.option)
      navigate(item.link)
      setIsDropdownOpen(false)
    }
  }
  const toggleExpand = (id) => setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className='list-member-admin'>
      <div className='list-member-admin__header'>
        <i
          className='list-member-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate(`/admin/competitions`)}></i>
        <div
          className='list-member-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='list-member-admin__filter-icon'
          />
          <div className='list-member-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='list-member-admin__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='list-member-admin__dropdown'>
              {classOptions.map((item, index) => (
                <div
                  key={index}
                  className='check-class-admin__dropdown-item'
                  onClick={() => handleOption(item)}>
                  {item.option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='list-member-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='list-member-admin__search-input'
          />
          <i className='list-member-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button className='list-member-admin__create-button' onClick={() => navigate('create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <div className='list-member-admin__context'>
        <h3>Tất cả thông báo ({loading ? '...' : items.length})</h3>
        <div className='list-member-admin__context-table'>
          <div className='list-member-admin__context-table-title'>
            <h5>STT</h5>
            <h5>Lớp học</h5>
            <h5>Tên thông báo</h5>
            <h5>Ngày tạo</h5>
            <h5>Người tạo</h5>
            <h5></h5>
          </div>
          <div className='list-member-admin__context-table-list'>
            {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</div>}
            {!loading &&
              items.map((item, index) => (
                <div className='list-member-admin__context-table-list__item' key={item.id}>
                  <div className='list-member-admin__context-table-list__item-box'>
                    <h5>{index + 1}</h5>
                    <h5>{item.classRoomName}</h5>
                    <h5>{item.content}</h5>
                    <h5>{formatDate(item.createdAt)}</h5>
                    <h5>{item.createdBy}</h5>
                    <div className='div'>
                      <i
                        className={
                          expandedItems[item.id]
                            ? 'fa-solid fa-chevron-up div-i'
                            : 'fa-solid fa-chevron-down div-i'
                        }
                        onClick={() => toggleExpand(item.id)}></i>
                      <i
                        className='fa-solid fa-trash div-de'
                        onClick={() => handleDelete(item.id)}></i>
                    </div>
                  </div>
                  {expandedItems[item.id] && (
                    <>
                      <hr />
                      <div className='list-member-admin__context-table-list__item-then'>
                        <h5>Nội dung:</h5>
                        <p>{item.content}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            {!loading && items.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                Chưa có thông báo nào.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListOfGroup
