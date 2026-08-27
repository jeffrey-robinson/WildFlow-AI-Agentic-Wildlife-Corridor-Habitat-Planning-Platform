import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  Brain,
  Trees,
  Network,
  Compass,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Activity,
} from 'lucide-react';

const agentIcons = {
  planner: Brain,
  habitat: Trees,
  fragmentation: Network,
  corridor: Compass,
  risk: AlertTriangle,
  validation: CheckCircle2,
  recovery: RefreshCw,
  monitoring: Activity,
};

const agentColors = {
  planner: 'border-purple-500/50 bg-purple-950/40 text-purple-300',
  habitat: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300',
  fragmentation: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
  corridor: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300',
  risk: 'border-rose-500/50 bg-rose-950/40 text-rose-300',
  validation: 'border-green-500/50 bg-green-950/40 text-green-300',
  recovery: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300',
  monitoring: 'border-teal-500/50 bg-teal-950/40 text-teal-300',
};

const AgentNode = memo(({ data, selected }) => {
  const agentType = data.agentType || 'planner';
  const Icon = agentIcons[agentType] || Brain;
  const status = data.status || 'idle';

  return (
    <div
      className={`w-64 rounded-2xl border-2 p-4 backdrop-blur-md shadow-xl transition-all ${
        selected ? 'ring-2 ring-emerald-400 border-emerald-400' : ''
      } ${status === 'active' ? 'node-active' : ''} ${
        status === 'warning' ? 'node-warning' : ''
      } ${agentColors[agentType]}`}
    >
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-slate-900" />

      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/50">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h4 className="text-xs font-bold truncate text-slate-100">{data.label || 'Agent Node'}</h4>
          <span className="text-[10px] uppercase font-mono tracking-wider opacity-75">{agentType} agent</span>
        </div>
      </div>

      <div className="bg-slate-950/60 rounded-xl p-2.5 text-[11px] space-y-1 font-mono text-slate-300 border border-slate-800/40">
        {data.species && <div>Species: <span className="text-emerald-400">{data.species}</span></div>}
        {data.ndviThreshold && <div>NDVI Threshold: <span className="text-emerald-400">{data.ndviThreshold}</span></div>}
        {data.maxCorridorDistanceKm && <div>Max Dist: <span className="text-cyan-400">{data.maxCorridorDistanceKm} km</span></div>}
        {data.highwayWeight && <div>Highway Weight: <span className="text-rose-400">{data.highwayWeight}</span></div>}
        <div>Status: <span className="uppercase font-bold text-emerald-400">{status}</span></div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-slate-900" />
    </div>
  );
});

AgentNode.displayName = 'AgentNode';

export const nodeTypes = {
  plannerNode: AgentNode,
  habitatNode: AgentNode,
  fragmentationNode: AgentNode,
  corridorNode: AgentNode,
  riskNode: AgentNode,
  validationNode: AgentNode,
  recoveryNode: AgentNode,
  monitoringNode: AgentNode,
};
