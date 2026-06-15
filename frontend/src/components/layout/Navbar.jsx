import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { moviesData } from '../../data/movies';
import { 
  Search, Bell, Sparkles, User, LogOut, ChevronDown, 
  Tv, Film, Settings, Palette, Eye
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { accent, toggleAccent } = useTheme();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sarah Connor invited you to room: 'Interstellar Deep-Space Sync'", time: "Just now", unread: true, link: "/room" },
    { id: 2, text: "AI Recommendation: We found 3 movies matching your 'Cosmic' mood", time: "10m ago", unread: true, link: "/mood" },
    { id: 3, text: "Your review on Parasite has received 14 likes", time: "2h ago", unread: false, link: "/profile" }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Global search filtering
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = moviesData.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setSearchResults(filtered.slice(0, 5));
  }, [searchQuery]);

  // Click outside to close menus
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchQuery('');
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleSearchResultClick = (movieId) => {
    setSearchQuery('');
    navigate(`/movie/${movieId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-dark-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5 font-black text-xl tracking-wider select-none">
            <span className="text-white">CINE</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold text-black uppercase animate-pulse-glow ${
              accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'
            }`}>
              VERSE AI+
            </span>
          </Link>
        </div>

        {/* Global Search Everywhere */}
        <div ref={searchRef} className="relative hidden w-full max-w-md mx-8 sm:block">
          <div className="relative">
            <Search className="absolute top-2.5 left-3.5 h-4.5 w-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies, genres, cast..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pr-4 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all focus:border-brand-purple/50 focus:bg-white/10 focus:ring-1 focus:ring-brand-purple/50"
            />
          </div>

          {/* Search Dropdown Results */}
          {searchResults.length > 0 && (
            <div className="glass-card absolute top-12 left-0 w-full rounded-2xl p-2 shadow-2xl">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400">Search Results</div>
              <div className="space-y-1">
                {searchResults.map(movie => (
                  <button
                    key={movie.id}
                    onClick={() => handleSearchResultClick(movie.id)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-white/5 transition"
                  >
                    <img src={movie.posterUrl} alt={movie.title} className="h-10 w-8 rounded object-cover" />
                    <div>
                      <div className="text-sm font-medium text-white">{movie.title}</div>
                      <div className="text-xs text-gray-400">{movie.year} • {movie.genres.join(', ')}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          
          {/* Theme/Accent Changer */}
          <button
            onClick={toggleAccent}
            title="Toggle Accent Color"
            className="rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition"
          >
            <Palette className={`h-5 w-5 ${accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan'}`} />
          </button>

          {/* AI Mood Indicator */}
          <Link
            to="/mood"
            title="Get AI Mood Recommendations"
            className="flex items-center gap-1.5 rounded-full bg-brand-purple/10 px-3 py-1 text-xs font-medium text-brand-purple border border-brand-purple/20 hover:bg-brand-purple/20 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden md:inline">AI Moods</span>
          </Link>

          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="glass-card absolute right-0 top-11 w-80 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-brand-purple hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {notifications.map(notif => (
                    <Link
                      key={notif.id}
                      to={notif.link}
                      onClick={() => {
                        setShowNotifications(false);
                        setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                      }}
                      className={`flex flex-col gap-1 rounded-lg p-2 transition hover:bg-white/5 ${
                        notif.unread ? 'bg-white/2' : ''
                      }`}
                    >
                      <div className="text-xs text-gray-200">{notif.text}</div>
                      <div className="text-[10px] text-gray-500">{notif.time}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Info Dropdown */}
          {user && (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-white/5 transition"
              >
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full border border-white/20 object-cover" />
                <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
              </button>

              {showProfileMenu && (
                <div className="glass-card absolute right-0 top-11 w-56 rounded-2xl p-2 shadow-2xl">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
                    >
                      <User className="h-4 w-4" /> My Profile
                    </Link>
                    <Link
                      to="/admin"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
                    >
                      <Settings className="h-4 w-4" /> Admin Panel
                    </Link>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                    >
                      <LogOut className="h-4 w-4" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
