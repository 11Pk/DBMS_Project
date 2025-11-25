import { motion } from 'framer-motion'
import { USER_ROLES } from '../../context/AuthContext'

const roles = [
  {
    role: USER_ROLES.DONOR,
    title: 'Donor Experience',
    items: ['Register organs securely', 'Track matching status', 'Live notifications'],
  },
  {
    role: USER_ROLES.RECIPIENT,
    title: 'Recipient Support',
    items: ['Apply for organs', 'Review waitlist progress', 'Instant match alerts'],
  },
  {
    role: USER_ROLES.ADMIN,
    title: 'Hospital Admin',
    items: ['Manage donor pool', 'Approve quality checks', 'Complete transplant records'],
  },
]

export default function RoleHighlights() {
  return (
    <div className="space-y-6">
      {roles.map((roleCard, idx) => (
        <motion.div
          key={roleCard.role}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-card"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
            {roleCard.role}
          </p>
          <h3 className="text-lg font-semibold text-slate-800">{roleCard.title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            {roleCard.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-teal" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}

