import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/FormSection'
import { useAuth, USER_ROLES } from '../context/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    role: USER_ROLES.DONOR,
    hospital: '',
  })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(form.role, { name: form.fullName || 'New User', email: form.email })
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="transparent" />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
          <h2 className="text-3xl font-semibold text-slate-900">Create account</h2>
          <p className="mt-2 text-slate-500">
            Set up your profile to access donor, recipient, or hospital admin dashboards.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
            <FormField label="Full name">
              <input
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </FormField>
            <FormField label="Email address">
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </FormField>
            <FormField label="Role">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 capitalize focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                {Object.values(USER_ROLES).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Hospital / Organization (optional)">
              <input
                name="hospital"
                value={form.hospital}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </FormField>
            <div className="md:col-span-2">
              <Button className="w-full md:w-auto">Create Account</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

