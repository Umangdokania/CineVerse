import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { moviesData } from '../data/movies';
import { 
  Bookmark, CheckCircle, Heart, Play, 
  Trash2, Star, Eye, Plus, ChevronRight, LayoutGrid 
} from 'lucide-react';

export default function Watchlist() {
  const { user, updateWatchlist } = useAuth();
  const { accent } = useTheme();
  const navigate = useNavigate();

  // Active Category State
  const [activeTab, setActiveTab] = useState('wantToWatch');

  const tabs = [
    { id: 'wantToWatch', name: 'Want to Watch', icon: Bookmark },
    { id: 'watching', name: 'Watching', icon: Play },
    { id: 'completed', name: 'Completed', icon: CheckCircle },
    { id: 'favorites', name: 'Favorites', icon: Heart },
  ];

  // Resolve movies under active category
  const activeMovies = useMemo(() => {
    const listIds = user?.watchlist?.[activeTab] || [];
    return moviesData.filter(movie => listIds.includes(movie.id));
  }, [user, activeTab]);

  const handleRemove = (e, movieId) => {
    e.stopPropagation();
    updateWatchlist(movieId, activeTab, 'remove');
  };

  const handleMoveToWatching = (e, movieId) => {
    e.stopPropagation();
    // Remove from Want to Watch
    updateWatchlist(movieId, 'wantToWatch', 'remove');
    // Add to Watching
    updateWatchlist(movieId, 'watching', 'add');
  };

  const handleMoveToCompleted = (e, movieId) => {
    e.stopPropagation();
    // Remove from Watching
    updateWatchlist(movieId, 'watching', 'remove');
    // Add to Completed
    updateWatchlist(movieId, 'completed', 'add');
  };

  const accentColor = accent === 'purple' ? 'brand-purple' : 'brand-cyan';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const bgAccent = accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan text-black';
  const borderAccent = accent === 'purple' ? 'border-brand-purple/20' : 'border-brand-cyan/20';

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Bookmark className={`h-7 w-7 ${textAccent}`} /> My CineVerse Library
        </h1>
        <p className="text-gray-400 mt-1">
          Organize, track, and sync your cinematic watchlists, logs, and favorites.
        </p>
      </div>

      {/* Tabs Header Grid */}
      <div className="flex border-b border-white/5 overflow-x-auto pb-px scrollbar-none">
        <div className="flex gap-6">
          {tabs.map(tab => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 py-4 text-sm font-semibold transition shrink-0 cursor-pointer ${
                  isActive
                    ? accent === 'purple' 
                      ? 'border-brand-purple text-brand-purple' 
                      : 'border-brand-cyan text-brand-cyan'
                    : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                <TabIcon className="h-4.5 w-4.5" />
                <span>{tab.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive 
                    ? accent === 'purple' ? 'bg-brand-purple/10 text-brand-purple' : 'bg-brand-cyan/10 text-brand-cyan'
                    : 'bg-white/5 text-gray-500'
                }`}>
                  {user?.watchlist?.[tab.id]?.length || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Movie Grid */}
      {activeMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeMovies.map(movie => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full border border-white/5 group relative"
            >
              {/* Poster frame */}
              <div className="relative aspect-[2/3] overflow-hidden bg-black">
                <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 via-transparent to-transparent opacity-80" />

                {/* Star rating overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[10px] font-bold text-white">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>{movie.rating}</span>
                </div>
              </div>

              {/* Title Content */}
              <div className="p-4 bg-dark-card flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-white group-hover:text-brand-purple transition truncate">
                    {movie.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {movie.year} • {movie.duration}
                  </p>

                  {/* Watching category progress meter */}
                  {activeTab === 'watching' && (
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>{movie.remainingTime || 'Progress'}</span>
                        <span>{movie.progress || 50}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'}`} 
                          style={{ width: `${movie.progress || 50}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Controls for Category */}
                <div className="flex justify-between items-center gap-2 mt-4 pt-3 border-t border-white/5">
                  <button
                    onClick={(e) => handleRemove(e, movie.id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition"
                    title="Remove from list"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  {/* Move to next stage button */}
                  {activeTab === 'wantToWatch' && (
                    <button
                      onClick={(e) => handleMoveToWatching(e, movie.id)}
                      className={`flex items-center gap-1 text-[10px] font-extrabold px-3 py-1.5 rounded-lg ${bgAccent} hover:opacity-90 transition`}
                    >
                      <Play className="h-3 w-3 fill-current" /> Start Watching
                    </button>
                  )}

                  {activeTab === 'watching' && (
                    <button
                      onClick={(e) => handleMoveToCompleted(e, movie.id)}
                      className={`flex items-center gap-1 text-[10px] font-extrabold px-3 py-1.5 rounded-lg bg-green-500 text-black hover:opacity-90 transition`}
                    >
                      <CheckCircle className="h-3 w-3" /> Finish
                    </button>
                  )}

                  {activeTab === 'completed' && (
                    <span className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" /> Completed
                    </span>
                  )}

                  {activeTab === 'favorites' && (
                    <span className="text-[10px] text-red-400 font-bold flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 fill-current" /> Favorited
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card rounded-3xl p-12 text-center border border-white/5 max-w-xl mx-auto">
          <Bookmark className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">List is empty</h3>
          <p className="text-sm text-gray-400 mb-6">
            There are no movies saved in your "{tabs.find(t => t.id === activeTab).name}" collection yet.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className={`rounded-xl px-5 py-2.5 text-xs font-bold ${bgAccent} hover:opacity-95 transition`}
          >
            Find movies to add
          </button>
        </div>
      )}

    </div>
  );
}
