import axios from 'axios'

const BASE_CLASSROOM_URL = 'http://localhost:8080/api/v1/classrooms'
const BASE_USER_URL = 'http://localhost:8080/api/v1/users'
const BASE_COMPETITION_URL = 'http://localhost:8080/api/v1/competitions'

/**
 * Gọi API chung cho admin (GET, POST, PUT, DELETE)
 * @param {Object} options
 * @param {string} options.url - endpoint
 * @param {string} options.method - 'GET', 'POST', v.v.
 * @param {string} options.token - Bearer token
 * @param {Object|FormData} [options.payload] - dữ liệu body
 */
export async function callAdminApi({ url, method = 'GET', token, payload = null }) {
  try {
    const isForm = payload instanceof FormData
    const headers = {
      Authorization: `Bearer ${token}`,
      ...(isForm ? {} : { 'Content-Type': 'application/json' }),
    }

    const config = {
      method,
      url,
      headers,
      ...(payload ? { data: isForm ? payload : JSON.stringify(payload) } : {}),
    }

    const response = await axios(config)

    if (response.data.status === 'SUCCESS') {
      return { success: true, data: response.data.data }
    } else {
      return { success: false, error: response.data.message || 'Unknown error' }
    }
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || err.message || 'Unexpected error',
    }
  }
}

/**
 * Lấy tất cả lớp học
 * @param {string} token
 */
export async function getAllClassrooms(token) {
  return callAdminApi({
    url: BASE_CLASSROOM_URL,
    method: 'GET',
    token,
  })
}

/**
 * Lấy tất cả người dùng
 * @param {string} token
 */
export async function getAllUsers(token) {
  return callAdminApi({
    url: BASE_USER_URL,
    method: 'GET',
    token,
  })
}

/**
 * Tạo lớp học mới
 * @param {string} token
 * @param {FormData} payload - chứa image + data
 */
export async function createClassroom(token, payload) {
  return callAdminApi({
    url: BASE_CLASSROOM_URL,
    method: 'POST',
    token,
    payload,
  })
}

/**
 * Lấy danh sách cuộc thi
 * @param {string} token
 */
export async function getAllCompetitions(token) {
  return callAdminApi({
    url: BASE_COMPETITION_URL,
    method: 'GET',
    token,
  })
}

/**
 * Tạo cuộc thi mới
 * @param {string} token
 * @param {Object} payload - dữ liệu cuộc thi
 */
export async function createCompetition(token, payload) {
  return callAdminApi({
    url: BASE_COMPETITION_URL,
    method: 'POST',
    token,
    payload,
  })
}

/**
 * Cập nhật cuộc thi
 * @param {string} token
 * @param {string} competitionId - ID của cuộc thi
 * @param {Object} payload - dữ liệu cập nhật
 */
export async function updateCompetition(token, competitionId, payload) {
  return callAdminApi({
    url: `${BASE_COMPETITION_URL}/${competitionId}`,
    method: 'PUT',
    token,
    payload,
  })
}

/**
 * Xóa cuộc thi
 * @param {string} token
 * @param {string} competitionId - ID của cuộc thi
 */
export async function deleteCompetition(token, competitionId) {
  return callAdminApi({
    url: `${BASE_COMPETITION_URL}/${competitionId}`,
    method: 'DELETE',
    token,
  })
}

/**
 * Trích xuất danh sách lớp học từ phản hồi API
 * @param {Object} response
 * @returns {Array}
 */
export function extractClassrooms(response) {
  if (response?.success && response?.data?.items) {
    return response.data.items
  }
  return []
}

/**
 * Lọc danh sách người dùng có vai trò "LEADER"
 * @param {Object} response
 * @returns {Array}
 */
export function extractLeaders(response) {
  if (response?.success && Array.isArray(response.data)) {
    return response.data.filter((user) => user.role === 'LEADER')
  }
  return []
}
