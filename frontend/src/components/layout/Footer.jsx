import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { accent } = useTheme();

  return (
    <footer className="w-full border-t border-white/5 bg-dark-bg/20 py-6 text-center text-xs text-gray-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} CineVerse AI+ Inc. All rights reserved.
        </div>
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full animate-ping ${accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'}`} />
            <span className="text-gray-400">All Systems Operational</span>
          </span>
          <span className="text-white/10">|</span>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Docs</a>
        </div>
      </div>
    </footer>
  );
}
