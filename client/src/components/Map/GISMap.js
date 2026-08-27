import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMapStore } from '../../store/mapStore';
import { Layers, Eye, EyeOff, Filter } from 'lucide-react';

const LeafletMapContainer = dynamic(() => import('./LeafletMapContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-[#0b130e] rounded-2xl flex items-center justify-center text-emerald-400 font-mono text-xs">
      Loading Interactive GIS Spatial Engine...
    </div>
  ),
});

export default function GISMap() {
  const { layers, toggleLayer, selectedSpecies, setSelectedSpecies } = useMapStore();

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-emerald-900/40 shadow-2xl flex flex-col bg-[#0b130e]">
      {/* Top Floating Control Toolbar */}
      <div className="absolute top-4 left-4 z-20 bg-[#0d1711]/90 backdrop-blur-md border border-emerald-800/40 rounded-2xl p-3 shadow-xl space-y-3 max-w-xs">
        <div className="flex items-center space-x-2 border-b border-emerald-900/40 pb-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">GIS Layer Manager</h3>
        </div>

        <div className="space-y-1.5 max-h-60 overflow-y-auto text-xs pr-1">
          {Object.entries(layers).map(([key, isVisible]) => (
            <button
              key={key}
              onClick={() => toggleLayer(key)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition ${
                isVisible
                  ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
              {isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        {/* Species Filter */}
        <div className="pt-2 border-t border-emerald-900/40">
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mb-1">
            <Filter className="w-3 h-3 text-emerald-400" />
            <span className="font-semibold">Species Filter</span>
          </div>
          <select
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Wildlife Species</option>
            <option value="Asian Elephant">Asian Elephant</option>
            <option value="Bengal Tiger">Bengal Tiger</option>
            <option value="Indian Gaur">Indian Gaur</option>
          </select>
        </div>
      </div>

      {/* Dynamic Map Canvas */}
      <div className="flex-1 w-full h-full min-h-[550px] z-10">
        <LeafletMapContainer />
      </div>
    </div>
  );
}
