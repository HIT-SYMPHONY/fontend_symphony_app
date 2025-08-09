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
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      console.error('Invalid date string provided to formatDate:', dateString)
      return dateString
    }
    if (dateString.includes('T')) {
      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }

      const timePart = date.toLocaleTimeString('vi-VN', timeOptions)
      const datePart = date.toLocaleDateString('vi-VN')

      return `${timePart} ${datePart}`
    } else {
      return date.toLocaleDateString('vi-VN')
    }
  } catch (error) {
    console.error('Error formatting date:', dateString, error)
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

export const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A'
  try {
    return new Date(isoString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

// export const getDisplayName = (data) => {
//   const name = data.fullName?.trim()
//   const isValid =
//     name && name.toLowerCase() !== 'null' && !name.toLowerCase().includes('null') && name !== ''
//   return isValid ? name : 'HỌ VÀ TÊN'
// }
export const getDisplayName = (user) => {
  if (!user) return 'Không rõ'
  const name = user.fullName?.trim()
  if (name && name.toLowerCase() !== 'null') {
    return name
  }
  return user.username || 'Người dùng'
}
export const formatDateForBox = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return `${date.getDate()}/${date.getMonth() + 1}`
}

export const getLessonStatus = (startTimeISO, endTimeISO) => {
  if (!startTimeISO || !endTimeISO) {
    return { text: 'Chưa xếp lịch', backgroundClass: 'back-three', colorClass: 'color-three' }
  }

  const now = new Date()
  const startTime = new Date(startTimeISO)
  const endTime = new Date(endTimeISO)

  if (now > endTime) {
    return { text: 'Quá hạn', backgroundClass: 'back-three', colorClass: 'color-three' }
  }
  if (now.toDateString() === endTime.toDateString()) {
    return { text: 'Đến hạn', backgroundClass: 'back-two', colorClass: 'color-two' }
  }
  if (now < startTime) {
    return { text: 'Chưa đến hạn', backgroundClass: 'back-one', colorClass: 'color-one' }
  }

  return { text: 'Quá hạn', backgroundClass: 'back-three', colorClass: 'color-three' }
}

export const getPostStatus = (deadlineISO) => {
  if (!deadlineISO) {
    return { text: 'Không có hạn nộp', backgroundClass: 'back-one', colorClass: 'color-one' }
  }
  try {
    const now = new Date()
    const deadline = new Date(deadlineISO)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const deadlineDate = new Date(deadlineISO)
    deadlineDate.setHours(0, 0, 0, 0)

    if (now > deadline) {
      return { text: 'Đã quá hạn', backgroundClass: 'back-three', colorClass: 'color-three' }
    }
    if (today.getTime() === deadlineDate.getTime()) {
      return { text: 'Đến hạn hôm nay', backgroundClass: 'back-two', colorClass: 'color-two' }
    }
    if (now < deadline) {
      return { text: 'Chưa đến hạn', backgroundClass: 'back-one', colorClass: 'color-one' }
    }

    return { text: 'Không xác định', backgroundClass: 'back-three', colorClass: 'color-three' }
  } catch (error) {
    console.error('Error calculating homework status:', deadlineISO, error)
    return { text: 'Lỗi ngày', backgroundClass: 'back-three', colorClass: 'color-three' }
  }
}
