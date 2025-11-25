import { Link, useLocation } from 'react-router-dom'
import { USER_ROLES } from '../context/AuthContext'
import { twMerge } from 'tailwind-merge'

const baseNav = [
  { to: '/matching-status', label: 'Matching Status' },
]

const roleNav = {
  [USER_ROLES.DONOR]: [
    { to: '/dashboard/donor', label: 'Overview' },
    { to: '/organ-registration', label: 'Register Organ' },
  ],
  [USER_ROLES.RECIPIENT]: [
    { to: '/dashboard/recipient', label: 'Overview' },
    { to: '/organ-request', label: 'Request Organ' },
  ],
  [USER_ROLES.ADMIN]: [
    { to: '/dashboard/admin', label: 'Admin Panel' },
    { to: '/quality-checks', label: 'Quality Checks' },
  ],
}

export default function Sidebar({ role }) {
  const location = useLocation()
  const links = [...(roleNav[role] || []), ...baseNav]

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white/80 p-6 backdrop-blur lg:block">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        Dashboard
      </p>
      <ul className="mt-6 space-y-2">
        {links.map((item) => {
          const active = location.pathname === item.to
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={twMerge(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
                  active
                    ? 'bg-brand-blue/10 text-brand-blue'
                    : 'text-slate-600 hover:bg-slate-100',
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

