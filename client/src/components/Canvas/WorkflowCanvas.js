import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './CustomNodes';
import NodePalette from './NodePalette';
import NodeConfigPanel from './NodeConfigPanel';
import { Play, Save, Sparkles, Copy, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { useWorkflowStore } from '../../store/workflowStore';

const initialNodes = [
  { id: 'node-1', type: 'plannerNode', position: { x: 100, y: 150 }, data: { label: 'Conservation Planner', agentType: 'planner', species: 'Asian Elephant', status: 'idle' } },
  { id: 'node-2', type: 'habitatNode', position: { x: 380, y: 150 }, data: { label: 'Habitat Analysis', agentType: 'habitat', ndviThreshold: 0.65, status: 'idle' } },
  { id: 'node-3', type: 'fragmentationNode', position: { x: 660, y: 150 }, data: { label: 'Fragmentation Agent', agentType: 'fragmentation', status: 'idle' } },
  { id: 'node-4', type: 'corridorNode', position: { x: 940, y: 150 }, data: { label: 'Corridor Planning', agentType: 'corridor', maxCorridorDistanceKm: 45, status: 'idle' } },
  { id: 'node-5', type: 'riskNode', position: { x: 520, y: 350 }, data: { label: 'Risk Assessment', agentType: 'risk', highwayWeight: 0.4, status: 'idle' } },
  { id: 'node-6', type: 'validationNode', position: { x: 800, y: 350 }, data: { label: 'Validation Agent', agentType: 'validation', status: 'idle' } },
  { id: 'node-7', type: 'recoveryNode', position: { x: 1080, y: 350 }, data: { label: 'Recovery Agent', agentType: 'recovery', status: 'idle' } },
  { id: 'node-8', type: 'monitoringNode', position: { x: 800, y: 550 }, data: { label: 'Monitoring Agent', agentType: 'monitoring', status: 'idle' } },
];

const initialEdges = [
  { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true },
  { id: 'e2-3', source: 'node-2', target: 'node-3', animated: true },
  { id: 'e3-4', source: 'node-3', target: 'node-4', animated: true },
  { id: 'e4-5', source: 'node-4', target: 'node-5', animated: true },
  { id: 'e5-6', source: 'node-5', target: 'node-6', animated: true },
  { id: 'e6-7', source: 'node-6', target: 'node-7', animated: true },
  { id: 'e7-8', source: 'node-7', target: 'node-8', animated: true },
];

export default function WorkflowCanvas({ workflowData }) {
  const router = useRouter();
  const { saveWorkflow } = useWorkflowStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(workflowData?.nodes || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflowData?.edges || initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData) return;

      const { nodeType, agentType, label } = JSON.parse(rawData);
      const position = {
        x: event.clientX - 320,
        y: event.clientY - 120,
      };

      const newNode = {
        id: `node_${Date.now()}`,
        type: nodeType,
        position,
        data: { label, agentType, status: 'idle' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onNodeClick = (_, node) => setSelectedNodeId(node.id);

  const handleNodeDataChange = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === nodeId ? { ...node, data: newData } : node))
    );
  };

  const handleSave = async () => {
    await saveWorkflow({
      _id: workflowData?._id,
      name: workflowData?.name || 'Elephant Corridor Analysis Workflow',
      species: workflowData?.species || 'Asian Elephant',
      nodes,
      edges,
    });
    alert('Workflow graph configuration saved successfully!');
  };

  const handleExecute = async () => {
    // Route to execution view directly
    const mockExecId = workflowData?._id || '65f001122334455667788990';
    router.push(`/executions/${mockExecId}`);
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-[#0b130e] rounded-2xl border border-emerald-900/40 overflow-hidden shadow-2xl">
      {/* Top Workflow Action Bar */}
      <div className="h-14 bg-[#0d1711] border-b border-emerald-900/40 px-5 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/workflows')}
            className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-extrabold text-white">
              {workflowData?.name || 'Asian Elephant Corridor & Habitat Workflow'}
            </h2>
            <p className="text-[11px] text-emerald-400 font-mono">
              Version {workflowData?.version || 1} • {nodes.length} Visual Agent Nodes
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 bg-emerald-950/60 border border-emerald-700/50 hover:bg-emerald-900 text-emerald-300 font-semibold text-xs rounded-xl flex items-center space-x-1.5 shadow-sm transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Workflow</span>
          </button>

          <button
            onClick={handleExecute}
            className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1.5 shadow-lg shadow-emerald-950/60 transition transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Execute Analysis</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <NodePalette />

        <div className="flex-1 h-full bg-[#09100c] relative" onDragOver={onDragOver} onDrop={onDrop}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#163022" gap={24} size={1} />
            <Controls className="!bg-[#121e17] !border-emerald-800/40 !text-emerald-400" />
            <MiniMap nodeColor="#22c55e" maskColor="rgba(11, 19, 14, 0.8)" className="!bg-[#0d1711] !border-emerald-900/50" />
          </ReactFlow>
        </div>

        <NodeConfigPanel
          selectedNode={selectedNode}
          onChange={handleNodeDataChange}
          onClose={() => setSelectedNodeId(null)}
        />
      </div>
    </div>
  );
}
