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
import { api } from '../../services/api'

export default function RecipientDashboard() {
  const [recipientProfile, setRecipientProfile] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasProfile, setHasProfile] = useState(false)

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      const statusResponse = await api.get(`/recipients/${userId}/status`)
      
      if (statusResponse.data.success) {
        setRecipientProfile(statusResponse.data.data)
        setHasProfile(true)

        // Load notifications if profile exists
        try {
          const notifResponse = await api.get('/recipients/me/notifications')
          setNotifications(notifResponse.data.data || [])
        } catch (notifErr) {
          console.error('Failed to load notifications:', notifErr)
        }
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setHasProfile(false)
      } else {
        setError(err.response?.data?.error || 'Failed to load recipient data')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">Loading dashboard…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadDashboardData}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-blue">Recipient</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {hasProfile ? 'Waitlist Progress Overview' : 'Recipient Portal'}
          </h1>
          <p className="text-slate-500">
            {hasProfile
              ? 'Track your organ requests, waitlist status, and match readiness.'
              : 'Request an organ transplant to join the waitlist.'}
          </p>
        </div>
        {hasProfile && (
          <Link to="/organ-request">
            <Button>Update Request</Button>
          </Link>
        )}
      </div>

      {!hasProfile ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Welcome to the Recipient Portal
            </h2>
            <p className="text-slate-600 mb-8">
              You haven't submitted an organ request yet. Click the button below to apply for an organ transplant.
            </p>
            <Link to="/organ-request">
              <Button size="lg">Apply For Organ</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Organ Needed</p>
              <p className="text-2xl font-semibold text-brand-blue capitalize">
                {recipientProfile.organ_required}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Urgency Level</p>
              <p className="text-2xl font-semibold text-brand-blue capitalize">
                {recipientProfile.urgency}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Status</p>
              <p className="text-2xl font-semibold text-brand-blue capitalize">
                {recipientProfile.status}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Profile Details */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="text-slate-900 font-medium">{recipientProfile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Blood Group</p>
                  <p className="text-slate-900 font-medium">
                    {recipientProfile.blood_group || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-slate-900 font-medium">{recipientProfile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Request Date</p>
                  <p className="text-slate-900 font-medium">
                    {new Date(recipientProfile.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              {notifications.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No notifications yet</p>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notice) => (
                    <NotificationCard
                      key={notice.id}
                      title={notice.title || 'Notification'}
                      message={notice.message}
                      status={notice.status}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
