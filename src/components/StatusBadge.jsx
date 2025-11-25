const statusStyles = {
  Available: 'bg-emerald-100 text-emerald-700',
  Matched: 'bg-amber-100 text-amber-700',
  Completed: 'bg-slate-200 text-slate-700',
  Pending: 'bg-blue-100 text-blue-700',
  Rejected: 'bg-rose-100 text-rose-700',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {status}
    </span>
  )
}

