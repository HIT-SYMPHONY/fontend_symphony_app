import * as yup from 'yup'

export const postCreationSchema = yup
  .object({
    title: yup.string().trim().required('Tiêu đề không thể trống'),
    content: yup.string().trim().required('Nội dung không thể trống'),
    deadline: yup
      .date()
      .required('Hạn nộp không thể trống')
      .min(new Date(), 'Hạn nộp phải ở trong tương lai')
      .typeError('Vui lòng nhập ngày giờ hợp lệ'),
    classRoomId: yup.string().required(),
  })
  .required()
