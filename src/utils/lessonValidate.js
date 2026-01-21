import * as yup from 'yup'
import { yupDayjs, yupTiptapJSON, toPartial } from './yupHelpers'
const lessonBaseSchema = yup.object({
  title: yup.string().trim().required('Tên bài học không thể trống'),
  content: yupTiptapJSON({
    isRequired: true,
    requiredMessage: 'Nội dung không thể trống',
  }),
  location: yup.string().trim(),
  startTime: yupDayjs({
    isRequired: true,
    requiredMessage: 'Thời gian bắt đầu không thể trống',
  }),
  endTime: yupDayjs({
    isRequired: true,
    requiredMessage: 'Thời gian kết thúc không thể trống',
  }).test('is-after-start', 'Thời gian kết thúc phải sau thời gian bắt đầu', function (endTime) {
    const { startTime } = this.parent
    if (!startTime || !endTime) {
      return true
    }
    return endTime.isAfter(startTime)
  }),

  dayOfWeek: yup.string().required('Vui lòng chọn ngày học'),
})
export const lessonCreationSchema = lessonBaseSchema
export const lessonUpdateSchema = toPartial(lessonBaseSchema, [
  'title',
  'content',
  'startTime',
  'endTime',
  'dayOfWeek',
])
