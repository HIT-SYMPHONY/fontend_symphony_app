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
export const parseTextToSections = (text) => {
  if (!text || typeof text !== 'string') {
    return []
  }

  const sections = []
  const lines = text.split('\n')
  let currentSection = null

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    if (trimmedLine.startsWith('# ')) {
      if (currentSection) {
        sections.push({ ...currentSection, content: currentSection.content.trim() })
      }
      currentSection = {
        title: trimmedLine.substring(2).trim(),
        content: '',
      }
    } else if (currentSection) {
      currentSection.content += line + '\n'
    }
  })
  if (currentSection) {
    sections.push({ ...currentSection, content: currentSection.content.trim() })
  }

  return sections
}

export const toLocalDateTimeString = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const timezoneOffset = date.getTimezoneOffset() * 60000
  const localDate = new Date(date.getTime() - timezoneOffset)
  return localDate.toISOString().slice(0, 16)
}
