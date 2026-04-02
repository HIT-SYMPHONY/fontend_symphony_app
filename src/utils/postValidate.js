import * as yup from 'yup'
import { yupDayjs, yupTiptapJSON } from './yupHelpers'

export const postCreationSchema = yup
  .object({
    title: yup.string().trim().required('Tiêu đề không thể trống'),
    content: yupTiptapJSON({
      isRequired: true,
      requiredMessage: 'Nội dung không thể trống',
    }),
    deadline: yupDayjs({
      isRequired: true,
      requiredMessage: 'Hạn nộp không thể trống',
      mustBeInFuture: true,
      futureMessage: 'Hạn nộp phải ở trong tương lai',
    }),
  })
  .required()


