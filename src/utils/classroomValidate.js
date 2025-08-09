import * as yup from 'yup'

const classroomBaseSchema = yup.object({
  name: yup.string().trim().required('Tên lớp học không thể trống'),
  startTime: yup.date().required('Ngày bắt đầu là bắt buộc').typeError('Ngày không hợp lệ'),
  duration: yup
    .number()
    .required('Độ dài là bắt buộc')
    .positive()
    .integer()
    .typeError('Độ dài phải là số'),
  leaderId: yup.string().required('Vui lòng chọn leader'),
  endTime: yup
    .date()
    .required('Ngày kết thúc là bắt buộc')
    .min(yup.ref('startTime'), 'Ngày kết thúc phải sau ngày bắt đầu')
    .typeError('Ngày không hợp lệ'),
  timeSlot: yup.string().trim().required('Lịch học là bắt buộc'),
  description: yup.string().trim(),
})

export const classroomCreationSchema = classroomBaseSchema

const toPartial = (schema) => {
  const partialSchema = {}
  const fields = schema.fields
  for (const key in fields) {
    partialSchema[key] = fields[key]
      .optional()
      .transform((value) => (value === '' ? undefined : value))
  }
  return yup.object(partialSchema)
}

export const classroomUpdateSchema = toPartial(classroomBaseSchema)
