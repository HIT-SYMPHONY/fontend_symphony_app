import React, { useState, useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { getMyLessons } from '../../apis/lesson.api'
import { getLessonStatus, formatDateForBox, formatDateTime } from '../../utils/formatters'
import menuBookRounded from '@iconify-icons/material-symbols/menu-book-rounded'
import './style.scss'

const Homework = () => {
  const [allLessons, setAllLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Tất cả')

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true)
        const response = await getMyLessons()
        setAllLessons(response.data || [])
      } catch (error) {
        toast.error('Không thể tải danh sách bài học.')
      } finally {
        setLoading(false)
      }
    }
    fetchLessons()
  }, [])

  const classOptions = useMemo(() => {
    const classNames = allLessons.map((lesson) => lesson.className)
    return ['Tất cả', ...new Set(classNames)]
  }, [allLessons])

  const filteredLessons = useMemo(() => {
    if (selectedClass === 'Tất cả') return allLessons
    return allLessons.filter((lesson) => lesson.className === selectedClass)
  }, [allLessons, selectedClass])

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
          <p>Đang tải bài học...</p>
        ) : filteredLessons.length > 0 ? (
          filteredLessons.map((item) => {
            const status = getLessonStatus(item.startTime, item.endTime)

            return (
              <div key={item.id} className='baitap'>
                <div className='div'>
                  <span className={`vien ${status.backgroundClass}`}>
                    {formatDateForBox(item.endTime)}
                  </span>
                  <div className={status.colorClass}>
                    <h5>CHƯA HOÀN THÀNH</h5>
                    <div className={`daucuoi ${status.colorClass}`}>
                      <p>Tình trạng:</p>
                      <p>{status.text}</p>
                    </div>
                  </div>
                </div>
                <h5>{item.className}</h5>
                <div className='baitap__content'>
                  <div className={`vien ${status.backgroundClass}`}></div>
                  <div>
                    <div className='daucuoi'>
                      <p>Tên bài tập:</p>
                      <p className='ellipsis'>{item.title || item.content}</p>{' '}
                      {/* Fallback to content if title is null */}
                    </div>
                    <div className='daucuoi'>
                      <p>Người giao bài:</p>
                      <p>{item.leaderName}</p>
                    </div>
                    <div className='daucuoi'>
                      <p>Thời gian giao:</p>
                      <p>{formatDateTime(item.startTime)}</p>
                    </div>
                    <div className='daucuoi'>
                      <p>Hạn nộp:</p>
                      <p>{formatDateTime(item.endTime)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p>Không có bài học nào.</p>
        )}
      </div>
    </div>
  )
}

export default Homework
