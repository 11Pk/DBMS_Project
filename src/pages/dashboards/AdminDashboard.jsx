// import DataTable from '../../components/DataTable'
// import StatusBadge from '../../components/StatusBadge'
// import { Button } from '../../components/ui/Button'
// import {
//   donorTable,
//   recipientTable,
//   matchTable,
// } from '../../data/mockData'

// const donorColumns = [
//   { key: 'name', label: 'Donor' },
//   { key: 'organ', label: 'Organ' },
//   { key: 'status', label: 'Status' },
// ]

// const recipientColumns = [
//   { key: 'name', label: 'Recipient' },
//   { key: 'organ', label: 'Needed Organ' },
//   { key: 'priority', label: 'Priority' },
// ]

// const matchColumns = [
//   { key: 'organ', label: 'Organ' },
//   { key: 'donor', label: 'Donor' },
//   { key: 'recipient', label: 'Recipient' },
//   {
//     key: 'status',
//     label: 'Status',
//     render: (value) => <StatusBadge status={value} />,
//   },
// ]

// export default function AdminDashboard() {
//   return (
//     <div className="space-y-8">
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <div>
//           <p className="text-sm uppercase tracking-widest text-brand-blue">Admin</p>
//           <h1 className="text-3xl font-semibold text-slate-900">
//             Hospital control center
//           </h1>
//           <p className="text-slate-500">
//             Review donor pool, recipient waitlists, organ matches, and quality checks.
//           </p>
//         </div>
//         <Button variant="subtle">Generate Daily Report</Button>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <div>
//           <h2 className="text-lg font-semibold text-slate-800">Donors</h2>
//           <DataTable columns={donorColumns} data={donorTable} />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-slate-800">Recipients</h2>
//           <DataTable columns={recipientColumns} data={recipientTable} />
//         </div>
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold text-slate-800">Organ Matches</h2>
//         <DataTable columns={matchColumns} data={matchTable} />
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Button } from "../../components/ui/Button";

const donorColumns = [
  { key: "name", label: "Donor" },
  { key: "organ", label: "Organ" },
  { key: "status", label: "Status" },
];

const recipientColumns = [
  { key: "name", label: "Recipient" },
  { key: "organ", label: "Needed Organ" },
  { key: "priority", label: "Priority" },
];

const matchColumns = [
  { key: "organ", label: "Organ" },
  { key: "donor", label: "Donor" },
  { key: "recipient", label: "Recipient" },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value} />,
  },
];

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const d = await fetch("http://localhost:5000/api/admin/donors", { credentials: "include" });
        const r = await fetch("http://localhost:5000/api/admin/recipients", { credentials: "include" });
        const m = await fetch("/api/matches/${matchId}/status", { credentials: "include" });

        setDonors(await d.json());
        setRecipients(await r.json());
        setMatches(await m.json());
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading dashboard…</p>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-blue">Admin</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Hospital Control Center
          </h1>
          <p className="text-slate-500">
            Review donor pool, recipient waitlists, organ matches, and quality checks.
          </p>
        </div>
        <Button variant="subtle">Generate Daily Report</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Donors</h2>
          <DataTable columns={donorColumns} data={donors} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800">Recipients</h2>
          <DataTable columns={recipientColumns} data={recipients} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800">Organ Matches</h2>
        <DataTable columns={matchColumns} data={matches} />
      </div>
    </div>
  );
}
