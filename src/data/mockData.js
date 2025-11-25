export const donorMatches = [
  { id: 'm1', organ: 'Kidney', recipient: 'Aarav K', status: 'Matched', notes: 'Awaiting compatibility lab report.' },
  { id: 'm2', organ: 'Liver', recipient: 'Mia P', status: 'Available', notes: 'Needs hospital scheduling confirmation.' },
]

export const donorNotifications = [
  { id: 'n1', title: 'New compatibility result', message: 'HLA typing complete. Organ approved for transplant.', status: 'Action needed' },
  { id: 'n2', title: 'Logistics update', message: 'Pickup team scheduled for 7:30 PM today.' },
]

export const recipientWaitlist = [
  { id: 'w1', organ: 'Kidney', position: 4, status: 'Matched', notes: 'Pre-op assessments underway.', updated: '2h ago' },
  { id: 'w2', organ: 'Heart', position: 12, status: 'Pending', notes: 'Awaiting donor pool expansion.', updated: '1d ago' },
]

export const recipientNotifications = [
  { id: 'rn1', title: 'Match found', message: 'A compatible donor kidney has been identified.', status: 'Respond' },
  { id: 'rn2', title: 'Medical records needed', message: 'Upload updated cardiology report to expedite review.' },
]

export const donorTable = [
  { id: 'd1', name: 'Sia M', organ: 'Kidney', status: 'Available' },
  { id: 'd2', name: 'Rohan P', organ: 'Liver', status: 'Matched' },
  { id: 'd3', name: 'Harper L', organ: 'Heart', status: 'Completed' },
]

export const recipientTable = [
  { id: 'r1', name: 'Imani G', organ: 'Kidney', priority: 'High' },
  { id: 'r2', name: 'Noah T', organ: 'Liver', priority: 'Medium' },
  { id: 'r3', name: 'Leo C', organ: 'Heart', priority: 'Critical' },
]

export const matchTable = [
  { id: 'ma1', organ: 'Kidney', donor: 'Sia M', recipient: 'Imani G', status: 'Approved' },
  { id: 'ma2', organ: 'Liver', donor: 'Rohan P', recipient: 'Noah T', status: 'Pending' },
  { id: 'ma3', organ: 'Heart', donor: 'Harper L', recipient: 'Leo C', status: 'Completed' },
]

export const matchingTimeline = [
  {
    title: 'Pre-Donation Validation',
    phase: 'Step 1',
    status: 'Completed',
    steps: ['Donor screening', 'Lab compatibility', 'Legal consent verified'],
  },
  {
    title: 'Recipient Readiness',
    phase: 'Step 2',
    status: 'Matched',
    steps: ['Recipient notified', 'Pre-op tests scheduled', 'Insurance cleared'],
  },
  {
    title: 'Logistics & Transit',
    phase: 'Step 3',
    status: 'Pending',
    steps: ['Operating room reserved', 'Courier assigned', 'Cold chain monitoring'],
  },
  {
    title: 'Post-Operative Tracking',
    phase: 'Step 4',
    status: 'Pending',
    steps: ['Vitals monitoring', 'Graft function tests', 'Discharge planning'],
  },
]

export const qualityChecks = [
  {
    id: 'qc1',
    organ: 'Kidney',
    donor: 'Sia M',
    hospital: 'CityCare Hospital',
    status: 'Pending',
    notes: 'Awaiting infectious disease panel.',
  },
  {
    id: 'qc2',
    organ: 'Liver',
    donor: 'Rohan P',
    hospital: 'Unity Medical',
    status: 'Pending',
    notes: 'Imaging results uploaded. Review required.',
  },
]

