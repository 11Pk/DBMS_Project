import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export const USER_ROLES = {
  DONOR: 'donor',
  RECIPIENT: 'recipient',
  ADMIN: 'admin',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (role, profile = {}) => {
    setUser({
      id: profile.id || crypto.randomUUID(),
      name: profile.name || 'Guest User',
      role,
      email: profile.email,
    })
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
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

