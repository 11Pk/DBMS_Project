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
import { api } from "../../services/api";

const donorColumns = [
  { key: "name", label: "Donor" },
  { key: "organ_type", label: "Organ" },
  { key: "blood_group", label: "Blood Group" },
  { key: "availability", label: "Availability" },
  { key: "status", label: "Status" },
];

const recipientColumns = [
  { key: "name", label: "Recipient" },
  { key: "organ_required", label: "Needed Organ" },
  { key: "blood_group", label: "Blood Group" },
  { key: "urgency", label: "Urgency" },
  { key: "status", label: "Status" },
];

const matchColumns = [
  { key: "donor_name", label: "Donor" },
  { key: "recipient_name", label: "Recipient" },
  { key: "compatibility_score", label: "Score" },
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
  const [error, setError] = useState(null);
  const [matchingLoading, setMatchingLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [donorsRes, recipientsRes, matchesRes] = await Promise.all([
        api.get("/admin/donors"),
        api.get("/admin/recipients"),
        api.get("/matches").catch(() => ({ data: { success: true, data: [] } })),
      ]);

      setDonors(donorsRes.data.data || []);
      setRecipients(recipientsRes.data.data || []);
      setMatches(matchesRes.data.data || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err.response?.data?.error || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleRunMatching = async () => {
    try {
      setMatchingLoading(true);
      const response = await api.post("/matches");
      alert(`Matching complete! ${response.data.data.length} matches created.`);
      loadDashboardData();
    } catch (err) {
      alert(err.response?.data?.error || "Matching failed");
    } finally {
      setMatchingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadDashboardData}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-blue">Admin</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Hospital Control Center
          </h1>
          <p className="text-slate-500">
            Review donor pool, recipient waitlists, and manage organ matches.
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleRunMatching} 
            disabled={matchingLoading}
          >
            {matchingLoading ? "Running..." : "Run Matching Algorithm"}
          </Button>
          <Button variant="subtle" onClick={loadDashboardData}>Refresh</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Donors</p>
          <p className="text-3xl font-semibold text-brand-blue">{donors.length}</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Recipients</p>
          <p className="text-3xl font-semibold text-brand-blue">{recipients.length}</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active Matches</p>
          <p className="text-3xl font-semibold text-brand-blue">{matches.length}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Donors</h2>
          {donors.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No donors registered yet</p>
          ) : (
            <DataTable columns={donorColumns} data={donors} />
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recipients</h2>
          {recipients.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No recipients registered yet</p>
          ) : (
            <DataTable columns={recipientColumns} data={recipients} />
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Organ Matches</h2>
        {matches.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No matches found. Run the matching algorithm to create matches.</p>
        ) : (
          <DataTable columns={matchColumns} data={matches} />
        )}
      </div>
    </div>
  )
}
