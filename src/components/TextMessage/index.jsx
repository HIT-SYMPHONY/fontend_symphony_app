import React from 'react'
import styles from './style.module.scss'

const LoadingSpinner = ({ text = 'Đang tải...' }) => {
  return <>{text && <p className={styles.text}>{text}</p>}</>
}

export default LoadingSpinner
