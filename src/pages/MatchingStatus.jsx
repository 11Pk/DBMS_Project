// import StatusBadge from '../components/StatusBadge'
// import { matchingTimeline } from '../data/mockData'

// export default function MatchingStatus() {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-semibold text-slate-900">Matching Status</h1>
//         <p className="text-slate-500">
//           Review the end-to-end progress of donor and recipient pairing, logistics, and
//           quality checks.
//         </p>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         {matchingTimeline.map((group) => (
//           <div
//             key={group.title}
//             className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs uppercase tracking-widest text-brand-blue">
//                   {group.phase}
//                 </p>
//                 <h2 className="text-xl font-semibold text-slate-800">{group.title}</h2>
//               </div>
//               <StatusBadge status={group.status} />
//             </div>
//             <ul className="mt-4 space-y-3 text-sm text-slate-600">
//               {group.steps.map((step) => (
//                 <li key={step} className="flex items-center gap-2">
//                   <span className="h-2 w-2 rounded-full bg-brand-teal" />
//                   {step}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'

export default function MatchingStatus() {
  const { matchId } = useParams()
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/matches/${matchId}/status`, {
          credentials: 'include'
        })

        const data = await res.json()
        setTimeline(data.timeline || [])
      } catch (error) {
        console.error('Error loading match status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [matchId])

  if (loading) return <p className="text-slate-600">Loading matching status...</p>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Matching Status</h1>
        <p className="text-slate-500">
          Review the end-to-end progress of donor and recipient pairing, logistics, and quality checks.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {timeline.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-blue">
                  {group.phase}
                </p>
                <h2 className="text-xl font-semibold text-slate-800">{group.title}</h2>
              </div>

              <StatusBadge status={group.status} />
            </div>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {group.steps.map((step, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-teal" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
