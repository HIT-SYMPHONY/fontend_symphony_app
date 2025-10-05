import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getMyClasses } from '../../../../apis/user.api'
import { formatDate } from '../../../../utils/formatters'
import TextMessage from '../../../TextMessage'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { classStatusDropdownOptions } from 'constants/commonConstant'
import './style.scss'
import useOnClickOutside from 'hooks/useOnClickOutside'

const Classroom = () => {
  const navigate = useNavigate()
  const [classrooms, setClassrooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [classStatus, setClassStatus] = useState(null)
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useOnClickOutside([dropdownRef], () => setIsClassDropdownOpen(false))
  const fetchMyClasses = useCallback(async () => {
    try {
      setLoading(true)
      const params = {
        status: classStatus,
      }
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null))
      const response = await getMyClasses(filteredParams)
      setClassrooms(response.data || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách lớp học.')
    } finally {
      setLoading(false)
    }
  }, [classStatus])

  const handleSelectStatus = (value) => {
    setClassStatus(value)
    setIsClassDropdownOpen(false)
  }

  const currentStatusLabel =
    classStatusDropdownOptions.find((option) => option.value === classStatus)?.label || 'Tất cả'

  useEffect(() => {
    fetchMyClasses()
  }, [fetchMyClasses])

  return (
    <div className='flextap-one'>
      <div className='flextap-one__plus'>
        <div className='plustap'>
          <div className='plustap__plus'>
            <Icon
              icon='fluent:book-star-24-regular'
              width='25'
              height='25'
              className='plustap__plus__Icon'
            />
            <h2>Lớp học gần đây</h2>
          </div>
          <div className='plustap__infor' ref={dropdownRef}>
            <span
              className='plustap__infor__span'
              onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}>
              {isClassDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
              {currentStatusLabel}
            </span>
            {isClassDropdownOpen && (
              <div className='plustap__infor-dropdown'>
                {classStatusDropdownOptions.map((option) => (
                  <div
                    key={option.value || 'all'}
                    className='plustap__infor-dropdown-item'
                    onClick={() => handleSelectStatus(option.value)}>
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='class-tap thay2'>
          {loading ? (
            <TextMessage text='Đang tải lớp học...' />
          ) : classrooms.length > 0 ? (
            classrooms.map((item) => (
              <div className='class-tap__box' key={item.id}>
                <div className='class-tap__thumbnail'>
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className='class-tap__placeholder-image'></div>
                  )}
                </div>
                <div className='class-tap__content'>
                  <button className='class-tap__button' onClick={() => navigate(item.id)}>
                    VÀO HỌC
                  </button>
                  <h2 className='class-tap__content__title'>Private</h2>
                  <h2 className='class-tap__content__title'>{item.name}</h2>
                  <p className='class-tap__content__info'>
                    <span className='icon'>
                      <Icon icon='mdi:badge-account' />
                    </span>
                    Leader: {item.leaderName}
                  </p>
                  <p className='class-tap__content__info'>
                    <span className='icon'>
                      <Icon icon='mingcute:time-line' />
                    </span>
                    Ngày bắt đầu: {formatDate(item.startTime)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <TextMessage text='Bạn chưa tham gia lớp học nào!' />
          )}
        </div>
      </div>
    </div>
  )
}

export default Classroom
