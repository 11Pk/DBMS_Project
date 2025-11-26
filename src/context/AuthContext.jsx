import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const USER_ROLES = {
  DONOR: 'donor',
  RECIPIENT: 'recipient',
  ADMIN: 'admin',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const userRole = localStorage.getItem('userRole')
    const userName = localStorage.getItem('userName')
    const userEmail = localStorage.getItem('userEmail')

    if (token && userId && userRole) {
      setUser({
        id: parseInt(userId),
        role: userRole,
        name: userName || 'User',
        email: userEmail || '',
      })
    }
    setLoading(false)
  }, [])

  const login = (role, profile = {}) => {
    const userData = {
      id: profile.id || parseInt(localStorage.getItem('userId')),
      name: profile.name || 'Guest User',
      role,
      email: profile.email || '',
    }
    
    setUser(userData)
    
    // Persist to localStorage
    localStorage.setItem('userName', userData.name)
    localStorage.setItem('userEmail', userData.email)
    localStorage.setItem('userRole', userData.role)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      logout,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

