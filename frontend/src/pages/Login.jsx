import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Lock, Mail, ShieldAlert, Sparkles } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { accent } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@cineverse.ai');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('google_user@cineverse.ai', 'google_bypass');
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  const accentColor = accent === 'purple' ? 'brand-purple' : 'brand-cyan';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const borderAccent = accent === 'purple' ? 'border-brand-purple/20' : 'border-brand-cyan/20';
  const glowClass = accent === 'purple' 
    ? 'btn-neon-purple shadow-lg shadow-brand-purple/20' 
    : 'btn-neon-cyan shadow-lg shadow-brand-cyan/20';

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-bg px-4 py-12 sm:px-6 lg:px-8 grid-bg select-none">
      
      {/* Shifting Spotlight Orbs */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-brand-purple/15 blur-[120px] pointer-events-none animate-ambient-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-brand-cyan/15 blur-[120px] pointer-events-none animate-ambient-pulse" style={{ animationDelay: '5s' }} />

      <div className="relative w-full max-w-md space-y-8 animate-fade-in">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 font-black text-4xl tracking-wider mb-2">
            <span className="text-white">CINE</span>
            <span className={`px-3 py-1 rounded text-sm font-bold text-black uppercase ${
              accent === 'purple' ? 'bg-brand-purple shadow-lg shadow-brand-purple/30' : 'bg-brand-cyan shadow-lg shadow-brand-cyan/30'
            }`}>
              VERSE AI+
            </span>
          </div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
            The Intelligent Social Movie Ecosystem
          </p>
        </div>

        {/* Double-border Apple Glassmorphic Card */}
        <div className="glass-card apple-border rounded-3xl p-8 shadow-2xl relative">
          
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className={`h-5 w-5 ${textAccent} animate-pulse`} /> System Authentication
          </h2>

          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 text-xs text-red-400">
              <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Email Identity
              </label>
              <div className="relative">
                <Mail className="absolute top-3.5 left-4 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="identity@cineverse.ai"
                  className={`w-full rounded-xl border border-white/5 bg-white/5 py-3 pr-4 pl-12 text-xs text-white placeholder-gray-500 outline-none transition duration-300 focus:border-${accentColor}/50 focus:bg-white/10`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Passcode
              </label>
              <div className="relative">
                <Lock className="absolute top-3.5 left-4 h-4 w-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border border-white/5 bg-white/5 py-3 pr-4 pl-12 text-xs text-white placeholder-gray-500 outline-none transition duration-300 focus:border-${accentColor}/50 focus:bg-white/10`}
                />
              </div>
            </div>

            {/* Session Settings */}
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 text-brand-purple focus:ring-0" />
                <span>Keep Session Live</span>
              </label>
              <a href="#" className="hover:text-white transition">Pass Recovery</a>
            </div>

            {/* Action Trigger */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition duration-300 disabled:opacity-50 cursor-pointer ${glowClass}`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Synching Identity...
                </>
              ) : (
                'Establish Connection'
              )}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 border-b border-white/5" />
            <span className="relative bg-dark-card px-3 text-[9px] font-bold uppercase tracking-widest text-gray-500">
              Or sync via keys
            </span>
          </div>

          {/* Google SSO */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2.5 rounded-xl border border-white/5 bg-white/3 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/8 transition duration-300 cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google Identity
          </button>

          <div className="mt-6 text-center text-[10px] text-gray-500 font-medium leading-relaxed">
            <span>By establishing connection, you authorization credentials under </span>
            <a href="#" className="underline hover:text-white transition">Platform Nodes</a>
          </div>

        </div>

        {/* Developer Sandbox box */}
        <div className="glass-card rounded-2xl p-4 text-center text-xs border border-white/5 bg-white/1">
          <p className="text-gray-400">
            💡 **Developer Sandbox**: Credentials pre-loaded. Click **"Establish Connection"** or **"Google Identity"** to initialize state.
          </p>
        </div>

      </div>
    </div>
  );
}
