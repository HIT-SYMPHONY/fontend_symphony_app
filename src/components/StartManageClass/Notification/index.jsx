import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Table, Button, Modal, Tooltip } from 'antd'
import { deleteNotification } from '../../../apis/notification.api'
import { getNotificationsOfClassroom } from 'apis/classroom.api'
import { formatDate } from '../../../utils/formatters'
import './style.scss'

const Notification = () => {
  const { classId } = useParams()

  const [notifications, setNotifications] = useState([])
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10, totalElements: 0 })
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const fetchNotifications = useCallback(
    async (page, size) => {
      if (!classId) return
      setLoading(true)
      try {
        const params = { pageNum: page, pageSize: size }
        const response = await getNotificationsOfClassroom(classId, params)
        const content = response.data
        setNotifications(content?.items || [])
        setPagination(content?.meta || { pageNum: page, pageSize: size, totalElements: 0 })
      } catch (error) {
        toast.error(error.response?.data?.message || 'Không thể tải danh sách thông báo.')
      } finally {
        setLoading(false)
      }
    },
    [classId],
  )

  useEffect(() => {
    fetchNotifications(1, 10)
  }, [fetchNotifications])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsModalOpen(false)
    const deleteToast = toast.loading('Đang xóa...')
    try {
      await deleteNotification(deleteId)
      toast.success('Xóa thông báo thành công!', { id: deleteToast })

      const isLastItemOnPage = notifications.length === 1 && pagination.pageNum > 1
      const pageToFetch = isLastItemOnPage ? pagination.pageNum - 1 : pagination.pageNum
      fetchNotifications(pageToFetch, pagination.pageSize)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Xóa thất bại.', { id: deleteToast })
    }
  }

  const openDeleteModal = (id) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleTableChange = (paginationConfig) => {
    fetchNotifications(paginationConfig.current, paginationConfig.pageSize)
  }

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: '5%',
      align: 'center',
      render: (_, __, index) => (pagination.pageNum - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Lớp',
      dataIndex: 'classRoomName',
      key: 'classRoomName',
      width: '15%',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      ellipsis: {
        showTitle: false,
      },
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      align: 'center',
      render: (text) => formatDate(text),
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdByName',
      key: 'createdByName',
      width: '15%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <Button type="text" danger icon={<Icon icon="fa-solid:trash" />} onClick={() => openDeleteModal(record.id)} />
      ),
    },
  ]

  return (
    <div className='notification'>
      <h3>Tất cả thông báo</h3>
      <div className='notification__sum'>
        <Table
          columns={columns}
          dataSource={notifications}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.pageNum,
            pageSize: pagination.pageSize,
            total: pagination.totalElements,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
          onChange={handleTableChange}
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.content}</p>,
            rowExpandable: (record) => !!record.content,
            expandedRowKeys: expandedId ? [expandedId] : [],
            onExpand: (expanded, record) => {
              setExpandedId(expanded ? record.id : null)
            },
          }}
          locale={{
            emptyText: 'Không có thông báo nào.',
          }}
        />
      </div>
      <Modal
        title="Xóa thông báo?"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
        centered= {true}
      >
        <p>Bạn có chắc chắn muốn xóa thông báo này không?</p>
      </Modal>
    </div>
  )
}

export default Notification
