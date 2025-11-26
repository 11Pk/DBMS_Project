import { api } from './api'

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} User data and token
 */
export async function register(userData) {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.message || 
      'Registration failed. Please try again.'
    )
  }
}

/**
 * Login user
 * @param {Object} credentials - Login credentials (email, password)
 * @returns {Promise<Object>} User data and token
 */
export async function login(credentials) {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.message || 
      'Login failed. Please check your credentials.'
    )
  }
}

/**
 * Logout user (clear local storage)
 */
export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('userRole')
  localStorage.removeItem('userName')
  localStorage.removeItem('userEmail')
}

/**
 * Get stored auth token
 * @returns {string|null} JWT token
 */
export function getToken() {
  return localStorage.getItem('token')
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken()
}
