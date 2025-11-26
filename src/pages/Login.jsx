// import { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'
// import { Button } from '../components/ui/Button'
// import { FormField } from '../components/FormSection'
// import { useAuth, USER_ROLES } from '../context/AuthContext'

// const rolePaths = {
//   [USER_ROLES.DONOR]: '/dashboard/donor',
//   [USER_ROLES.RECIPIENT]: '/dashboard/recipient',
//   [USER_ROLES.ADMIN]: '/dashboard/admin',
// }

// export default function Login() {
//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//     role: USER_ROLES.DONOR,
//   })
//   const { login } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   // const handleSubmit = (e) => {
//   //   e.preventDefault()
//   //   login(form.role, { email: form.email, name: form.email.split('@')[0] })
//   //   const redirect =
//   //     location.state?.from?.pathname || rolePaths[form.role] || '/dashboard'
//   //   navigate(redirect, { replace: true })
//   // }
// const handleSubmit = async (e) => {
//   e.preventDefault()
//   try {
//     const res = await fetch('http://localhost:5000/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: form.email, password: form.password })
//     })
//     const data = await res.json()
    
//     if (data.success) {
//       localStorage.setItem('token', data.data.token)
//       localStorage.setItem('userId', data.data.user.id)
//       login(data.data.user.role, data.data.user)
//       navigate(redirect, { replace: true })
//     }
//   } catch (error) {
//     console.error('Login failed:', error)
//   }
// }
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar variant="transparent" />
//       <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
//         <div>
//           <h2 className="text-3xl font-bold text-slate-900">Welcome back!</h2>
//           <p className="mt-3 text-slate-500">
//             Access your personalized dashboard to manage donations, requests, or
//             hospital workflows.
//           </p>
//           <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-teal/10 to-brand-blue/10 p-6 text-sm text-slate-600">
//             <p className="font-semibold text-slate-800">Demo Credentials</p>
//             <ul className="mt-3 space-y-2">
//               <li>Donor · donor@example.com</li>
//               <li>Recipient · recipient@example.com</li>
//               <li>Admin · admin@example.com</li>
//             </ul>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
//         >
//           <div className="space-y-4">
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
//             <FormField label="Password">
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//               />
//             </FormField>
//             <FormField label="Select role">
//               <div className="flex flex-wrap gap-3">
//                 {Object.values(USER_ROLES).map((role) => (
//                   <label
//                     key={role}
//                     className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm capitalize ${
//                       form.role === role
//                         ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
//                         : 'border-slate-200 text-slate-500'
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="role"
//                       value={role}
//                       checked={form.role === role}
//                       onChange={handleChange}
//                       className="hidden"
//                     />
//                     {role}
//                   </label>
//                 ))}
//               </div>
//             </FormField>
//           </div>
//           <Button className="mt-6 w-full">Login</Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// import { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'
// import { Button } from '../components/ui/Button'
// import { FormField } from '../components/FormSection'
// import { useAuth, USER_ROLES } from '../context/AuthContext'

// const rolePaths = {
//   [USER_ROLES.DONOR]: '/dashboard/donor',
//   [USER_ROLES.RECIPIENT]: '/dashboard/recipient',
//   [USER_ROLES.ADMIN]: '/dashboard/admin',
// }

// export default function Login() {
//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//     role: USER_ROLES.DONOR,
//   })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
  
//   const { login } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           email: form.email,
//           password: form.password
//         })
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data.error || 'Login failed')
//       }

//       if (data.success) {
//         // Store token and user info
//         localStorage.setItem('token', data.data.token)
//         localStorage.setItem('userId', data.data.user.id)
//         localStorage.setItem('userRole', data.data.user.role)
        
//         // Update auth context
//         login(data.data.user.role, data.data.user)
        
//         // Navigate to appropriate dashboard
//         const redirect = location.state?.from?.pathname || 
//                         rolePaths[data.data.user.role] || 
//                         '/dashboard'
//         navigate(redirect, { replace: true })
//       }
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar variant="transparent" />
//       <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
//         <div>
//           <h2 className="text-3xl font-bold text-slate-900">Welcome back!</h2>
//           <p className="mt-3 text-slate-500">
//             Access your personalized dashboard to manage donations, requests, or
//             hospital workflows.
//           </p>
//           <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-teal/10 to-brand-blue/10 p-6 text-sm text-slate-600">
//             <p className="font-semibold text-slate-800">Demo Credentials</p>
//             <ul className="mt-3 space-y-2">
//               <li>Donor · donor@example.com</li>
//               <li>Recipient · recipient@example.com</li>
//               <li>Admin · admin@example.com</li>
//             </ul>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
//         >
//           {error && (
//             <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
//               {error}
//             </div>
//           )}
          
//           <div className="space-y-4">
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
            
//             <FormField label="Password">
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//               />
//             </FormField>
//           </div>
          
//           <Button className="mt-6 w-full" disabled={loading}>
//             {loading ? 'Logging in...' : 'Login'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }

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
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      if (data.success && data.data) {
        // Store token and user info
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userId', data.data.user.id)
        localStorage.setItem('userRole', data.data.user.role)
        
        // Update auth context
        login(data.data.user.role, data.data.user)
        
        // Navigate to appropriate dashboard based on user's actual role
        const redirect = location.state?.from?.pathname || 
                        rolePaths[data.data.user.role] || 
                        '/dashboard'
        navigate(redirect, { replace: true })
      }
    } catch (err) {
      setError(err.message)
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
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
            <p className="font-semibold text-slate-800">Note</p>
            <p className="mt-3">
              Your role is determined by your account registration. 
              Login with your credentials to access your dashboard.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
        >
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <FormField label="Email address">
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                placeholder="your@email.com"
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
                placeholder="Enter your password"
              />
            </FormField>
          </div>
          
          <Button className="mt-6 w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          
          <p className="mt-4 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <a href="/signup" className="text-brand-blue hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}