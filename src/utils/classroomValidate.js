import * as yup from 'yup'
import dayjs from 'dayjs'
import { yupDayjs, toPartial } from './yupHelpers'

const classroomBaseSchema = yup.object({
  name: yup.string().trim().required('Tên lớp học không thể trống'),
  startTime: yupDayjs({ isRequired: false }),

  duration: yup
    .number()
    .positive('Thời lượng phải là số dương')
    .integer('Thời lượng phải là số nguyên')
    .required('Thời lượng không thể trống')
    .typeError('Vui lòng nhập số'),

  leaderId: yup.string().required('Vui lòng chọn leader'),
  endTime: yupDayjs({ isRequired: false }).test(
    'is-after-start',
    'Ngày kết thúc phải sau ngày bắt đầu',
    function (endTime) {
      const { startTime } = this.parent
      if (!startTime || !endTime) {
        return true
      }
      return endTime.isAfter(startTime)
    },
  ),

  timeSlot: yup.string().trim().required('Lịch học là bắt buộc'),
  description: yup
    .object()
    .nullable() 
    .test('is-tiptap-doc', 'Mô tả không hợp lệ', (value) => {
      return !value || (value.type === 'doc' && Array.isArray(value.content))
    }),
})

export const classroomCreationSchema = classroomBaseSchema

export const classroomUpdateSchema = toPartial(classroomBaseSchema, ['name'])
