const intakeOptions = ['Tất cả', 'K15', 'K16', 'K17', 'K18', 'K19', 'K20', 'K21', 'K22']
const roleFilterOptions = ['Tất cả', 'USER', 'LEADER', 'ADMIN']
const classStatuses = ['ALL', 'UPCOMING', 'ONGOING', 'COMPLETED']
const classStatusDropdownOptions = [
  { value: null, label: 'Tất cả' },
  { value: 'ONGOING', label: 'Lớp đang học' },
  { value: 'COMPLETED', label: 'Lớp đã học' },
  { value: 'UPCOMING', label: 'Lớp sắp tới' },
]
const NON_SEARCHABLE_PATHS = ['/account']
const PAGE_SIZE = 10
const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 7 }, (_, i) => currentYear + 1 - i)
const yearFilterOptions = ['Tất cả', ...yearOptions]
const DISPLAY_DATE_FORMAT = 'DD/MM/YYYY'
const API_DATE_FORMAT = 'YYYY-MM-DD'
const DISPLAY_DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'
const API_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'
const DISPLAY_TIME_FORMAT = 'HH:mm'
const API_TIME_FORMAT = 'HH:mm:ss'
export {
  intakeOptions,
  roleFilterOptions,
  yearFilterOptions,
  PAGE_SIZE,
  DISPLAY_DATE_FORMAT,
  API_DATE_FORMAT,
  DISPLAY_DATETIME_FORMAT,
  API_DATETIME_FORMAT,
  classStatuses,
  classStatusDropdownOptions,
  NON_SEARCHABLE_PATHS,
  DISPLAY_TIME_FORMAT,
  API_TIME_FORMAT,
}
