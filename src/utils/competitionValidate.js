import * as yup from 'yup'

/**
 * The base "Create" schema for a competition. This is the single source of truth for validation rules.
 * All fields that are required for creating a new competition are marked here.
 */
export const competitionCreationSchema = yup.object({
  name: yup.string().trim().required('Tên cuộc thi không thể trống'),

  description: yup.string().trim(),

  rule: yup.string().trim(),

  content: yup.string().trim().required('Nội dung/Đề thi không thể trống'),

  competitionLeaderId: yup.string().required('Vui lòng chọn người phụ trách'),

  startTime: yup
    .date()
    .required('Ngày bắt đầu không thể trống')
    .min(new Date(), 'Ngày bắt đầu phải ở trong tương lai')
    .typeError('Vui lòng nhập ngày giờ hợp lệ'),

  endTime: yup
    .date()
    .required('Ngày kết thúc không thể trống')
    .min(yup.ref('startTime'), 'Ngày kết thúc phải sau ngày bắt đầu')
    .typeError('Vui lòng nhập ngày giờ hợp lệ'),
})

/**
 * A helper function to programmatically create a partial schema for PATCH requests.
 * It takes a full schema and makes every field optional.
 * It also transforms empty strings to `undefined` so they are not included in the PATCH payload.
 * @param {yup.ObjectSchema} schema - The base Yup schema.
 * @returns {yup.ObjectSchema} A new schema where all fields are optional.
 */
const toPartial = (schema) => {
  const partialSchema = {}
  const fields = schema.fields

  for (const key in fields) {
    // Make each field optional for the PATCH update
    partialSchema[key] = fields[key]
      .optional()
      .transform((value) => (value === '' ? undefined : value))
  }

  return yup.object(partialSchema)
}

/**
 * The validation schema to be used for the "Update Competition" form.
 * It is derived from the creation schema, ensuring that any changes to the base rules
 * are automatically applied to the update form as well.
 */
export const competitionUpdateSchema = toPartial(competitionCreationSchema)
