

import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getNotificationsByClassId, deleteNotification } from '../../../apis/notification.api'
import { formatDate } from '../../../utils/formatters'
import './style.scss'

const Notification = () => {
  const { classId } = useParams()

  const [notifications, setNotifications] = useState([])
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10, totalElements: 0 })
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  const fetchNotifications = useCallback(
    async (page = 1) => {
      if (!classId) return
      try {
        setLoading(true)
        const params = { pageNum: page, pageSize: pagination.pageSize }
        const response = await getNotificationsByClassId(classId, params)
        const content = response.data
        if (content?.items) setNotifications(content.items)
        if (content?.meta) setPagination((prev) => ({ ...prev, ...content.meta }))
      } catch (error) {
        toast.error(error.response?.data?.message || 'Không thể tải danh sách thông báo.')
      } finally {
        setLoading(false)
      }
    },
    [classId, pagination.pageSize],
  )

  useEffect(() => {
    fetchNotifications(pagination.pageNum)
  }, [fetchNotifications, pagination.pageNum])

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id))
  }

  const handleDelete = async (notificationId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa thông báo này không?')) {
      return
    }

    const deleteToast = toast.loading('Đang xóa...')
    try {
      await deleteNotification(notificationId)
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
      toast.success('Xóa thông báo thành công!', { id: deleteToast })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Xóa thất bại.', { id: deleteToast })
    }
  }

  return (
    <div className='notification'>
      <h3>Tất cả thông báo</h3>
      <div className='notification__sum'>
        <table className='notification__sum__table'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Lớp</th>
              <th>Nội dung</th>
              <th>Ngày tạo</th>
              <th>Người tạo</th>
              <th></th>
            </tr>
          </thead>
        </table>
        <div className='notification__sum__list'>
          {loading && <p style={{ textAlign: 'center', padding: '1rem' }}>Đang tải...</p>}
          {!loading &&
            notifications.map((item, index) => (
              <div className='notification__sum__list__box' key={item.id}>
                <div className='notification__sum__list__box__item'>
                  <h5>{index + 1}</h5>
                  <h5>{item.classRoomName}</h5>
                  <h5>
                    {item.content.substring(0, 40)}
                    {item.content.length > 40 ? '...' : ''}
                  </h5>
                  <h5>{formatDate(item.createdAt)}</h5>
                  <h5>{item.createdBy.substring(0, 8)}...</h5>
                  <div className='notification-actions'>
                    <i className='fa-solid fa-trash' onClick={() => handleDelete(item.id)}></i>
                    <Icon
                      icon={expandedId === item.id ? 'mingcute:up-fill' : 'mingcute:down-fill'}
                      width='24'
                      height='24'
                      className='notification__sum__list__box__item__icon'
                      onClick={() => toggleExpand(item.id)}
                    />
                  </div>
                </div>
                {expandedId === item.id && (
                  <>
                    <hr />
                    <div className='notification__sum__list__box__para'>
                      <div className='notification__sum__list__box__para__begin'>
                        <h4>Nội dung: </h4>
                      </div>
                      <div className='notification__sum__list__box__para__end'>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          {!loading && notifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '1rem' }}>Không có thông báo nào.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notification
