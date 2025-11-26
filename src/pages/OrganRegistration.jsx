// import { useState } from 'react'
// import { FormField, FormSection } from '../components/FormSection'
// import { Button } from '../components/ui/Button'
// import { donorService } from '../services/donorService'
// import StatusBadge from '../components/StatusBadge'

// export default function OrganRegistration() {
//   const [form, setForm] = useState({
//     organType: 'Kidney',
//     bloodType: 'O+',
//     availability: 'Available',
//     hospital: '',
//   })
//   const [response, setResponse] = useState(null)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const result = await donorService.registerOrgan(form)
//     setResponse(result)
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-semibold text-slate-900">
//           Register an organ
//         </h1>
//         <p className="text-slate-500">
//           Provide details about the available organ to make it discoverable for compatible
//           recipients.
//         </p>
//       </div>

//       <FormSection
//         title="Organ Details"
//         description="Complete the required medical profile for listing."
//         onSubmit={handleSubmit}
//         actions={<Button type="submit">Submit Registration</Button>}
//       >
//         <FormField label="Organ type">
//           <select
//             name="organType"
//             value={form.organType}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//           >
//             {['Kidney', 'Liver', 'Heart', 'Lung'].map((organ) => (
//               <option key={organ}>{organ}</option>
//             ))}
//           </select>
//         </FormField>

//         <FormField label="Blood type compatibility">
//           <select
//             name="bloodType"
//             value={form.bloodType}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//           >
//             {['O+', 'O-', 'A+', 'A-', 'B+', 'B-'].map((type) => (
//               <option key={type}>{type}</option>
//             ))}
//           </select>
//         </FormField>

//         <FormField label="Availability status">
//           <select
//             name="availability"
//             value={form.availability}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//           >
//             {['Available', 'Matched', 'Completed'].map((status) => (
//               <option key={status}>{status}</option>
//             ))}
//           </select>
//         </FormField>

//         <FormField label="Storage hospital / facility">
//           <input
//             name="hospital"
//             value={form.hospital}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
//           />
//         </FormField>
//       </FormSection>

//       {response && (
//         <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-700">
//           <p className="font-semibold">Registration saved</p>
//           <p>{response.message}</p>
//           <div className="mt-2">
//             <StatusBadge status={response.status} />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// import { useState } from 'react'
// import { FormField, FormSection } from '../components/FormSection'
// import { Button } from '../components/ui/Button'
// import StatusBadge from '../components/StatusBadge'

// export default function OrganRegistration() {
//   const [form, setForm] = useState({
//     organType: 'Kidney',
//     bloodType: 'O+',
//     availability: 'Available',
//     hospital: '',
//   })

//   const [response, setResponse] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const token = localStorage.getItem('token')

//       const res = await fetch('http://localhost:5000/api/donors/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
//          // sends cookies (token)
//         body: JSON.stringify(form),
//       })

//       const data = await res.json()
//       setResponse(data)

//     } catch (error) {
//       console.error('Error registering organ:', error)
//       setResponse({ message: 'Failed to register organ', status: 'error' })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-semibold text-slate-900">
//           Register an organ
//         </h1>
//         <p className="text-slate-500">
//           Provide details about the available organ to make it discoverable for compatible recipients.
//         </p>
//       </div>

//       <FormSection
//         title="Organ Details"
//         description="Complete the required medical profile for listing."
//         onSubmit={handleSubmit}
//         actions={<Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Registration'}</Button>}
//       >

//         <FormField label="Organ type">
//           <select
//             name="organType"
//             value={form.organType}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
//           >
//             {['Kidney', 'Liver', 'Heart', 'Lung'].map((organ) => (
//               <option key={organ}>{organ}</option>
//             ))}
//           </select>
//         </FormField>

//         <FormField label="Blood type compatibility">
//           <select
//             name="bloodType"
//             value={form.bloodType}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
//           >
//             {['O+', 'O-', 'A+', 'A-', 'B+', 'B-'].map((type) => (
//               <option key={type}>{type}</option>
//             ))}
//           </select>
//         </FormField>

//         <FormField label="Availability status">
//           <select
//             name="availability"
//             value={form.availability}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
//           >
//             {['Available', 'Matched', 'Completed'].map((status) => (
//               <option key={status}>{status}</option>
//             ))}
//           </select>
//         </FormField>

//         <FormField label="Storage hospital / facility">
//           <input
//             name="hospital"
//             value={form.hospital}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
//           />
//         </FormField>
//       </FormSection>

//       {response && (
//         <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-700">
//           <p className="font-semibold">Registration saved</p>
//           <p>{response.message}</p>
//           <div className="mt-2">
//             <StatusBadge status={response.status} />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// import { useState } from 'react'
// import { FormField, FormSection } from '../components/FormSection'
// import { Button } from '../components/ui/Button'
// import StatusBadge from '../components/StatusBadge'

// export default function OrganRegistration() {
//   const [form, setForm] = useState({
//     organ_type: 'Kidney',
//     availability: 'available',
//     medical_history: '',
//     status: 'active'
//   })

