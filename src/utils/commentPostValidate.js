import * as yup from 'yup'

export const commentPostSchema = yup
  .object({
    content: yup.string().trim().required('Vui lòng nhập câu trả lời của bạn.'),
  })
  .required()
