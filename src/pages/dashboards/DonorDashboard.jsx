// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import NotificationCard from '../../components/NotificationCard'
// import StatusBadge from '../../components/StatusBadge'
// import { Button } from '../../components/ui/Button'
// import { donorMatches, donorNotifications } from '../../data/mockData'

// const stats = [
//   { label: 'Available Organs', value: 3, change: '+1 new matched' },
//   { label: 'Matches In Progress', value: 2, change: 'Awaiting hospital review' },
//   { label: 'Completed Donations', value: 5, change: 'Last: 2 days ago' },
// ]

// export default function DonorDashboard() {
//   return (
//     <div className="space-y-8">
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <div>
//           <p className="text-sm uppercase tracking-widest text-brand-blue">Donor</p>
//           <h1 className="text-3xl font-semibold text-slate-900">
//             Donation overview
//           </h1>
//           <p className="text-slate-500">
//             Monitor your registered organs, matching updates, and completion status.
//           </p>
//         </div>
//         <Link to="/organ-registration">
//           <Button>Register New Organ</Button>
//         </Link>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         {stats.map((item) => (
//           <motion.div
//             key={item.label}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
//           >
//             <p className="text-sm text-slate-500">{item.label}</p>
//             <p className="text-3xl font-semibold text-brand-blue">{item.value}</p>
//             <p className="text-xs text-slate-400">{item.change}</p>
//           </motion.div>
//         ))}
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-slate-800">Match Updates</h2>
//           <div className="space-y-3">
//             {donorMatches.map((match) => (
//               <div
//                 key={match.id}
//                 className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-semibold text-slate-800">{match.organ}</p>
//                     <p className="text-xs text-slate-500">
//                       Recipient: {match.recipient}
//                     </p>
//                   </div>
//                   <StatusBadge status={match.status} />
//                 </div>
//                 <p className="mt-3 text-sm text-slate-500">{match.notes}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-slate-800">Notifications</h2>
//           <div className="space-y-3">
//             {donorNotifications.map((notice) => (
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
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'

export default function DonorDashboard() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const donorId = localStorage.getItem("userId") // or context

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/donor/${donorId}/status`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })

        const data = await res.json()
        setStatus(data)
      } catch (err) {
        setError('Failed to load donor status')
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [])

  if (loading) return <p className="text-center text-slate-500">Loading…</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Donor Dashboard</h1>
          <p className="text-slate-500 text-sm">Your donation status overview</p>
        </div>
        <Link to="/organ-registration">
          <Button>Register Organ</Button>
        </Link>
      </div>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold mb-2">Your Status</h2>
        <p className="text-sm text-slate-600">Availability: {status?.availability}</p>
        <p className="text-sm text-slate-600">Last updated: {status?.updatedAt}</p>
      </motion.div>
    </div>
  )
}
