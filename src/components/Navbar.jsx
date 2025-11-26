import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui/Button'

export default function Navbar({ variant = 'solid' }) {
  const { user, logout } = useAuth()
  const location = useLocation()

  // Define navigation links based on authentication status
  const navLinks = user
    ? [{ label: 'Home', to: '/' }]
    : [
        { label: 'Home', to: '/' },
        { label: 'Register', to: '/signup' },
        { label: 'Login', to: '/login' },
      ]

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'admin':
        return '/dashboard/admin'
      case 'donor':
        return '/dashboard/donor'
      case 'recipient':
        return '/dashboard/recipient'
      default:
        return '/login'
    }
  }

  return (
    <header
      className={`w-full border-b ${
        variant === 'transparent'
          ? 'border-transparent bg-white/60 backdrop-blur-lg'
          : 'border-slate-200 bg-white shadow-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="text-lg font-semibold text-brand-blue transition hover:text-brand-teal"
        >
          OrganLink Network
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`transition hover:text-brand-blue ${
                location.pathname === item.to ? 'text-brand-blue' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-slate-500 md:inline">
                {user.name} · {user.role}
              </span>
              <Link to={getDashboardPath()}>
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

