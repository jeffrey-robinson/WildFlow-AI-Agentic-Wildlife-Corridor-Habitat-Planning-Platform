import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, color = 'emerald', trend }) {
  const colorStyles = {
    emerald: 'border-emerald-700/40 bg-emerald-950/20 text-emerald-400',
    amber: 'border-amber-700/40 bg-amber-950/20 text-amber-400',
    blue: 'border-blue-700/40 bg-blue-950/20 text-blue-400',
    purple: 'border-purple-700/40 bg-purple-950/20 text-purple-400',
    rose: 'border-rose-700/40 bg-rose-950/20 text-rose-400',
  };

  return (
    <div className={`p-5 rounded-2xl border ${colorStyles[color] || colorStyles.emerald} shadow-lg backdrop-blur-sm relative overflow-hidden transition hover:border-emerald-500/50`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{title}</p>
          <h3 className="text-3xl font-black text-white mt-1 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl bg-[#121e17] border border-emerald-800/30 ${colorStyles[color]?.split(' ')[2]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">{subtitle}</span>
        {trend && (
          <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${trend.positive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
