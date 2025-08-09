import React, { useState, useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { getMyPosts } from '../../apis/post.api'
import { getPostStatus, formatDateForBox, formatDateTime, getDisplayName } from '../../utils/formatters'
import menuBookRounded from '@iconify-icons/material-symbols/menu-book-rounded'
import './style.scss'

const Homework = () => {
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Tất cả')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await getMyPosts()
        setAllPosts(response.data || [])
      } catch (error) {
        toast.error('Không thể tải danh sách bài tập.')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const classOptions = useMemo(() => {
    const classNames = allPosts.map((post) => post.classRoomName)
    return ['Tất cả', ...new Set(classNames)]
  }, [allPosts])

  const filteredPosts = useMemo(() => {
    if (selectedClass === 'Tất cả') return allPosts
    return allPosts.filter((post) => post.classRoomName === selectedClass)
  }, [allPosts, selectedClass])

  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const handleSelectClass = (className) => {
    setSelectedClass(className)
    setIsOpen(false)
  }

  return (
    <div className='homework'>
      <div className='homework__icon'>
        <div className='homework__icon__baitap'>
          <Icon icon={menuBookRounded} width='25' height='25' className='mau' />
          <h4>Bài Tập</h4>
        </div>
        <div className='homework__icon__bieutuong'>
          <div className='dropdown'>
            <button className='dropdown-btn' onClick={toggleDropdown}>
              {isOpen ? (
                <>
                  <i className='fa-solid fa-angle-up'></i> <span>{selectedClass}</span>
                </>
              ) : (
                <>
                  <i className='fa-solid fa-angle-down'></i> <span>{selectedClass}</span>
                </>
              )}
            </button>
            {isOpen && (
              <div className='dropdown-content'>
                {classOptions.map((name) => (
                  <a key={name} href='#' onClick={() => handleSelectClass(name)}>
                    {name}
                  </a>
                ))}
              </div>
            )}
          </div>
          <Icon icon='stash:filter-solid' width='25' height='25' className='mau' />
        </div>
      </div>
      <div className='homework__baitap'>
        {loading ? (
          <p>Đang tải bài tập...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((item) => {
            const status = getPostStatus(item.deadline)

            return (
              <div key={item.id} className='baitap'>
                <div className='div'>
                  <span className={`vien ${status.backgroundClass}`}>
                    {formatDateForBox(item.deadline)}
                  </span>
                  <div className={status.colorClass}>
                    <h5>CHƯA HOÀN THÀNH</h5>
                    <div className={`daucuoi ${status.colorClass}`}>
                      <p>Tình trạng:</p>
                      <p>{status.text}</p>
                    </div>
                  </div>
                </div>
                <h5>Lớp: {item.classRoomName}</h5>
                <div className='baitap__content'>
                  <div className={`vien ${status.backgroundClass}`}></div>
                  <div>
                    <div className='daucuoi'>
                      <p>Tên bài tập:</p>
                      <p className='ellipsis'>{item.title}</p>
                    </div>
                    <div className='daucuoi'>
                      <p>Người giao bài:</p>
                      <p>{getDisplayName(item)}</p>
                    </div>
                    <div className='daucuoi'>
                      <p>Thời gian giao:</p>
                      <p>{formatDateTime(item.createdAt)}</p>
                    </div>
                    <div className='daucuoi'>
                      <p>Hạn nộp:</p>
                      <p>{formatDateTime(item.deadline)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p>Không có bài tập nào.</p>
        )}
      </div>
    </div>
  )
}

export default Homework
