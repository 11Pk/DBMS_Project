import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField, FormSection } from '../components/FormSection'
import { Button } from '../components/ui/Button'

export default function OrganRequest() {
  const [form, setForm] = useState({
    organ_required: 'Kidney',
    urgency: 'medium',
    status: 'waiting'
  })
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

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

      const res = await fetch('http://localhost:5000/api/recipients/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(form),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request')
      }

      setResponse({
        message: 'Organ request submitted successfully!',
        status: 'success'
      })

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/recipient')
      }, 2000)
      
    } catch (error) {
      setError(error.message)
      console.error('Error submitting request:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Apply for an organ
        </h1>
        <p className="text-slate-500">
          Submit your transplant requirements and track the waiting list in real-time.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <FormSection
        title="Recipient Details"
        description="Provide medical information for accurate matching."
        onSubmit={handleSubmit}
        actions={
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        }
      >
        <FormField label="Organ needed">
          <select
            name="organ_required"
            value={form.organ_required}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          >
            {['Kidney', 'Liver', 'Heart', 'Lung'].map((organ) => (
              <option key={organ}>{organ}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Urgency level">
          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </FormField>

        <FormField label="Status">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          >
            <option value="waiting">Waiting</option>
            <option value="matched">Matched</option>
            <option value="completed">Completed</option>
          </select>
        </FormField>
      </FormSection>

      {response && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-700">
          <p className="font-semibold">✓ Request submitted successfully</p>
          <p>{response.message}</p>
          <p className="mt-2 text-xs">Redirecting to your dashboard...</p>
        </div>
      )}
    </div>
  )
}

