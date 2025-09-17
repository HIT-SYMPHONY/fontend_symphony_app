const intakeOptions = ['Tất cả', 'K16', 'K17', 'K18', 'K19', 'K20']
const roleFilterOptions = ['Tất cả', 'USER', 'LEADER', 'ADMIN']
const PAGE_SIZE = 10
const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 7 }, (_, i) => currentYear + 1 - i)
const yearFilterOptions = ['Tất cả', ...yearOptions]
export { intakeOptions, roleFilterOptions, yearFilterOptions, PAGE_SIZE }
