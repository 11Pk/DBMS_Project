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
import StatusBadge from '../../components/StatusBadge'
import { api } from '../../services/api'

export default function DonorDashboard() {
  const [donorProfile, setDonorProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasProfile, setHasProfile] = useState(false)

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    fetchDonorStatus()
  }, [])

  const fetchDonorStatus = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/donors/${userId}/status`)
      
      if (response.data.success) {
        setDonorProfile(response.data.data)
        setHasProfile(true)
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setHasProfile(false)
      } else {
        setError(err.response?.data?.error || 'Failed to load donor status')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">Loading…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchDonorStatus}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-blue">Donor</p>
          <h1 className="text-3xl font-semibold text-slate-900">Donation Overview</h1>
          <p className="text-slate-500">
            {hasProfile ? 'Monitor your registered organs and donation status.' : 'Register your organs to start saving lives.'}
          </p>
        </div>
        {hasProfile && (
          <Link to="/organ-registration">
            <Button>Update Registration</Button>
          </Link>
        )}
      </div>

      {!hasProfile ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Welcome to the Donor Portal
            </h2>
            <p className="text-slate-600 mb-8">
              You haven't registered any organs yet. Click the button below to register your first organ donation.
            </p>
            <Link to="/organ-registration">
              <Button size="lg">Register Organ Donation</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="grid gap-4 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">Organ Type</p>
              <p className="text-2xl font-semibold text-brand-blue capitalize">
                {donorProfile.organ_type}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">Availability</p>
              <p className="text-2xl font-semibold text-brand-blue capitalize">
                {donorProfile.availability}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">Status</p>
              <p className="text-2xl font-semibold text-brand-blue capitalize">
                {donorProfile.status}
              </p>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Your Donor Profile</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="text-slate-900 font-medium">{donorProfile.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Blood Group</p>
                <p className="text-slate-900 font-medium">{donorProfile.blood_group || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="text-slate-900 font-medium">{donorProfile.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Registration Date</p>
                <p className="text-slate-900 font-medium">
                  {new Date(donorProfile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {donorProfile.medical_history && (
              <div className="mt-4">
                <p className="text-sm text-slate-500">Medical History</p>
                <p className="text-slate-900">{donorProfile.medical_history}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
