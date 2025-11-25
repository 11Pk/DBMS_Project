import { useState } from 'react'
import { adminService } from '../services/adminService'
import StatusBadge from '../components/StatusBadge'
import { Button } from '../components/ui/Button'
import { qualityChecks } from '../data/mockData'

export default function QualityCheck() {
  const [checks, setChecks] = useState(qualityChecks)

  const handleDecision = async (id, decision) => {
    const updated = await adminService.reviewQualityCheck(id, decision)
    setChecks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: updated.status } : item)),
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Quality Check Results
        </h1>
        <p className="text-slate-500">
          Approve or reject organs awaiting hospital quality verification.
        </p>
      </div>

      <div className="space-y-4">
        {checks.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {item.organ} · Donor {item.donor}
                </p>
                <p className="text-xs text-slate-500">{item.hospital}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <p className="mt-3 text-sm text-slate-500">{item.notes}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => handleDecision(item.id, 'Approved')}
              >
                Approve
              </Button>
              <Button variant="ghost" onClick={() => handleDecision(item.id, 'Rejected')}>
                Reject
              </Button>
              <Button variant="subtle" onClick={() => handleDecision(item.id, 'Completed')}>
                Mark Completed
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

