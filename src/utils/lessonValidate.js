import * as yup from 'yup'

// This is the base schema, our single source of truth
const lessonBaseSchema = yup.object({
  title: yup.string().trim().required('Tên bài học không thể trống'),
  content: yup.string().trim().required('Nội dung không thể trống'),
  location: yup.string().trim().required('Địa điểm không thể trống'),
  startTime: yup.string().required('Thời gian bắt đầu không thể trống'),
  endTime: yup
    .string()
    .required('Thời gian kết thúc không thể trống')
    .test('is-greater', 'Thời gian kết thúc phải sau thời gian bắt đầu', function (value) {
      const { startTime } = this.parent
      return !startTime || !value || value > startTime
    }),
  dayOfWeek: yup.string().required('Vui lòng chọn ngày học'),
  classRoomId: yup.string().required(),
})

// Schema for creating (all fields required)
export const lessonCreationSchema = lessonBaseSchema

// Helper to make all fields optional for PATCH requests
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

// Schema for updating (all fields are optional but validated if present)
export const lessonUpdateSchema = toPartial(lessonBaseSchema)
