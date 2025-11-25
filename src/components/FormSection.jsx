export function FormSection({ title, description, onSubmit, children, actions }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      <div className="grid gap-4">{children}</div>
      <div className="mt-6 flex items-center gap-3">{actions}</div>
    </form>
  )
}

export function FormField({ label, children }) {
  return (
    <label className="text-sm font-medium text-slate-600">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  )
}

