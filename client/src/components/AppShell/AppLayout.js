import React, { useState } from 'react';
import Link from 'next/router';
import { useRouter } from 'next/router';
import {
  Trees,
  LayoutDashboard,
  GitBranch,
  MapPin,
  Compass,
  Map as MapIcon,
  Database,
  PlaySquare,
  Settings,
  Bell,
  LogOut,
  User,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function AppLayout({ children }) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflows', href: '/workflows', icon: GitBranch },
    { name: 'Habitats', href: '/habitats', icon: Trees },
    { name: 'Corridors', href: '/corridors', icon: Compass },
    { name: 'GIS Platform Map', href: '/map', icon: MapIcon },
    { name: 'Datasets', href: '/datasets', icon: Database },
    { name: 'Executions', href: '/executions', icon: PlaySquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0b130e] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-16 border-b border-emerald-900/40 bg-[#0d1711]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <Trees className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-tight text-lg text-white">WildFlow</span>
              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                AI Agentic GIS
              </span>
            </div>
            <p className="text-xs text-emerald-400/70 font-medium">Wildlife Corridor & Habitat Planning Platform</p>
          </div>
        </div>

        {/* Live System Status Ticker */}
        <div className="hidden md:flex items-center space-x-6 text-xs bg-emerald-950/30 border border-emerald-900/30 px-4 py-1.5 rounded-full">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300 font-semibold">Orchestrator:</span>
            <span className="text-emerald-400">8 Agents Ready</span>
          </div>
          <div className="w-px h-3 bg-emerald-800/50"></div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-300 font-semibold">Study Region:</span>
            <span className="text-emerald-300">Nilgiri Biosphere</span>
          </div>
        </div>

        {/* User Profile & Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/30 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 transition relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
          </button>

          <div className="flex items-center space-x-3 bg-emerald-950/40 border border-emerald-800/30 px-3 py-1.5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/60 border border-emerald-600/40 flex items-center justify-center text-emerald-300 font-bold text-sm">
              {user?.name ? user.name[0] : 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-200">{user?.name || 'Conservation Officer'}</p>
              <p className="text-[10px] text-emerald-400 font-mono uppercase">{user?.role || 'Operator'}</p>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="text-slate-400 hover:text-rose-400 p-1 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-emerald-900/30 bg-[#0d1711] flex flex-col justify-between hidden md:flex shrink-0">
          <div className="p-4 space-y-1">
            <p className="text-[11px] font-semibold text-emerald-500/70 tracking-wider uppercase px-3 mb-2">
              Navigation Console
            </p>
            {navigation.map((item) => {
              const isActive = router.pathname === item.href || (item.href !== '/' && router.pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-900/60 to-emerald-950/80 text-emerald-300 border border-emerald-700/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Quick AI Conservation Prompt Widget */}
          <div className="p-4 m-3 rounded-2xl bg-gradient-to-b from-emerald-950/60 to-emerald-900/20 border border-emerald-800/30">
            <div className="flex items-center space-x-2 text-emerald-400 mb-1.5">
              <Trees className="w-4 h-4" />
              <span className="text-xs font-bold">Quick AI Prompt</span>
            </div>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Transform natural language conservation queries into multi-agent visual workflows.
            </p>
            <button
              onClick={() => router.push('/workflows/builder')}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1.5"
            >
              <span>Launch Builder</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#0b130e] p-6">{children}</main>
      </div>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="fixed top-16 right-6 w-80 bg-[#121e17] border border-emerald-700/40 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40 mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>System Alerts</span>
            </h4>
            <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white text-xs">
              Close
            </button>
          </div>
          <div className="space-y-2.5 max-h-80 overflow-y-auto">
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/30 text-xs">
              <div className="flex items-center justify-between font-semibold text-emerald-300">
                <span>Corridor Alpha Validated</span>
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>
              <p className="text-slate-300 text-[11px] mt-1">
                89/100 suitability score achieved for Asian Elephant migration route.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/30 text-xs">
              <div className="flex items-center justify-between font-semibold text-amber-300">
                <span>High-Risk Warning</span>
                <span className="text-[10px] text-slate-400">12m ago</span>
              </div>
              <p className="text-slate-300 text-[11px] mt-1">
                State Highway 17 intersection detected with 55% road conflict score.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
