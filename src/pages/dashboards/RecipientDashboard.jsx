// import { Link } from 'react-router-dom'
// import NotificationCard from '../../components/NotificationCard'
// import StatusBadge from '../../components/StatusBadge'
// import { Button } from '../../components/ui/Button'
// import { recipientWaitlist, recipientNotifications } from '../../data/mockData'

// export default function RecipientDashboard() {
//   return (
//     <div className="space-y-8">
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <div>
//           <p className="text-sm uppercase tracking-widest text-brand-blue">Recipient</p>
//           <h1 className="text-3xl font-semibold text-slate-900">
//             Waitlist progress overview
//           </h1>
//           <p className="text-slate-500">
//             Track your organ requests, waitlist status, and match readiness.
//           </p>
//         </div>
//         <Link to="/organ-request">
//           <Button>Apply For Organ</Button>
//         </Link>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         {[
//           { label: 'Active Requests', value: 2 },
//           { label: 'Average Wait Time', value: '21 days' },
//           { label: 'Priority Level', value: 'High' },
//         ].map((item) => (
//           <div
//             key={item.label}
//             className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
//           >
//             <p className="text-sm text-slate-500">{item.label}</p>
//             <p className="text-2xl font-semibold text-brand-blue">{item.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <div>
//           <h2 className="text-xl font-semibold text-slate-800">Waiting List</h2>
//           <div className="mt-4 space-y-3">
//             {recipientWaitlist.map((item) => (
//               <div
//                 key={item.id}
//                 className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-semibold text-slate-800">{item.organ}</p>
//                     <p className="text-xs text-slate-500">
//                       Position: {item.position} · Updated {item.updated}
//                     </p>
//                   </div>
//                   <StatusBadge status={item.status} />
//                 </div>
//                 <p className="mt-2 text-sm text-slate-500">{item.notes}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold text-slate-800">Notifications</h2>
//           <div className="mt-4 space-y-3">
//             {recipientNotifications.map((notice) => (
//               <NotificationCard
//                 key={notice.id}
//                 title={notice.title}
//                 message={notice.message}
//                 status={notice.status}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NotificationCard from '../../components/NotificationCard'
import StatusBadge from '../../components/StatusBadge'
import { Button } from '../../components/ui/Button'

export default function RecipientDashboard() {
  const [status, setStatus] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const recipientId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statusRes, notifRes] = await Promise.all([
          fetch(`/api/recipients/${recipientId}/status`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`/api/recipients/me/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const statusData = await statusRes.json()
        const notifData = await notifRes.json()

        setStatus(statusData)
        setNotifications(notifData.notifications || [])
      } catch (err) {
        console.error(err)
        setError("Failed to load recipient dashboard.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <p className="text-center text-slate-500">Loading dashboard…</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-blue">Recipient</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Waitlist Progress Overview
          </h1>
          <p className="text-slate-500">
            Track your organ requests, waitlist status, and match readiness.
          </p>
        </div>
        <Link to="/organ-request">
          <Button>Apply For Organ</Button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Current Status</p>
          <p className="text-xl font-semibold text-brand-blue">
            {status?.status || "N/A"}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Priority Level</p>
          <p className="text-xl font-semibold text-brand-blue">
            {status?.priority || "Unknown"}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Updated</p>
          <p className="text-xl font-semibold text-brand-blue">
            {status?.updatedAt ? new Date(status.updatedAt).toLocaleDateString() : "—"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Details */}
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Your Waitlist Status</h2>
          <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-600">
              Organ Requested: <span className="font-semibold">{status?.organ}</span>
            </p>
            <p className="text-sm text-slate-600">
              Position in Waitlist:{" "}
              <span className="font-semibold">{status?.position || "Not Assigned"}</span>
            </p>

            <div className="mt-3">
              <StatusBadge status={status?.status} />
            </div>

            <p className="mt-2 text-sm text-slate-500">{status?.notes}</p>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Notifications</h2>
          <div className="mt-4 space-y-3">
            {notifications.length === 0 && (
              <p className="text-slate-500 text-sm">No notifications yet.</p>
            )}

            {notifications.map((n) => (
              <NotificationCard
                key={n._id}
                title={n.title}
                message={n.message}
                status={n.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
