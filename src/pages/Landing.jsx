import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/Button'
import RoleHighlights from './partials/RoleHighlights'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-brand-light">
      <Navbar variant="transparent" />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <p className="inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Organ Donation & Procurement Network
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Coordinate life-saving transplants with confidence
          </h1>
          <p className="text-lg text-slate-500">
            A unified platform that connects donors, recipients, and hospitals to manage
            organ procurement, quality checks, and transplant workflows in real-time.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost">View Dashboards</Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-2xl backdrop-blur"
        >
          <RoleHighlights />
        </motion.div>
      </section>
    </div>
  )
}

