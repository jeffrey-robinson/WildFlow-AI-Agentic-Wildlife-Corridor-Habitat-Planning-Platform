import React from 'react';
import {
  Brain,
  Trees,
  Network,
  Compass,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Activity,
  GripVertical,
} from 'lucide-react';

const paletteItems = [
  { type: 'plannerNode', agentType: 'planner', label: 'Conservation Planner', icon: Brain, color: 'text-purple-400 border-purple-500/30' },
  { type: 'habitatNode', agentType: 'habitat', label: 'Habitat Analysis', icon: Trees, color: 'text-emerald-400 border-emerald-500/30' },
  { type: 'fragmentationNode', agentType: 'fragmentation', label: 'Habitat Fragmentation', icon: Network, color: 'text-amber-400 border-amber-500/30' },
  { type: 'corridorNode', agentType: 'corridor', label: 'Corridor Planning', icon: Compass, color: 'text-cyan-400 border-cyan-500/30' },
  { type: 'riskNode', agentType: 'risk', label: 'Risk Assessment', icon: AlertTriangle, color: 'text-rose-400 border-rose-500/30' },
  { type: 'validationNode', agentType: 'validation', label: 'Validation Agent', icon: CheckCircle2, color: 'text-green-400 border-green-500/30' },
  { type: 'recoveryNode', agentType: 'recovery', label: 'Recovery Agent', icon: RefreshCw, color: 'text-indigo-400 border-indigo-500/30' },
  { type: 'monitoringNode', agentType: 'monitoring', label: 'Monitoring & Report', icon: Activity, color: 'text-teal-400 border-teal-500/30' },
];

export default function NodePalette() {
  const onDragStart = (event, nodeType, agentType, label) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, agentType, label }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 border-r border-emerald-900/30 bg-[#0d1711] p-4 flex flex-col justify-between shrink-0">
      <div>
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
          Agent Node Palette
        </h3>
        <p className="text-[11px] text-slate-400 mb-4 leading-normal">
          Drag and drop specialized AI nodes onto the workflow canvas.
        </p>

        <div className="space-y-2">
          {paletteItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.type}
                draggable
                onDragStart={(e) => onDragStart(e, item.type, item.agentType, item.label)}
                className={`p-3 rounded-xl bg-emerald-950/20 border ${item.color} flex items-center justify-between cursor-grab hover:bg-emerald-900/30 transition shadow-sm group`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-slate-900/80">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                    {item.label}
                  </span>
                </div>
                <GripVertical className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
        <p className="font-semibold text-slate-300 mb-1">💡 Workflow Tip:</p>
        Connect output of Corridor Planner directly to Risk Assessment for optimal spatial evaluation.
      </div>
    </div>
  );
}
