import { BellIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

export default function NotificationCard({ title, message, status }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
    >
      <span className="rounded-full bg-brand-teal/20 p-2 text-brand-blue">
        <BellIcon />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-sm text-slate-500">{message}</p>
        {status && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
            {status}
          </p>
        )}
      </div>
    </motion.div>
  )
}

