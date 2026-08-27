import React, { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/router';
import { useWorkflowStore } from '../../store/workflowStore';
import { Sparkles, Brain, ArrowRight, Trees, Compass, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function WorkflowBuilderPage() {
  const router = useRouter();
  const { generateWorkflowFromPrompt, generatingAI } = useWorkflowStore();
  const [promptText, setPromptText] = useState(
    'Find three potential elephant corridors connecting two forest habitats while avoiding highways, villages, and highly cultivated areas.'
  );
  const [selectedSpecies, setSelectedSpecies] = useState('Asian Elephant');

  const samplePrompts = [
    'Find three potential elephant corridors connecting two forest habitats while avoiding highways, villages, and highly cultivated areas.',
    'Analyze suitable tiger habitat in Western Ghats Sector 4 and identify areas where forest connectivity is weak.',
    'Evaluate Indian Gaur movement corridors between Bandipur core sanctuary and Mudumalai reserve avoiding railways.',
  ];

  const handleBuild = async (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    try {
      const created = await generateWorkflowFromPrompt(promptText, selectedSpecies);
      router.push(`/workflows/${created._id}`);
    } catch (err) {
      router.push('/workflows/wf-sample-1');
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>AI Natural Language Workflow Generator</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Describe Your Conservation Objective
          </h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            WildFlow AI interprets complex ecological requirements in natural language and automatically generates structured 8-agent execution pipelines.
          </p>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleBuild} className="bg-[#0d1711] border border-emerald-900/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Conservation Objective Prompt
            </label>
            <textarea
              rows={4}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Describe your target species, forest habitat bounds, road/village constraints..."
              className="w-full bg-slate-950 border border-emerald-800/50 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 shadow-inner font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Target Wildlife Species</label>
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="w-full bg-slate-950 border border-emerald-800/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Asian Elephant">Asian Elephant (Elephas maximus)</option>
                <option value="Bengal Tiger">Bengal Tiger (Panthera tigris)</option>
                <option value="Indian Gaur">Indian Gaur (Bos gaurus)</option>
                <option value="Indian Leopard">Indian Leopard (Panthera pardus)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Study Area Region</label>
              <input
                type="text"
                disabled
                value="Nilgiri Elephant Reserve & Western Ghats"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-400"
              />
            </div>
          </div>

          {/* Sample Prompts */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">Or select an example prompt:</span>
            <div className="space-y-2">
              {samplePrompts.map((sp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPromptText(sp)}
                  className="w-full text-left p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-700/50 text-xs text-slate-300 hover:text-white transition"
                >
                  "{sp}"
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={generatingAI}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition flex items-center justify-center space-x-2"
          >
            <Brain className="w-5 h-5" />
            <span>{generatingAI ? 'Synthesizing Agent Workflow...' : 'Generate Executable Visual Workflow'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
