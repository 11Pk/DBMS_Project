import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 8000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API error, using mock fallback', error.message)
    return Promise.reject(error)
  },
)

export async function mockRequest(mockData, delay = 400) {
  await new Promise((resolve) => setTimeout(resolve, delay))
  return mockData
}

