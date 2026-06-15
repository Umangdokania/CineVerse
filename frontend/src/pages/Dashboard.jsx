import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { moviesData } from '../data/movies';
import { 
  Play, Sparkles, TrendingUp, Tv, Clock, 
  ChevronLeft, ChevronRight, Star, Bookmark, Calendar, ArrowRight, ShieldCheck
} from 'lucide-react';

export default function Dashboard() {
  const { user, updateWatchlist } = useAuth();
  const { accent } = useTheme();
  const navigate = useNavigate();
  
  const trendingScrollRef = useRef(null);

  // Group movies
  const trendingMovies = moviesData.filter(m => m.isTrending);
  const aiRecMovies = moviesData.filter(m => m.isAIRecommended);
  const continueWatching = moviesData.filter(m => m.isContinueWatching);
  const recentlyViewed = moviesData.filter(m => m.isRecentlyViewed);

  // Spotlight movie (Featured Hero: Dune Part Two)
  const spotlightMovie = moviesData.find(m => m.id === 'm4') || moviesData[0];

  const scrollCarousel = (direction) => {
    if (trendingScrollRef.current) {
      const { scrollLeft, clientWidth } = trendingScrollRef.current;
      const offset = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      trendingScrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const themeBtnColor = accent === 'purple' ? 'btn-neon-purple' : 'btn-neon-cyan';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const bgAccentText = accent === 'purple' ? 'bg-brand-purple/10 text-brand-purple' : 'bg-brand-cyan/10 text-brand-cyan';
  const borderAccent = accent === 'purple' ? 'border-brand-purple/20' : 'border-brand-cyan/20';
  const accentColor = accent === 'purple' ? 'brand-purple' : 'brand-cyan';

  return (
    <div className="space-y-12 relative pb-16">
      
      {/* Background Ambient Spotlight Orbs */}
      <div className="absolute top-[-100px] right-[-50px] w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none animate-ambient-pulse" />
      <div className="absolute top-[400px] left-[-100px] w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none animate-ambient-pulse" style={{ animationDelay: '5s' }} />

      {/* Cinematic Spotlight Spotlight Hero Section */}
      <div className="relative rounded-3xl overflow-hidden aspect-[21/10] sm:aspect-[21/8] border border-white/5 shadow-2xl flex flex-col justify-end p-6 sm:p-10 group bg-black">
        {/* Banner image with smooth vignetting */}
        <img 
          src={spotlightMovie.bannerUrl} 
          alt={spotlightMovie.title} 
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-1000 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/30 to-transparent" />

        {/* Personalized greeting floating at top-left of Hero */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2">
          <span className="text-[10px] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-gray-300 font-bold uppercase tracking-wider">
            👤 {getGreeting()}, {user?.name || 'Cinephile'}
          </span>
          <span className="text-[9px] bg-brand-gold/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-brand-gold/30 text-brand-gold font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
            <Sparkles className="h-3 w-3 fill-current" /> AI+ VIP Pro
          </span>
        </div>

        {/* Spotlight Hero Text content */}
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${textAccent}`}>Featured Masterpiece</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            {spotlightMovie.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl hidden md:block">
            {spotlightMovie.synopsis}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-400">
            <span className="flex items-center gap-1 bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-lg border border-amber-400/20">
              <Star className="h-3 w-3 fill-current" /> {spotlightMovie.rating}
            </span>
            <span>{spotlightMovie.year}</span>
            <span>•</span>
            <span>{spotlightMovie.duration}</span>
            <span>•</span>
            <span className="text-white/80">{spotlightMovie.genres.join(' / ')}</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate(`/movie/${spotlightMovie.id}`)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition duration-300 cursor-pointer ${themeBtnColor}`}
            >
              <Play className="h-4 w-4 fill-current" /> Sync Room Watch
            </button>
            <button
              onClick={() => navigate(`/movie/${spotlightMovie.id}`)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition duration-300 cursor-pointer"
            >
              View Synopsis
            </button>
          </div>
        </div>
      </div>

      {/* Quick Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        
        <div className="glass-card apple-border rounded-2xl p-5 flex items-center gap-4">
          <div className="rounded-xl p-3 bg-brand-purple/10 text-brand-purple">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Watch Duration</span>
            <span className="text-xl font-extrabold text-white block mt-0.5">{user?.stats?.hoursWatched || 0} hrs</span>
            <span className="text-[9px] text-green-400 font-bold flex items-center gap-0.5 mt-0.5">
              +8.4h this week
            </span>
          </div>
        </div>

        <div className="glass-card apple-border rounded-2xl p-5 flex items-center gap-4">
          <div className="rounded-xl p-3 bg-brand-cyan/10 text-brand-cyan">
            <Tv className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Sync Sessions</span>
            <span className="text-xl font-extrabold text-white block mt-0.5">{user?.stats?.roomsHosted || 0} syncs</span>
            <span className="text-[9px] text-brand-cyan font-bold flex items-center gap-0.5 mt-0.5">
              1 invite pending
            </span>
          </div>
        </div>

        <div className="glass-card apple-border rounded-2xl p-5 flex items-center gap-4">
          <div className="rounded-xl p-3 bg-brand-gold/10 text-brand-gold">
            <Star className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Critiques</span>
            <span className="text-xl font-extrabold text-white block mt-0.5">{user?.stats?.reviewsWritten || 0} reviews</span>
            <span className="text-[9px] text-brand-gold font-bold flex items-center gap-0.5 mt-0.5">
              Top 5% critic
            </span>
          </div>
        </div>

        <div className="glass-card apple-border rounded-2xl p-5 flex items-center gap-4">
          <div className="rounded-xl p-3 bg-red-500/10 text-red-500">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Active Streak</span>
            <span className="text-xl font-extrabold text-white block mt-0.5">{user?.stats?.activeDays || 0} Days</span>
            <span className="text-[9px] text-red-400 font-bold flex items-center gap-0.5 mt-0.5">
              Marathon level
            </span>
          </div>
        </div>

      </div>

      {/* Trending Cinema Carousel Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <TrendingUp className={`h-5 w-5 ${textAccent}`} /> Trending Cinema
            </h2>
            <p className="text-[10px] text-gray-500">Global logs watched inside the CineVerse ecosystem</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollCarousel('left')} 
              className="rounded-full border border-white/10 bg-white/5 p-1.5 text-gray-400 hover:bg-white/15 hover:text-white transition cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={() => scrollCarousel('right')} 
              className="rounded-full border border-white/10 bg-white/5 p-1.5 text-gray-400 hover:bg-white/15 hover:text-white transition cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div 
          ref={trendingScrollRef}
          className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {trendingMovies.map((movie) => (
            <div 
              key={movie.id}
              className="relative min-w-[280px] sm:min-w-[380px] h-[180px] sm:h-[200px] rounded-2xl overflow-hidden snap-start group cursor-pointer border border-white/5 shadow-lg"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img 
                src={movie.bannerUrl} 
                alt={movie.title} 
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-102" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-tight leading-tight">{movie.title}</h3>
                  <p className="text-[10px] text-gray-300">{movie.year} • {movie.duration} • {movie.genres.join('/')}</p>
                </div>
                
                <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-lg border border-white/10">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold text-white">{movie.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Watching Section */}
      {continueWatching.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Tv className={`h-5 w-5 ${textAccent}`} /> Continue Watching
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueWatching.map(movie => (
              <div 
                key={movie.id} 
                className="glass-card apple-border rounded-2xl p-4 flex gap-4 items-center relative overflow-hidden group hover:border-white/15 transition cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img src={movie.posterUrl} alt={movie.title} className="h-16 w-12 rounded-xl object-cover border border-white/10" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-white truncate">{movie.title}</h3>
                  <div className="text-[10px] text-gray-400 mt-1 flex justify-between">
                    <span>{movie.remainingTime}</span>
                    <span>{movie.progress}%</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full ${accent === 'purple' ? 'bg-brand-purple shadow-lg shadow-brand-purple/50' : 'bg-brand-cyan shadow-lg shadow-brand-cyan/50'}`} 
                      style={{ width: `${movie.progress}%` }} 
                    />
                  </div>
                </div>
                <button 
                  className={`rounded-full p-2 bg-${accentColor} text-${accent === 'purple' ? 'white' : 'black'} scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition duration-300`}
                >
                  <Play className="h-4.5 w-4.5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid: AI Recommendations & Recently Viewed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: AI Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <Sparkles className={`h-5 w-5 ${textAccent}`} /> Neural AI Recommendations
              </h2>
              <p className="text-[10px] text-gray-500">Refined matches based on your recent watching behavior</p>
            </div>
            <Link to="/catalog" className={`text-xs font-semibold text-${accentColor} hover:underline`}>
              Browse catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aiRecMovies.map(movie => (
              <div 
                key={movie.id} 
                className="glass-card glass-card-hover rounded-3xl overflow-hidden cursor-pointer flex flex-col border border-white/5 shadow-xl"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={movie.bannerUrl} alt={movie.title} className="h-full w-full object-cover group-hover:scale-101 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/25 to-transparent" />
                  <span className={`absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/15 text-white text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full`}>
                    ✨ MATCH Vector 99.8%
                  </span>
                </div>
                <div className="p-4 bg-[#0d0d12]/90 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-sm text-white">{movie.title}</h3>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-bold text-white">{movie.rating}</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-gray-500">{movie.year} • {movie.duration} • {movie.genres.join(' / ')}</p>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Recently Viewed */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Clock className={`h-5 w-5 ${textAccent}`} /> Recently Logged
          </h2>

          <div className="glass-card rounded-3xl p-5 border border-white/5 space-y-4 shadow-xl">
            {recentlyViewed.map((movie, index) => (
              <div 
                key={movie.id} 
                className="flex gap-3 items-center group cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img src={movie.posterUrl} alt={movie.title} className="h-12 w-9 rounded-xl object-cover border border-white/10" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-brand-purple transition">
                    {movie.title}
                  </h4>
                  <p className="text-[9px] text-gray-500 mt-0.5">{movie.genres.slice(0, 2).join(' / ')}</p>
                </div>
                <span className="text-[8px] font-semibold text-gray-600 bg-white/3 border border-white/5 px-2 py-0.5 rounded-lg shrink-0 self-start mt-0.5">
                  {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : '3d ago'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
