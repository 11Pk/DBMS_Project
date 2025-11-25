import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/FormSection'
import { useAuth, USER_ROLES } from '../context/AuthContext'

const rolePaths = {
  [USER_ROLES.DONOR]: '/dashboard/donor',
  [USER_ROLES.RECIPIENT]: '/dashboard/recipient',
  [USER_ROLES.ADMIN]: '/dashboard/admin',
}

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: USER_ROLES.DONOR,
  })
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(form.role, { email: form.email, name: form.email.split('@')[0] })
    const redirect =
      location.state?.from?.pathname || rolePaths[form.role] || '/dashboard'
    navigate(redirect, { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="transparent" />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome back!</h2>
          <p className="mt-3 text-slate-500">
            Access your personalized dashboard to manage donations, requests, or
            hospital workflows.
          </p>
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-teal/10 to-brand-blue/10 p-6 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Demo Credentials</p>
            <ul className="mt-3 space-y-2">
              <li>Donor · donor@example.com</li>
              <li>Recipient · recipient@example.com</li>
              <li>Admin · admin@example.com</li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
        >
          <div className="space-y-4">
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
            <FormField label="Password">
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </FormField>
            <FormField label="Select role">
              <div className="flex flex-wrap gap-3">
                {Object.values(USER_ROLES).map((role) => (
                  <label
                    key={role}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm capitalize ${
                      form.role === role
                        ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                        : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={form.role === role}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {role}
                  </label>
                ))}
              </div>
            </FormField>
          </div>
          <Button className="mt-6 w-full">Login</Button>
        </form>
      </div>
    </div>
  )
}

