import React from 'react'
import './style.scss'
const EndOfListMessage = ({ isLoading, hasMore, itemCount, itemName }) => {
  if (isLoading || hasMore || itemCount === 0) {
    return null
  }

  return <p className='end-of-list-message'>Bạn đã xem hết tất cả {itemName}.</p>
}

export default EndOfListMessage
