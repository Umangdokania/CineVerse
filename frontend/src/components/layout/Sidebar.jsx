import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Film, Bookmark, Tv, Sparkles, User, 
  Settings, ChevronLeft, ChevronRight, HelpCircle
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { accent } = useTheme();
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Movie Catalog', path: '/catalog', icon: Film },
    { name: 'Watchlist', path: '/watchlist', icon: Bookmark },
    { name: 'Virtual Room', path: '/room', icon: Tv },
    { name: 'Mood Recommendations', path: '/mood', icon: Sparkles },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  // Include Admin Dashboard link if user is administrator
  if (user && user.role === 'Administrator') {
    navItems.push({ name: 'Admin Dashboard', path: '/admin', icon: Settings });
  }

  const activeClass = accent === 'purple' 
    ? 'bg-brand-purple/15 text-brand-purple border-r-2 border-brand-purple' 
    : 'bg-brand-cyan/15 text-brand-cyan border-r-2 border-brand-cyan';

  return (
    <>
      {/* Sidebar for Desktop / Large Screens */}
      <aside 
        className={`fixed bottom-0 top-16 left-0 z-40 hidden flex-col border-r border-white/5 bg-dark-bg/40 backdrop-blur-xl transition-all duration-300 md:flex ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-1 flex-col justify-between py-4">
          <nav className="space-y-1.5 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white ${
                    isActive ? activeClass : ''
                  }`
                }
                title={item.name}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'}`}>
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Collapse Toggle Button */}
          <div className="px-3 border-t border-white/5 pt-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition"
            >
              {isOpen ? <ChevronLeft className="h-5 w-5 shrink-0" /> : <ChevronRight className="h-5 w-5 shrink-0" />}
              <span className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'}`}>
                Collapse Menu
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Navigation for Mobile Screens (Bottom Navigation Bar) */}
      <nav className="glass-panel fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-white/5 px-2 md:hidden">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-medium text-gray-400 transition ${
                isActive 
                  ? accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan'
                  : ''
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name.split(' ')[0]}</span>
          </NavLink>
        ))}
        {/* Mobile Profile Icon */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium text-gray-400 transition ${
              isActive 
                ? accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan'
                : ''
            }`
          }
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
}
