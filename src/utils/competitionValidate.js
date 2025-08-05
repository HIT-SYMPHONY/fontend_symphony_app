import * as yup from 'yup'
export const competitionCreationSchema = yup.object({
  name: yup.string().trim().required('Tên cuộc thi không thể trống'),

  description: yup.string().trim(),

  rule: yup.string().trim(),

  content: yup.string().trim().required('Nội dung/Đề thi không thể trống'),

  competitionLeaderId: yup.string().required('Vui lòng chọn người phụ trách'),

  startTime: yup
    .date()
    .required('Ngày bắt đầu không thể trống')
    .min(new Date(), 'Ngày bắt đầu phải ở trong tương lai')
    .typeError('Vui lòng nhập ngày giờ hợp lệ'),

  endTime: yup
    .date()
    .required('Ngày kết thúc không thể trống')
    .min(yup.ref('startTime'), 'Ngày kết thúc phải sau ngày bắt đầu')
    .typeError('Vui lòng nhập ngày giờ hợp lệ'),
})

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

export const competitionUpdateSchema = toPartial(competitionCreationSchema)
