import * as yup from 'yup'
import { yupDayjs, yupTiptapJSON, toPartial } from './yupHelpers'

const competitionBaseSchema = yup.object({
  name: yup.string().trim().required('Tên cuộc thi không thể trống'),
  description: yupTiptapJSON({ isRequired: false }),
  rule: yupTiptapJSON({ isRequired: false }),
  content: yupTiptapJSON({
    isRequired: true,
    requiredMessage: 'Nội dung/Đề thi không thể trống',
  }),

  competitionLeaderId: yup.string().required('Vui lòng chọn người phụ trách'),

  startTime: yupDayjs({
    isRequired: true,
    requiredMessage: 'Ngày bắt đầu không thể trống',
    mustBeInFuture: true,
    futureMessage: 'Ngày bắt đầu phải ở trong tương lai',
  }),

  endTime: yupDayjs({
    isRequired: true,
    requiredMessage: 'Ngày kết thúc không thể trống',
  }).test('is-after-start', 'Ngày kết thúc phải sau ngày bắt đầu', function (endTime) {
    const { startTime } = this.parent
    if (!startTime || !endTime) {
      return true
    }
    return endTime.isAfter(startTime)
  }),
})

export const competitionCreationSchema = competitionBaseSchema
export const competitionUpdateSchema = toPartial(competitionBaseSchema, [
  'competitionLeaderId',
  'name',
  'content',
  'startTime',
  'endTime'
])
