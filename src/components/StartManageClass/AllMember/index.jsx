import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getMembersInClassroom } from '../../../apis/classroom.api'
import LoadMoreButton from '../../LoadMoreButton'
import EndOfListMessage from '../../EndOfListMessage'
import placeholderImage from '../../../assets/img/Ellipse.png'
import './style.scss'
import { getDisplayName } from '../../../utils/formatters'

const AllMember = () => {
  const { classId } = useParams()
  const [members, setMembers] = useState([])
  const [pagination, setPagination] = useState({ pageNum: 1, totalPages: 1, totalElements: 0 })
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchMembers = useCallback(
    async (page = 1, isLoadMore = false) => {
      if (!classId) return
      isLoadMore ? setLoadingMore(true) : setLoading(true)
      try {
        const params = { pageNum: page, pageSize: 10 }
        const response = await getMembersInClassroom(classId, params)
        const content = response.data

        if (content && content.items) {
          if (isLoadMore) {
            setMembers((prev) => [...prev, ...content.items])
          } else {
            setMembers(content.items)
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
        toast.error('Không thể tải danh sách thành viên.')
      } finally {
        isLoadMore ? setLoadingMore(false) : setLoading(false)
      }
    },
    [classId],
  )

  useEffect(() => {
    fetchMembers(1)
  }, [fetchMembers])

  const handleLoadMore = () => {
    const nextPage = pagination.pageNum + 1
    fetchMembers(nextPage, true)
  }

  const hasMore = pagination.pageNum < pagination.totalPages

  return (
    <div className='all-member-container'>
      <h3>Danh sách thành viên</h3>
      <div className='all-member-container__summary'>
        <h4>Số lượng thành viên:</h4>
        <span>{loading ? '...' : pagination.totalElements}</span>
      </div>

      <div className='all-member__grid'>
        <div className='all-member__grid-header'>
          <h5>Tên thành viên</h5>
          <h5>Mã sinh viên</h5>
          <h5 className='all-member__grid-header__intake'>Khóa</h5>
          <span></span>
        </div>
        <div className='all-member__grid-body'>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '1rem' }}>Đang tải...</p>
          ) : (
            members.map((item, index) => (
              <div className='all-member__grid-row' key={item.id}>
                <h5 className='all-member__grid-row__number'>{index + 1}</h5>
                <h5>{getDisplayName(item)}</h5>
                <h5>{item.studentCode}</h5>
                <h5>{item.intake}</h5>
                <img
                  src={item.imageUrl || placeholderImage}
                  alt='profile'
                  className='all-member__grid-img'
                />
              </div>
            ))
          )}
        </div>
        <LoadMoreButton isLoading={loadingMore} hasMore={hasMore} onClick={handleLoadMore} />
        <EndOfListMessage
          isLoading={loading}
          hasMore={hasMore}
          itemCount={members.length}
          itemName='thành viên'
        />
      </div>
    </div>
  )
}

export default AllMember
