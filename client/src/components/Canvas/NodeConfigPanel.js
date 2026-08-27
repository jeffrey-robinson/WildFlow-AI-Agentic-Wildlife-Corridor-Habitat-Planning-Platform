import React from 'react';
import { Settings, Sliders, X } from 'lucide-react';

export default function NodeConfigPanel({ selectedNode, onChange, onClose }) {
  if (!selectedNode) {
    return (
      <div className="w-72 border-l border-emerald-900/30 bg-[#0d1711] p-5 text-slate-400 text-xs flex flex-col justify-center items-center text-center shrink-0">
        <Sliders className="w-8 h-8 text-emerald-500/40 mb-2 stroke-1" />
        <p className="font-semibold text-slate-300">No Node Selected</p>
        <p className="text-[11px] text-slate-500 mt-1">Select a node on the canvas to configure its specialized parameters.</p>
      </div>
    );
  }

  const { data } = selectedNode;

  const handleInputChange = (field, value) => {
    onChange(selectedNode.id, {
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="w-72 border-l border-emerald-900/30 bg-[#0d1711] p-5 flex flex-col justify-between shrink-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Node Inspector</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Node Title</label>
          <input
            type="text"
            value={data.label || ''}
            onChange={(e) => handleInputChange('label', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Target Species</label>
          <select
            value={data.species || 'Asian Elephant'}
            onChange={(e) => handleInputChange('species', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Asian Elephant">Asian Elephant</option>
            <option value="Bengal Tiger">Bengal Tiger</option>
            <option value="Indian Gaur">Indian Gaur</option>
            <option value="Indian Leopard">Indian Leopard</option>
          </select>
        </div>

        {data.agentType === 'habitat' && (
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">NDVI Canopy Threshold</label>
            <input
              type="number"
              step="0.05"
              value={data.ndviThreshold || 0.65}
              onChange={(e) => handleInputChange('ndviThreshold', parseFloat(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}

        {data.agentType === 'corridor' && (
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Max Corridor Distance (km)</label>
            <input
              type="number"
              value={data.maxCorridorDistanceKm || 45}
              onChange={(e) => handleInputChange('maxCorridorDistanceKm', parseInt(e.target.value, 10))}
              className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}

        {data.agentType === 'risk' && (
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Highway Weight Penalty</label>
            <input
              type="number"
              step="0.1"
              value={data.highwayWeight || 0.4}
              onChange={(e) => handleInputChange('highwayWeight', parseFloat(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-emerald-900/40 text-[10px] text-slate-500 font-mono">
        ID: {selectedNode.id} | Type: {selectedNode.type}
      </div>
    </div>
  );
}
