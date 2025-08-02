import React from 'react'
import './style.scss'
const LoadMoreButton = ({ isLoading, hasMore, onClick }) => {
  if (!hasMore) {
    return null
  }

  return (
    <div className='load-more-container'>
      <button className='load-more-button' onClick={onClick} disabled={isLoading}>
        {isLoading ? 'Đang tải...' : 'Tải thêm'}
      </button>
    </div>
  )
}

export default LoadMoreButton
