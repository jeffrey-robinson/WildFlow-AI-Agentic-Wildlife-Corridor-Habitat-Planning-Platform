import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Trees, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, setDemoUser, loading, error } = useAuthStore();
  const [email, setEmail] = useState('admin@wildflow.ai');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      // Fallback demo signin
      setDemoUser();
      router.push('/dashboard');
    }
  };

  const handleDemoSignIn = () => {
    setDemoUser();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0b130e] flex items-center justify-center p-6 font-sans text-slate-100">
      <div className="w-full max-w-md bg-[#0d1711] border border-emerald-900/40 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-950/60 mx-auto">
            <Trees className="w-7 h-7 text-slate-950 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">WildFlow AI Console</h2>
          <p className="text-xs text-slate-400">Sign in to access wildlife corridor & habitat analytics</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="officer@wildflow.ai"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Platform'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative border-t border-emerald-900/40 pt-4 text-center">
          <button
            onClick={handleDemoSignIn}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Instant Demo Access (Lead Director)</span>
          </button>
        </div>

        <div className="text-center text-xs text-slate-500">
          Need an operator account?{' '}
          <Link href="/register" className="text-emerald-400 hover:underline font-semibold">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
