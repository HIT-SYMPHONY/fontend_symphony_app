import { useInternalMessage } from 'antd/es/message/useMessage'
import * as yup from 'yup'
import { yupDayjs, toPartial } from './yupHelpers'

const userBaseSchema = yup.object({
  firstName: yup.string().trim(),
  lastName: yup.string().trim(),
  studentCode: yup.string().trim().length(10, 'Mã sinh viên phải có đúng 10 ký tự'),
  email: yup.string().email('Email không đúng định dạng').trim(),
  phoneNumber: yup.string().trim(),
  intake: yup.string().trim(),
  gender: yup.string().oneOf(['MALE', 'FEMALE', 'OTHER']).nullable().optional(),
  dateBirth: yupDayjs({
    isRequired: false,
    mustBeInPast: true,
    pastMessage: 'Ngày sinh phải ở trong quá khứ',
  }),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  username: yup.string().trim(),
})

export const userCreationSchema = yup
  .object({
    lastName: yup.string().trim().required('Họ đệm không thể trống'),
    firstName: yup.string().trim().required('Tên không thể trống'),
    studentCode: yup
      .string()
      .trim()
      .required('Mã sinh viên không thể trống')
      .length(10, 'Mã sinh viên phải có đúng 10 ký tự'),
    email: yup.string().email('Email không đúng định dạng').required('Email không thể trống'),
  })
  .required()

export const userUpdateSchema = toPartial(userBaseSchema)
