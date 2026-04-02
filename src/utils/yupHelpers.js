import * as yup from 'yup'
import dayjs from 'dayjs'

export const yupDayjs = (options = {}) => {
  const {
    isRequired = true,
    requiredMessage = 'Ngày không thể trống',
    invalidMessage = 'Ngày không hợp lệ',
    mustBeInPast = false,
    pastMessage = 'Ngày phải ở trong quá khứ',
    mustBeInFuture = false,
    futureMessage = 'Ngày phải ở trong tương lai',
  } = options

  let schema = yup
    .mixed()
    .nullable()
    .test(
      'is-dayjs',
      invalidMessage,
      (value) => !value || (dayjs.isDayjs(value) && value.isValid()),
    )

  if (isRequired) {
    schema = schema.required(requiredMessage)
  }

  if (mustBeInPast) {
    schema = schema.test('is-in-past', pastMessage, (value) => {
      if (!value || !value.isValid()) return true
      return value.isBefore(dayjs().startOf('day'))
    })
  }
  if (mustBeInFuture) {
    schema = schema.test('is-in-future', futureMessage, (value) => {
      if (!value || !value.isValid()) return true
      return value.isAfter(dayjs())
    })
  }

  return schema
}
export const yupTiptapJSON = (options = {}) => {
  const { isRequired = true, requiredMessage = 'Nội dung không thể trống' } = options

  let schema = yup
    .object()
    .nullable()
    .test('is-tiptap-object', 'Nội dung không hợp lệ', (value) => {
      return !value || (value.type === 'doc' && Array.isArray(value.content))
    })

  if (isRequired) {
    schema = schema.test('is-not-empty', requiredMessage, (value) => {
      if (!value || !value.content || value.content.length === 0) {
        return false
      }
      const isTrulyEmpty =
        value.content.length === 1 &&
        value.content[0].type === 'paragraph' &&
        !value.content[0].content

      return !isTrulyEmpty
    })
  }

  return schema
}

export const toPartial = (schema, requiredKeys = []) => {
  const partialSchema = {}
  const fields = schema.fields
  const allKeys = Object.keys(fields)

  for (const key of allKeys) {
    const field = fields[key]

    if (!requiredKeys.includes(key)) {
      partialSchema[key] = field.optional()
    } else {
      partialSchema[key] = field
    }
  }

  return yup.object(partialSchema)
}
