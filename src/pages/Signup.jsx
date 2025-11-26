// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'
// import { Button } from '../components/ui/Button'
// import { FormField } from '../components/FormSection'
// import { useAuth, USER_ROLES } from '../context/AuthContext'

// export default function Signup() {
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     role: USER_ROLES.DONOR,
//     hospital: '',
//   })
//   const { login } = useAuth()
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     login(form.role, { name: form.fullName || 'New User', email: form.email })
//     navigate('/login')
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar variant="transparent" />
//       <div className="mx-auto max-w-4xl px-4 py-12">
//         <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
//           <h2 className="text-3xl font-semibold text-slate-900">Create account</h2>
//           <p className="mt-2 text-slate-500">
//             Set up your profile to access donor, recipient, or hospital admin dashboards.
//           </p>
//           <form onSubmit={handleSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
//             <FormField label="Full name">
//               <input
//                 name="fullName"
//                 required
//                 value={form.fullName}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//               />
//             </FormField>
//             <FormField label="Email address">
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//               />
//             </FormField>
//             <FormField label="Role">
//               <select
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border border-slate-200 px-3 py-2 capitalize focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//               >
//                 {Object.values(USER_ROLES).map((role) => (
//                   <option key={role} value={role}>
//                     {role}
//                   </option>
//                 ))}
//               </select>
//             </FormField>
//             <FormField label="Hospital / Organization (optional)">
//               <input
//                 name="hospital"
//                 value={form.hospital}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//               />
//             </FormField>
//             <div className="md:col-span-2">
//               <Button className="w-full md:w-auto">Create Account</Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/FormSection'
import { useAuth, USER_ROLES } from '../context/AuthContext'
import * as authService from '../services/authService'

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: USER_ROLES.DONOR,
    age: '',
    blood_group: '',
    hospital: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)

    try {
      // const data = await authService.register({
      //   name: form.fullName,
      //   email: form.email,
      //   password: form.password,
      //   role: form.role,
      //   age: form.age ? parseInt(form.age) : null,
      //   blood_group: form.blood_group || null,
      // })
      const data = await authService.register({
  name: form.name,
  email: form.email,
  password: form.password,
  role: form.role,
  age: form.age ? parseInt(form.age) : null,
  blood_group: form.blood_group || null,
})


      if (data.success) {
        // Store token and user info
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userId', data.data.user.id)
        localStorage.setItem('userRole', data.data.user.role)
        
        // Update auth context
        login(data.data.user.role, data.data.user)
        
        // Navigate to appropriate dashboard
        const rolePaths = {
          [USER_ROLES.DONOR]: '/dashboard/donor',
          [USER_ROLES.RECIPIENT]: '/dashboard/recipient',
          [USER_ROLES.ADMIN]: '/dashboard/admin',
        }
        navigate(rolePaths[data.data.user.role] || '/dashboard', { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="transparent" />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
          <h2 className="text-3xl font-semibold text-slate-900">Create account</h2>
          <p className="mt-2 text-slate-500">
            Set up your profile to access donor, recipient, or admin dashboards.
          </p>
          
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
            <FormField label="Full name">
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
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
                placeholder="john@example.com"
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
                placeholder="Minimum 6 characters"
                minLength={6}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </FormField>
            
            <FormField label="Password">
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </FormField>
            
            <FormField label="Confirm Password">
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={6}
                value={form.confirmPassword}
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
            
            <FormField label="Age">
              <input
                type="number"
                name="age"
                min="1"
                max="120"
                value={form.age}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </FormField>
            
            <FormField label="Blood Group">
              <select
                name="blood_group"
                value={form.blood_group}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
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
              <Button className="w-full md:w-auto" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}