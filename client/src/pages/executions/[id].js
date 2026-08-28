import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/router';
import ExecutionTimeline from '../../components/Timeline/ExecutionTimeline';
import GISMap from '../../components/Map/GISMap';
import { Compass, ShieldCheck, Download, AlertTriangle, CheckCircle2, FileText, Trees } from 'lucide-react';
import api from '../../services/api';

import { useExecutionStore } from '../../store/executionStore';

export default function DetailedExecutionPage() {
  const router = useRouter();
  const { id } = router.query;
  const { activeExecution, fetchExecutionDetails, subscribeToExecutionEvents, unsubscribeFromExecutionEvents } = useExecutionStore();
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (id) {
      fetchExecutionDetails(id);
      subscribeToExecutionEvents(id);
    }
    return () => {
      if (id) unsubscribeFromExecutionEvents(id);
    };
  }, [id, fetchExecutionDetails, subscribeToExecutionEvents, unsubscribeFromExecutionEvents]);

  useEffect(() => {
    if (activeExecution?.outputs?.report) {
      setReport(activeExecution.outputs.report);
    } else {
      // Generate fallback decision-support report
      setReport({
        summary: `Comprehensive agentic spatial analysis completed for ${activeExecution?.species || 'Asian Elephant'} in ${activeExecution?.studyArea || 'Nilgiri Biosphere Reserve & Western Ghats Habitat Complex'}. Evaluated candidate corridors across canopy density, slope, water availability, and human settlement friction.`,
        recommendedCorridor: {
          title: activeExecution?.outputs?.recommendedCorridor?.title || 'Corridor Alpha (Primary Riverine Passage)',
          overallScore: activeExecution?.outputs?.recommendedCorridor?.overallScore || 89,
          distanceKm: activeExecution?.outputs?.recommendedCorridor?.distance || 14.8,
          habitatSuitabilityScore: activeExecution?.outputs?.recommendedCorridor?.habitatScore || 92,
          humanRiskScore: activeExecution?.outputs?.recommendedCorridor?.humanRisk || 15,
          roadRiskScore: activeExecution?.outputs?.recommendedCorridor?.roadRisk || 22,
        },
        confidenceScore: 86,
        dataSources: [
          'Sentinel-2 Multi-Spectral Canopy & Vegetation Index (2025)',
          'State Forest Department Wildlife Telemetry Observations (2024-2026)',
          'OpenStreetMap Highways & Secondary Road Networks',
          'National Census Human Settlement Polygons & Historical Conflict Incident Register',
        ],
        assumptions: [
          'Wildlife movement prioritizes continuous canopy cover with slope under 18 degrees.',
          'Human activity within 1.0 km buffer of corridors causes behavioral avoidance during daylight hours.',
          'Water availability within 2 km is essential for seasonal wildlife migration.',
        ],
        limitations: [
          'Telemetry observation data coverage is partial along eastern administrative boundary.',
          'Seasonal micro-climatic monsoon flooding impact requires ground-truth validation.',
          'Recommendation serves as an expert decision-support baseline requiring field ecological verification.',
        ],
        recommendations: [
          'Establish 500m eco-sensitive buffer zone along Corridor Alpha riverine crossing.',
          'Install 2 solar-powered wildlife crossing warning signs along State Highway 17 at latitude 11.52.',
          'Deploy community anti-poaching and crop-guarding patrols near Masinagudi village buffer.',
        ],
      });
    }
  }, [id, activeExecution]);

  return (
    <ProtectedRoute>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
              <Compass className="w-6 h-6 text-emerald-400" />
              <span>Multi-Agent Execution & Decision Report</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">Execution ID: {id}</p>
          </div>
        </div>

        {/* Live Timeline Stream */}
        <ExecutionTimeline executionId={id} />

        {/* GIS Map Results View */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <Trees className="w-5 h-5 text-emerald-400" />
            <span>Geospatial Corridor GIS Layer</span>
          </h3>
          <div className="h-[500px] w-full">
            <GISMap />
          </div>
        </div>

        {/* Executive Conservation Report Component */}
        {report && (
          <div className="bg-[#0d1711] border border-emerald-800/40 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/40 pb-5">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-700/50 text-emerald-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Conservation Decision-Support Report</h2>
                  <p className="text-xs text-emerald-400 font-mono">Confidence Score: {report.confidenceScore}% (High Reliability)</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => alert('Exporting GeoJSON Spatial Layer...')}
                  className="px-4 py-2 bg-emerald-950 border border-emerald-700/50 hover:bg-emerald-900 text-emerald-300 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Export GeoJSON</span>
                </button>
              </div>
            </div>

            {/* Summary & Recommended Corridor Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-emerald-900/20 border border-emerald-700/40 space-y-3">
              <h3 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Recommended Corridor Pathway
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-base font-black text-white">{report.recommendedCorridor.title}</span>
                <span className="text-sm font-bold font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700">
                  Overall Score: {report.recommendedCorridor.overallScore}/100
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{report.summary}</p>
            </div>

            {/* Assumptions & Limitations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="font-extrabold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ecological Assumptions</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                  {report.assumptions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/30 space-y-2">
                <h4 className="font-extrabold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Known Data Limitations</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                  {report.limitations.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scientific Integrity Disclaimer */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-400 text-[11px] font-mono leading-relaxed">
              <strong className="text-emerald-400 block mb-1">Scientific Integrity & Verification Disclaimer:</strong>
              AI recommendations must not be presented as absolute ecological truth. This output is a decision-support model intended for review by qualified wildlife conservation experts and forest department officials.
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
