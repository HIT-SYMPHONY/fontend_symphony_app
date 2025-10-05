import React, { useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useLocation, useNavigate } from 'react-router-dom'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { FaListUl } from 'react-icons/fa'
import styles from '../FilterDropdown/style.module.scss'
const NavigationDropdown = ({ options, placeholder = '--- Danh mục ---', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useOnClickOutside([dropdownRef], () => setIsOpen(false))
  const currentOption = options.find((opt) => opt.link === location.pathname)
  const displayLabel = currentOption ? currentOption.option : placeholder

  const handleNavigate = (link) => {
    navigate(link)
    setIsOpen(false)
  }

  const containerClasses = `${styles.filterDropdown} ${className}`.trim()

  return (
    <div className={containerClasses} onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
      <FaListUl className={styles.icon}/>
      <div className={styles.label}>{displayLabel}</div>
      <Icon icon='mdi:chevron-down' width='20' height='20' className={styles.arrow} />
      {isOpen && (
        <div className={styles.menu}>
          {options.map((item, index) => (
            <div
              key={item.link || index}
              className={styles.menuItem}
              onClick={(e) => {
                e.stopPropagation()
                handleNavigate(item.link)
              }}>
              {item.option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavigationDropdown
