import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { moviesData } from '../data/movies';
import { 
  User, Award, BarChart3, Clock, Sparkles, 
  Tv, Star, Film, CheckCircle, ShieldAlert 
} from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { accent } = useTheme();

  // Watch history resolved from moviesData
  const watchHistory = useMemo(() => {
    // Return continue watching and recently viewed movies as history
    return moviesData.filter(m => m.isRecentlyViewed || m.isContinueWatching);
  }, []);

  const achievementsList = user?.achievements || [];

  const accentColor = accent === 'purple' ? 'brand-purple' : 'brand-cyan';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const borderAccent = accent === 'purple' ? 'border-brand-purple/20' : 'border-brand-cyan/20';

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Profile Header Banner */}
      <div className="glass-card rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
        <div className={`h-24 bg-gradient-to-r ${
          accent === 'purple' ? 'from-brand-purple/30 to-violet-800/10' : 'from-brand-cyan/30 to-blue-800/10'
        }`} />
        
        {/* User Card */}
        <div className="p-6 pt-0 flex flex-col sm:flex-row gap-5 items-center sm:items-end -mt-10 relative z-10 border-b border-white/5 pb-6">
          <img 
            src={user?.avatar} 
            alt={user?.name} 
            className="h-20 w-20 rounded-full border-4 border-dark-bg object-cover shadow-2xl"
          />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-black text-white">{user?.name || 'Cinephile'}</h1>
            <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
            <div className="flex gap-2 justify-center sm:justify-start mt-3">
              <span className={`text-[9px] font-bold bg-${accentColor}/20 border border-${accentColor}/30 text-white uppercase px-2.5 py-0.5 rounded-full`}>
                {user?.role}
              </span>
              <span className="text-[9px] font-bold bg-amber-400/20 border border-amber-400/30 text-white uppercase px-2.5 py-0.5 rounded-full">
                AI+ Pro Member
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/2">
          <div className="text-center md:text-left border-r border-white/5 last:border-0">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Watch Duration</span>
            <span className="text-2xl font-black text-white block mt-1">{user?.stats?.hoursWatched}h</span>
          </div>
          <div className="text-center md:text-left border-r border-white/5 last:border-0">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Critic Reviews</span>
            <span className="text-2xl font-black text-white block mt-1">{user?.stats?.reviewsWritten}</span>
          </div>
          <div className="text-center md:text-left border-r border-white/5 last:border-0">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Rooms Synchronized</span>
            <span className="text-2xl font-black text-white block mt-1">{user?.stats?.roomsHosted}</span>
          </div>
          <div className="text-center md:text-left last:border-0">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Achievements</span>
            <span className="text-2xl font-black text-white block mt-1">
              {achievementsList.filter(a => a.unlocked).length} / {achievementsList.length}
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Left (Genres, Achievements), Right (Watch History) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Favorite Genres & Achievements) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Favorite Genres Card */}
          <div className="glass-card rounded-3xl p-5 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
              <BarChart3 className="h-4.5 w-4.5 text-gray-400" /> Favorite Genres Analytics
            </h3>
            
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">Sci-Fi & Cyberpunk</span>
                  <span className={`text-${accentColor} font-bold`}>60%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'}`} style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">Dramatic Masterpieces</span>
                  <span className={`text-${accentColor} font-bold`}>25%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'}`} style={{ width: '25%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">Action & High Stakes</span>
                  <span className={`text-${accentColor} font-bold`}>15%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'}`} style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Achievements list */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Award className={`h-5 w-5 ${textAccent}`} /> Unlocked Achievements
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievementsList.map(ach => (
                <div 
                  key={ach.id} 
                  className={`glass-card rounded-2xl p-4 border flex gap-4 items-center transition ${
                    ach.unlocked 
                      ? 'border-white/5 opacity-100' 
                      : 'border-white/2 opacity-50 bg-white/1'
                  }`}
                >
                  <span className="text-3xl p-2 bg-white/2 rounded-xl">{ach.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-normal">{ach.description}</p>
                    {ach.unlocked ? (
                      <span className="text-[8px] text-green-400 font-semibold mt-1 block">Unlocked {ach.date}</span>
                    ) : (
                      <span className="text-[8px] text-gray-500 font-semibold mt-1 block">Locked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Watch History Timeline) */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Clock className={`h-5 w-5 ${textAccent}`} /> Watch History
          </h3>

          <div className="glass-card rounded-3xl p-5 border border-white/5 space-y-5">
            {watchHistory.map((movie, index) => (
              <div key={movie.id} className="relative pl-6 last:pb-0 pb-5 border-l border-white/5 last:border-0">
                {/* Timeline node */}
                <span className={`absolute -left-1.5 top-1 h-3 w-3 rounded-full border border-black ${
                  accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'
                }`} />

                <div className="flex gap-3 items-center">
                  <img src={movie.posterUrl} alt={movie.title} className="h-12 w-9 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{movie.title}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">{movie.year} • {movie.duration}</p>
                    
                    {movie.progress > 0 && movie.progress < 100 ? (
                      <div className="mt-2">
                        <div className="w-full bg-white/10 h-1 rounded-full">
                          <div className={`h-full ${accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'}`} style={{ width: `${movie.progress}%` }} />
                        </div>
                        <span className="text-[8px] text-gray-500 mt-0.5 block">{movie.progress}% watched</span>
                      </div>
                    ) : (
                      <span className="text-[8px] text-green-400 font-semibold flex items-center gap-0.5 mt-1">
                        <CheckCircle className="h-3 w-3" /> Fully Watched
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
