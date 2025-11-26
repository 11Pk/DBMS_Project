import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data)
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        window.location.href = '/login'
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message)
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }
    
    return Promise.reject(error)
  },
)

export async function mockRequest(mockData, delay = 400) {
  await new Promise((resolve) => setTimeout(resolve, delay))
  return mockData
}

