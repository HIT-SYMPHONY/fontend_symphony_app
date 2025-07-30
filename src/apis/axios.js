import axios from 'axios'
export const apiDefault = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiDefaultUpload = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
