import { useState } from 'react'
import { FormField, FormSection } from '../components/FormSection'
import { Button } from '../components/ui/Button'
import { recipientService } from '../services/recipientService'

export default function OrganRequest() {
  const [form, setForm] = useState({
    organNeeded: 'Kidney',
    bloodType: 'O+',
    urgency: 'High',
    hospital: '',
    notes: '',
  })
  const [response, setResponse] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await recipientService.requestOrgan(form)
    setResponse(result)
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

      <FormSection
        title="Recipient Details"
        description="Provide medical information for accurate matching."
        onSubmit={handleSubmit}
        actions={<Button type="submit">Submit Request</Button>}
      >
        <FormField label="Organ needed">
          <select
            name="organNeeded"
            value={form.organNeeded}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          >
            {['Kidney', 'Liver', 'Heart', 'Lung'].map((organ) => (
              <option key={organ}>{organ}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Blood type">
          <select
            name="bloodType"
            value={form.bloodType}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          >
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-'].map((type) => (
              <option key={type}>{type}</option>
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
            {['High', 'Medium', 'Low'].map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Treatment hospital">
          <input
            name="hospital"
            value={form.hospital}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          />
        </FormField>

        <FormField label="Additional notes">
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            rows={4}
          />
        </FormField>
      </FormSection>

      {response && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-700">
          <p className="font-semibold">Request submitted</p>
          <p>{response.message}</p>
        </div>
      )}
    </div>
  )
}

