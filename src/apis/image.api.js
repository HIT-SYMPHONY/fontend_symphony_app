import { ApiConstant } from '../constants/api.constant'
import { apiDefaultUpload } from './axios'
export const imageApi = {
  uploadImage: async (imageFile) => {
    const formData = new FormData()
    formData.append('file', imageFile)
    const { data } = await apiDefaultUpload.post(ApiConstant.images.base, formData)
    return data
  },
}
