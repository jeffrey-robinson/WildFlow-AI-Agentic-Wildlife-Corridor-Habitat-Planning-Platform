import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { Trees, Search, Filter, Droplets, ShieldCheck, MapPin, AreaChart } from 'lucide-react';
import api from '../services/api';

export default function HabitatsPage() {
  const [habitats, setHabitats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/habitats');
        setHabitats(res.data.data);
      } catch (err) {
        setHabitats([
          {
            _id: 'hab-1',
            name: 'Mudumalai Core Forest Reserve',
            species: 'Asian Elephant',
            habitatType: 'Moist Deciduous & Bamboo Canopy',
            area: 321.5,
            qualityScore: 92,
            waterAvailability: 88,
            vegetationScore: 95,
          },
          {
            _id: 'hab-2',
            name: 'Bandipur Sanctuary Habitat Complex',
            species: 'Asian Elephant',
            habitatType: 'Dry Deciduous Forest',
            area: 480.0,
            qualityScore: 88,
            waterAvailability: 82,
            vegetationScore: 86,
          },
          {
            _id: 'hab-3',
            name: 'Wayanad Wildlife Sanctuary Sector B',
            species: 'Bengal Tiger',
            habitatType: 'Semi-Evergreen Forest',
            area: 344.4,
            qualityScore: 90,
            waterAvailability: 94,
            vegetationScore: 91,
          },
        ]);
      }
    }
    load();
  }, []);

  const filtered = habitats.filter((h) => h.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ProtectedRoute>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
              <Trees className="w-6 h-6 text-emerald-400" />
              <span>Habitat Explorer</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Analyze forest patch quality scores, NDVI canopy density, and water availability metrics.
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search habitat reserves..."
            className="w-full bg-[#0d1711] border border-emerald-900/40 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((hab) => (
            <div
              key={hab._id}
              className="bg-[#0d1711] border border-emerald-900/40 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xl transition space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">
                    {hab.species}
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    Quality: {hab.qualityScore}/100
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white mt-2">{hab.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{hab.habitatType}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-900/40 font-mono text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Surface Area</span>
                  <span className="text-slate-200 font-bold">{hab.area} sq km</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Water Availability</span>
                  <span className="text-cyan-400 font-bold">{hab.waterAvailability}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
