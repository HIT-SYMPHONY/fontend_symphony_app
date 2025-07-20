import * as Yup from "yup";

export const loginValidate = () =>
  Yup.object({
    email: Yup.string().email("email khong hop le ").required("trong"),
    password: Yup.string()
      .min(6, () => {
        return "thiếu kí tự";
      })
      .max(12, () => {
        return "Thừa kí tự ";
      })
      .required("trong"),
    repeat: Yup.string()
      .oneOf([Yup.ref("password"), null], "mật khẩu nhập lại sai ")
      .min(6, () => {
        return "thiếu kí tự";
      })
      .max(12, () => {
        return "Thừa kí tự ";
      })
      .required("trong"),
    name: Yup.string().required("trong"),
    check: Yup.boolean().oneOf([true], "bạn phải đồng ý diều khoảng "),
  });
