import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { Compass, CheckCircle2, AlertTriangle, ShieldCheck, Download } from 'lucide-react';
import api from '../services/api';

export default function CorridorsPage() {
  const [corridors, setCorridors] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/corridors');
        setCorridors(res.data.data);
      } catch (err) {
        setCorridors([
          {
            _id: 'corr-1',
            title: 'Corridor Alpha (Valley Alignment)',
            species: 'Asian Elephant',
            distance: 14.8,
            habitatScore: 92,
            humanRisk: 15,
            roadRisk: 22,
            overallScore: 89,
            status: 'RECOMMENDED',
          },
          {
            _id: 'corr-2',
            title: 'Corridor Beta (Canopy Ridge Bypass)',
            species: 'Asian Elephant',
            distance: 18.2,
            habitatScore: 84,
            humanRisk: 10,
            roadRisk: 18,
            overallScore: 84,
            status: 'VIABLE',
          },
          {
            _id: 'corr-3',
            title: 'Corridor Gamma (Southern Agriculture Link)',
            species: 'Asian Elephant',
            distance: 21.5,
            habitatScore: 71,
            humanRisk: 42,
            roadRisk: 55,
            overallScore: 68,
            status: 'HIGH_RISK',
          },
        ]);
      }
    }
    load();
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
              <Compass className="w-6 h-6 text-cyan-400" />
              <span>Wildlife Corridor Candidates</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Evaluated least-cost connectivity corridor geometries, distances, and conflict risk scores.
            </p>
          </div>
        </div>

        <div className="bg-[#0d1711] border border-emerald-900/40 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-emerald-900/40 bg-slate-900/60 text-emerald-400 text-xs uppercase font-mono">
                <th className="p-4">Corridor Title</th>
                <th className="p-4">Species</th>
                <th className="p-4">Length (km)</th>
                <th className="p-4">Habitat Score</th>
                <th className="p-4">Human Risk</th>
                <th className="p-4">Overall Score</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/20 text-xs">
              {corridors.map((c) => (
                <tr key={c._id} className="hover:bg-emerald-950/30 transition">
                  <td className="p-4 font-bold text-white">{c.title}</td>
                  <td className="p-4 font-mono text-slate-300">{c.species}</td>
                  <td className="p-4 font-mono text-cyan-400">{c.distance} km</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">{c.habitatScore}/100</td>
                  <td className="p-4 font-mono text-amber-400 font-bold">{c.humanRisk}%</td>
                  <td className="p-4 font-mono font-extrabold text-sm text-emerald-300">{c.overallScore}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono ${
                        c.status === 'RECOMMENDED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : c.status === 'VIABLE'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