//   const [response, setResponse] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       const token = localStorage.getItem('token')
      
//       if (!token) {
//         throw new Error('No authentication token found. Please login again.')
//       }

//       const res = await fetch('http://localhost:5000/api/donors/register', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         credentials: 'include',
//         body: JSON.stringify(form),
//       })

//       const data = await res.json()
      
//       if (!res.ok) {
//         throw new Error(data.error || 'Failed to register organ')
//       }

//       setResponse({
//         message: 'Organ registered successfully!',
//         status: data.data.availability || 'Available'
//       })
      
//     } catch (error) {
//       setError(error.message)
//       console.error('Error registering organ:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-semibold text-slate-900">
//           Register an organ
//         </h1>
//         <p className="text-slate-500">
//           Provide details about the available organ to make it discoverable for compatible recipients.
//         </p>
//       </div>

//       {error && (
//         <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <FormSection
//         title="Organ Details"
//         description="Complete the required medical profile for listing."
//         onSubmit={handleSubmit}
//         actions={
//           <Button type="submit" disabled={loading}>
//             {loading ? 'Submitting...' : 'Submit Registration'}
//           </Button>
//         }
//       >
//         <FormField label="Organ type">
//           <select
//             name="organ_type"
//             value={form.organ_type}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
//           >
//             {['Kidney', 'Liver', 'Heart', 'Lung'].map((organ) => (
//               <option key={organ}>{organ}</option>
//             ))}
//           </select>
//         </FormField>
//         <FormField label="Organ to Donate">
//   <input
//     name="organ"
//     required
//     value={form.organ}
//     onChange={handleChange}
//     placeholder="Kidney / Liver / Heart etc."
//     className="w-full rounded-lg border border-slate-200 px-3 py-2"
//   />
// </FormField>


//         <FormField label="Availability status">
//           <select
//             name="availability"
//             value={form.availability}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
//           >
//             <option value="available">Available</option>
//             <option value="matched">Matched</option>
//             <option value="completed">Completed</option>
//           </select>
//         </FormField>

//         <FormField label="Medical History">
//           <textarea
//             name="medical_history"
//             value={form.medical_history}
//             onChange={handleChange}
//             rows={4}
//             placeholder="Enter relevant medical history..."
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
//           />
//         </FormField>

//         <FormField label="Status">
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
//           >
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </FormField>
//       </FormSection>

//       {response && (
//         <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-700">
//           <p className="font-semibold">Registration saved</p>
//           <p>{response.message}</p>
//           <div className="mt-2">
//             <StatusBadge status={response.status} />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField, FormSection } from '../components/FormSection'
import { Button } from '../components/ui/Button'
import StatusBadge from '../components/StatusBadge'

export default function OrganRegistration() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    age: '',
    blood_group: '',
    organ: 'Kidney',
    medical_history: '',
    status: 'available'
  })

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.')
      }

      const res = await fetch('http://localhost:5000/api/donors/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          age: parseInt(form.age),
          blood_group: form.blood_group,
          organ: form.organ,
          medical_history: form.medical_history,
          status: form.status
        }),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register organ')
      }

      setResponse({
        message: 'Organ registered successfully! Redirecting to dashboard...',
        status: 'Success'
      })

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/donor')
      }, 2000)
      
    } catch (error) {
      setError(error.message)
      console.error('Error registering organ:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Register an organ donation
        </h1>
        <p className="text-slate-500">
          Provide details about the available organ to make it discoverable for compatible recipients.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <FormSection
        title="Organ Details"
        description="Complete the required medical profile for listing."
        onSubmit={handleSubmit}
        actions={
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Registration'}
          </Button>
        }
      >
        <FormField label="Your Age *">
          <input
            type="number"
            name="age"
            required
            min="18"
            max="100"
            value={form.age}
            onChange={handleChange}
            placeholder="e.g., 35"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
          />
        </FormField>

        <FormField label="Blood Group *">
          <select
            name="blood_group"
            required
            value={form.blood_group}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
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

        <FormField label="Organ to Donate *">
          <select
            name="organ"
            required
            value={form.organ}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
          >
            <option value="Kidney">Kidney</option>
            <option value="Liver">Liver</option>
            <option value="Heart">Heart</option>
            <option value="Lung">Lung</option>
            <option value="Pancreas">Pancreas</option>
            <option value="Cornea">Cornea</option>
          </select>
        </FormField>

        <FormField label="Medical History">
          <textarea
            name="medical_history"
            value={form.medical_history}
            onChange={handleChange}
            rows={4}
            placeholder="Enter relevant medical history (optional)..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
          />
        </FormField>

        <FormField label="Availability Status">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
          >
            <option value="available">Available</option>
            <option value="pending">Pending Review</option>
          </select>
        </FormField>
      </FormSection>

      {response && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-700">
          <p className="font-semibold">✓ Registration Successful</p>
          <p>{response.message}</p>
          <div className="mt-2">
            <StatusBadge status={response.status} />
          </div>
        </div>
      )}
    </div>
  )
}