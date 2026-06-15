import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { moviesData } from '../data/movies';
import { 
  Star, Play, Bookmark, BookmarkCheck, Users, 
  Send, Sparkles, ArrowLeft, Clock, MessageSquare, ShieldAlert
} from 'lucide-react';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateWatchlist, addReview } = useAuth();
  const { accent } = useTheme();

  // Find target movie
  const movie = useMemo(() => {
    return moviesData.find(m => m.id === id) || moviesData[0];
  }, [id]);

  // Review states
  const [reviewsList, setReviewsList] = useState(movie.reviews);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(10);
  
  // Watchlist check
  const isInWatchlist = useMemo(() => {
    return user?.watchlist?.wantToWatch?.includes(movie.id) || false;
  }, [user, movie.id]);

  const handleWatchlistToggle = () => {
    const action = isInWatchlist ? 'remove' : 'add';
    updateWatchlist(movie.id, 'wantToWatch', action);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newReview = {
      id: `r-new-${Date.now()}`,
      user: user?.name || 'Anonymous User',
      rating: newReviewRating,
      text: newReviewText,
      date: 'Just now',
      avatarUrl: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };

    setReviewsList([newReview, ...reviewsList]);
    addReview(movie.id, newReview);
    setNewReviewText('');
    setNewReviewRating(10);
  };

  const recommendations = useMemo(() => {
    return moviesData
      .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
      .slice(0, 2);
  }, [movie.id, movie.genres]);

  const accentColor = accent === 'purple' ? 'brand-purple' : 'brand-cyan';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const bgAccent = accent === 'purple' ? 'btn-neon-purple' : 'btn-neon-cyan';
  const borderAccent = accent === 'purple' ? 'border-brand-purple/20' : 'border-brand-cyan/20';

  return (
    <div className="space-y-8 animate-fade-in pb-16 relative">
      
      {/* Background spotlights */}
      <div className="absolute top-0 right-[-100px] w-96 h-96 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />

      {/* Back navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Database
      </button>

      {/* Large Movie Banner */}
      <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[21/7] border border-white/5 shadow-2xl bg-black">
        <img 
          src={movie.bannerUrl} 
          alt={movie.title} 
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        {/* Layered vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/85 via-dark-bg/10 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Text Overlay */}
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 flex flex-col justify-end">
          <div className="flex gap-2 mb-3">
            {movie.genres.map(g => (
              <span key={g} className="bg-black/60 text-white/90 border border-white/10 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                {g}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none mb-3">
            {movie.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl hidden md:block">
            {movie.synopsis}
          </p>
        </div>
      </div>

      {/* Two Columns Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main info card */}
          <div className="glass-card apple-border rounded-3xl p-6 flex flex-col sm:flex-row gap-6">
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="h-60 w-40 sm:h-72 sm:w-48 rounded-2xl object-cover self-center sm:self-start border border-white/10 shadow-lg"
            />
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">{movie.director}</span>
                <h2 className="text-2xl font-black text-white mt-1">{movie.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                  <span>•</span>
                  <span>{movie.language}</span>
                </div>
                
                <p className="text-xs text-gray-400 mt-4 leading-relaxed sm:hidden block">
                  {movie.synopsis}
                </p>
                
                <p className="text-xs text-gray-400 mt-4 leading-relaxed sm:block hidden">
                  {movie.synopsis}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                
                <button
                  onClick={handleWatchlistToggle}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer ${
                    isInWatchlist 
                      ? `bg-${accentColor}/10 border-${accentColor}/30 text-${accentColor}`
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {isInWatchlist ? (
                    <>
                      <BookmarkCheck className="h-4 w-4" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" />
                      Add to Watchlist
                    </>
                  )}
                </button>

                <Link
                  to="/room"
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer ${bgAccent}`}
                >
                  <Users className="h-4 w-4" />
                  Join Room
                </Link>

              </div>
            </div>
          </div>

          {/* Cast Members Rounded Apple Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white tracking-tight">Principal Cast</h3>
            <div className="grid grid-cols-3 gap-4">
              {movie.cast.map(actor => (
                <div key={actor.name} className="glass-card rounded-2xl p-4 border border-white/5 text-center flex flex-col items-center group hover:border-white/15 transition duration-300">
                  <img src={actor.imageUrl} alt={actor.name} className="h-16 w-16 rounded-full object-cover border border-white/15 mb-3 group-hover:scale-105 transition" />
                  <span className="text-xs font-bold text-white block truncate w-full">{actor.name}</span>
                  <span className="text-[10px] text-gray-500 block truncate w-full mt-0.5">{actor.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Reviews Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white tracking-tight">Community Reviews</h3>
            
            {/* Review submission Form */}
            <form onSubmit={handleAddReview} className="glass-card apple-border rounded-3xl p-5 space-y-4">
              <span className="text-xs font-bold text-white uppercase tracking-widest block">Write Review</span>
              <div className="relative">
                <textarea
                  rows="3"
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share your analytical thoughts on this film..."
                  className={`w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 outline-none transition focus:border-${accentColor}/50 focus:bg-white/10 resize-none`}
                />
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Score:</span>
                  <select 
                    value={newReviewRating} 
                    onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                    className="bg-white/5 border border-white/10 text-xs text-white rounded px-2 py-0.5 outline-none cursor-pointer"
                  >
                    {[10,9,8,7,6,5,4,3,2,1].map(r => (
                      <option key={r} value={r} className="bg-dark-card text-white">{r} ★</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className={`flex items-center gap-1.5 rounded-xl text-xs font-bold uppercase tracking-wider px-4 py-2 transition cursor-pointer ${bgAccent}`}
                >
                  <Send className="h-3.5 w-3.5" /> Submit Review
                </button>
              </div>
            </form>

            {/* List reviews */}
            <div className="space-y-4">
              {reviewsList.map(review => (
                <div key={review.id} className="glass-card rounded-2xl p-5 border border-white/5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={review.avatarUrl} alt={review.user} className="h-8 w-8 rounded-full object-cover border border-white/10" />
                      <div>
                        <span className="text-xs font-bold text-white block">{review.user}</span>
                        <span className="text-[9px] text-gray-500 block">{review.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20 text-[10px] font-bold text-amber-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{review.rating}/10</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed pl-11">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Rating Histogram */}
          <div className="glass-card rounded-3xl p-5 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">Ratings Distribution</h3>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-extrabold text-white">{movie.rating}</span>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(star => (
                    <Star 
                      key={star} 
                      className={`h-4.5 w-4.5 ${
                        star <= Math.round(movie.rating / 2) 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-gray-600'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 block">{movie.votes} ratings logged</span>
              </div>
            </div>

            {/* Simulated Histogram */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="w-10">9-10 ★</span>
                <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '65%' }} />
                </div>
                <span className="w-6 text-right">65%</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="w-10">7-8 ★</span>
                <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400/80 h-full rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="w-6 text-right">25%</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="w-10">5-6 ★</span>
                <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400/40 h-full rounded-full" style={{ width: '8%' }} />
                </div>
                <span className="w-6 text-right">8%</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="w-10">1-4 ★</span>
                <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400/10 h-full rounded-full" style={{ width: '2%' }} />
                </div>
                <span className="w-6 text-right">2%</span>
              </div>
            </div>
          </div>

          {/* Quick Movie Facts */}
          <div className="glass-card rounded-3xl p-5 border border-white/5 space-y-3.5 shadow-lg">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">Technical Details</h3>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-semibold">Director</span>
              <span className="text-white text-right font-medium">{movie.director}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-semibold">Duration</span>
              <span className="text-white text-right font-medium">{movie.duration}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-semibold">Language</span>
              <span className="text-white text-right font-medium">{movie.language}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-semibold">Release Year</span>
              <span className="text-white text-right font-medium">{movie.year}</span>
            </div>
          </div>

          {/* AI Recommended Related Movies */}
          {recommendations.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className={`h-4.5 w-4.5 ${textAccent}`} /> Related AI Suggestions
              </h3>
              
              <div className="space-y-4">
                {recommendations.map(recMovie => (
                  <div 
                    key={recMovie.id}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigate(`/movie/${recMovie.id}`);
                    }}
                    className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer flex border border-white/5 group shadow-lg"
                  >
                    <img src={recMovie.posterUrl} alt={recMovie.title} className="w-20 object-cover border-r border-white/5" />
                    <div className="p-3.5 flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-brand-purple transition truncate">
                          {recMovie.title}
                        </h4>
                        <span className="text-[9px] text-gray-500 block mt-1">{recMovie.year} • {recMovie.rating} ★</span>
                      </div>
                      <div className="flex gap-1 flex-wrap mt-2">
                        {recMovie.genres.slice(0, 2).map(g => (
                          <span key={g} className="text-[8px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-gray-400">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
