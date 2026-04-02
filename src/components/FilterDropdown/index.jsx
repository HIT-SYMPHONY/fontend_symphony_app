import React, { useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import styles from './style.module.scss'
const FilterDropdown = ({ options, value, onSelect, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useOnClickOutside([dropdownRef], () => setIsOpen(false))

  const selectedLabel =
    options.find((opt) => (typeof opt === 'object' ? opt.value === value : opt === value))
      ?.label || value

  const handleSelect = (option) => {
    const valueToSelect = typeof option === 'object' ? option.value : option
    onSelect(valueToSelect)
    setIsOpen(false)
  }
  const containerClasses = `${styles.filterDropdown} ${className}`.trim()

  return (
    <div className={containerClasses} onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
      <Icon icon='stash:filter-solid' width='28' height='28' className={styles.icon} />
      <div className={styles.label}>{selectedLabel}</div>
      <Icon icon='mdi:chevron-down' width='20' height='20' className={styles.arrow} />
      {isOpen && (
        <div className={styles.menu}>
          {options.map((option, index) => {
            const itemValue = typeof option === 'object' ? option.value : option
            const itemLabel = typeof option === 'object' ? option.label : option
            return (
              <div
                key={itemValue || index}
                className={styles.menuItem}
                onClick={() => handleSelect(option)}>
                {itemLabel}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown