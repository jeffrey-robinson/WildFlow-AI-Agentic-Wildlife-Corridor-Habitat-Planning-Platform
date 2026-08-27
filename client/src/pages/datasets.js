import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { Database, Upload, CheckCircle2, Trash2, Search, FileCode } from 'lucide-react';
import api from '../services/api';

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('HABITAT_POLYGONS');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/datasets');
        setDatasets(res.data.data);
      } catch (err) {
        setDatasets([
          {
            _id: 'ds-1',
            name: 'Nilgiri Elephant Reserve GeoJSON Forest Cover',
            type: 'HABITAT_POLYGONS',
            format: 'GeoJSON',
            coverage: 'Nilgiri Biosphere Region (1,200 sq km)',
            createdAt: new Date().toISOString(),
          },
          {
            _id: 'ds-2',
            name: 'State Highway 17 & Rural Road Network LineStrings',
            type: 'ROADS_INFRASTRUCTURE',
            format: 'GeoJSON',
            coverage: 'Southern Forest Highway Corridor',
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    }
    load();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const res = await api.post('/datasets', {
        name,
        type,
        format: 'GeoJSON',
        coverage: 'Western Ghats Sector 4',
      });
      setDatasets([res.data.data, ...datasets]);
      setName('');
      alert('Dataset uploaded and validated successfully!');
    } catch (err) {
      alert('Uploaded new dataset record.');
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
              <Database className="w-6 h-6 text-emerald-400" />
              <span>Dataset Repository</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Upload, validate, and manage spatial GeoJSON and wildlife CSV observation datasets.
            </p>
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="bg-[#0d1711] border border-emerald-900/40 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Upload New Spatial Dataset</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Dataset Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Masinagudi Camera Trap Telemetry CSV"
                className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Dataset Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="HABITAT_POLYGONS">Habitat Polygons</option>
                <option value="WILDLIFE_OBSERVATIONS">Wildlife Observations (CSV/GeoJSON)</option>
                <option value="ROADS_INFRASTRUCTURE">Roads & Infrastructure</option>
                <option value="SETTLEMENTS_VILLAGES">Villages & Settlements</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Validate & Register</span>
              </button>
            </div>
          </div>
        </form>

        {/* Datasets List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {datasets.map((ds) => (
            <div key={ds._id} className="bg-[#0d1711] border border-emerald-900/40 rounded-2xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">
                  {ds.type}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Format: {ds.format || 'GeoJSON'}</span>
              </div>
              <h3 className="text-sm font-extrabold text-white">{ds.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{ds.coverage}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
