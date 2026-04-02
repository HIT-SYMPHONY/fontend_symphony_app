import * as yup from 'yup'
import { yupTiptapJSON } from './yupHelpers'

const commentCompetitionSchema = yup.object({
  content: yupTiptapJSON({
    isRequired: true,
    requiredMessage: 'Nội dung không thể trống',
  }),
})
export const gradingSchema = yup.object({
  score: yup
    .number()
    .typeError('Điểm phải là một số')
    .required('Vui lòng nhập điểm')
    .min(0, 'Điểm tối thiểu là 0.0')
    .max(10, 'Điểm tối đa là 10.0'),
  feedback: yupTiptapJSON({
    isRequired: false,
  }),
})
export const commentCompetitionCreationSchema = commentCompetitionSchema
