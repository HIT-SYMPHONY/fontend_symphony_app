import * as yup from 'yup'

const userBaseSchema = yup.object({
  firstName: yup.string().trim(),
  lastName: yup.string().trim(),
  studentCode: yup.string().trim().length(10, 'Mã sinh viên phải có đúng 10 ký tự'),
  email: yup.string().email('Email không đúng định dạng'),
  phoneNumber: yup.string().trim(),
  intake: yup.string().trim(),
  gender: yup.mixed().oneOf(['MALE', 'FEMALE', 'OTHER', null, '']),
  dateBirth: yup.date().nullable().typeError('Vui lòng nhập ngày hợp lệ'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
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

const toPartial = (schema) => {
  const partialSchema = {};
  const fields = schema.fields;

  for (const key in fields) {
    let fieldSchema = fields[key];
    if (key === 'password') {
      fieldSchema = yup.string()
        .transform(value => value === '' ? undefined : value)
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự");
    } else {
      fieldSchema = fieldSchema
        .optional()
        .transform(value => value === '' ? undefined : value);
    }
    
    partialSchema[key] = fieldSchema;
  }
  
  return yup.object(partialSchema);
};

export const userUpdateSchema = toPartial(userBaseSchema);