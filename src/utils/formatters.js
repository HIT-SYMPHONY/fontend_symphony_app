const statusMap = {
  UPCOMING: 'Sắp diễn ra',
  ONGOING: 'Đang diễn ra',
  COMPLETED: 'Hoàn thành',
}
export const translateStatus = (statusKey) => {
  return statusMap[statusKey] || statusKey
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleDateString('vi-VN')
  } catch (error) {
    console.error('Invalid date string:', dateString)
    return dateString
  }
}
