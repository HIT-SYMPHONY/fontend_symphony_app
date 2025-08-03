import * as yup from 'yup';

export const changePasswordSchema = yup.object({
  oldPassword: yup.string()
    .required("Vui lòng nhập mật khẩu hiện tại!"),
  newPassword: yup.string()
    .required("Vui lòng nhập mật khẩu mới!")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
  confirmPassword: yup.string()
    .required("Vui lòng nhập lại mật khẩu mới!")
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp!'),
}).required();