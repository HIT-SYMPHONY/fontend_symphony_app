const statusMap = {
  UPCOMING: 'Sắp diễn ra',
  ONGOING: 'Đang diễn ra',
  COMPLETED: 'Hoàn thành',
}
export const translateStatus = (statusKey) => {
  return statusMap[statusKey] || statusKey
}

const genderMap = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác',
}
export const translateGender = (genderKey) => {
  return genderMap[genderKey] || 'N/A'
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

export const toLocalDateTimeString = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const timezoneOffset = date.getTimezoneOffset() * 60000
  const localDate = new Date(date.getTime() - timezoneOffset)
  return localDate.toISOString().slice(0, 16)
}

export const formatDateForAPI = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    return null
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getDisplayName = (data) => {
  const name = data.fullName?.trim()
  console.log(name)
  const isValid =
    name && name.toLowerCase() !== 'null' && !name.toLowerCase().includes('null') && name !== ''
  return isValid ? name : 'HỌ VÀ TÊN'
}
