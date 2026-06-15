import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { moviesData, genresList, languagesList } from '../data/movies';
import { Search, SlidersHorizontal, Star, Film, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';

export default function MovieCatalog() {
  const { user, updateWatchlist } = useAuth();
  const { accent } = useTheme();
  const navigate = useNavigate();

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Watchlist check
  const isMovieInWatchlist = (movieId) => {
    return user?.watchlist?.wantToWatch?.includes(movieId) || false;
  };

  const handleWatchlistToggle = (e, movieId) => {
    e.stopPropagation();
    const action = isMovieInWatchlist(movieId) ? 'remove' : 'add';
    updateWatchlist(movieId, 'wantToWatch', action);
  };

  // Perform filtering and sorting
  const filteredAndSortedMovies = useMemo(() => {
    let result = [...moviesData];

    // Text search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.director.toLowerCase().includes(q) ||
        m.cast.some(c => c.name.toLowerCase().includes(q))
      );
    }

    // Genre Filter
    if (selectedGenre !== 'All') {
      result = result.filter(m => m.genres.includes(selectedGenre));
    }

    // Language Filter
    if (selectedLanguage !== 'All') {
      result = result.filter(m => m.language.toLowerCase().includes(selectedLanguage.toLowerCase()));
    }

    // Rating Filter
    if (minRating > 0) {
      result = result.filter(m => m.rating >= minRating);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [searchQuery, selectedGenre, selectedLanguage, minRating, sortBy]);

  // Pagination calculations
  const totalItems = filteredAndSortedMovies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedMovies.slice(start, start + itemsPerPage);
  }, [filteredAndSortedMovies, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const accentColor = accent === 'purple' ? 'brand-purple' : 'brand-cyan';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const borderAccent = accent === 'purple' ? 'border-brand-purple/20' : 'border-brand-cyan/20';
  const highlightPurple = accent === 'purple' ? 'border-brand-purple/40' : 'border-brand-cyan/40';

  return (
    <div className="space-y-8 animate-fade-in pb-16 relative">
      
      {/* Background spotlight */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-cyan/3 blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Film className={`h-7 w-7 ${textAccent}`} /> CineVerse Catalog
        </h1>
        <p className="text-gray-400 mt-1">
          Explore and filter our database of over 10,000+ AI-analyzed motion pictures.
        </p>
      </div>

      {/* Filter and Search Panel with double border glassmorphism */}
      <div className="glass-card apple-border rounded-3xl p-6 space-y-6">
        
        {/* Top search and sort */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute top-3.5 left-4.5 h-4.5 w-4.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search title, director, actor..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full rounded-xl border border-white/5 bg-white/3 py-3 pr-4 pl-12 text-xs text-white placeholder-gray-500 outline-none transition focus:border-${accentColor}/50 focus:bg-white/5`}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto items-center justify-end">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider hidden sm:inline">Sort Order:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/3 border border-white/5 rounded-xl px-3 py-3 text-xs text-white outline-none cursor-pointer hover:bg-white/8 transition"
            >
              <option value="rating-desc" className="bg-dark-card text-white">IMDb Rating (High-Low)</option>
              <option value="year-desc" className="bg-dark-card text-white">Release Year (New-Old)</option>
              <option value="year-asc" className="bg-dark-card text-white">Release Year (Old-New)</option>
              <option value="title-asc" className="bg-dark-card text-white">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
          
          {/* Genre filter (glows when active) */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full bg-white/3 border ${selectedGenre !== 'All' ? highlightPurple : 'border-white/5'} rounded-xl px-3 py-2.5 text-xs text-white outline-none cursor-pointer focus:border-${accentColor}/50`}
            >
              {genresList.map(genre => (
                <option key={genre} value={genre} className="bg-dark-card text-white">{genre}</option>
              ))}
            </select>
          </div>

          {/* Language filter (glows when active) */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full bg-white/3 border ${selectedLanguage !== 'All' ? highlightPurple : 'border-white/5'} rounded-xl px-3 py-2.5 text-xs text-white outline-none cursor-pointer focus:border-${accentColor}/50`}
            >
              {languagesList.map(lang => (
                <option key={lang} value={lang} className="bg-dark-card text-white">{lang}</option>
              ))}
            </select>
          </div>

          {/* Rating filter */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">
              Min Rating ({minRating === 0 ? 'Any' : `${minRating}+`})
            </label>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="range"
                min="0"
                max="9"
                step="0.5"
                value={minRating}
                onChange={(e) => {
                  setMinRating(parseFloat(e.target.value));
                  setCurrentPage(1);
                }}
                className={`w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-${accentColor}`}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('All');
                setSelectedLanguage('All');
                setMinRating(0);
                setSortBy('rating-desc');
                setCurrentPage(1);
              }}
              className="w-full text-center text-xs font-bold uppercase tracking-wider bg-white/3 border border-white/5 hover:bg-white/8 text-gray-400 hover:text-white py-3 rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>

        </div>

      </div>

      {/* Grid of Movie Cards */}
      {paginatedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedMovies.map(movie => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full border border-white/5 group relative"
            >
              {/* Poster frame */}
              <div className="relative aspect-[2/3] overflow-hidden bg-black">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-102" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card/95 via-transparent to-transparent opacity-80" />
                
                {/* Watchlist Toggle */}
                <button
                  onClick={(e) => handleWatchlistToggle(e, movie.id)}
                  className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10 hover:bg-black/90 transition duration-300"
                  title={isMovieInWatchlist(movie.id) ? 'Remove Watchlist' : 'Add Watchlist'}
                >
                  <Bookmark className={`h-4 w-4 ${
                    isMovieInWatchlist(movie.id) 
                      ? accent === 'purple' ? 'fill-brand-purple text-brand-purple' : 'fill-brand-cyan text-brand-cyan' 
                      : 'text-gray-400'
                  }`} />
                </button>

                {/* Rating Overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 text-[10px] font-bold text-white shadow-lg">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{movie.rating}</span>
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-4 bg-[#0d0d12]/90 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-white group-hover:text-brand-purple transition truncate">
                    {movie.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {movie.year} • {movie.duration} • {movie.language}
                  </p>
                </div>
                <div className="flex gap-1.5 flex-wrap mt-4">
                  {movie.genres.slice(0, 3).map(g => (
                    <span key={g} className="text-[8px] font-bold bg-white/5 border border-white/5 px-2.5 py-0.5 rounded text-gray-400 uppercase tracking-wider">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card rounded-3xl p-12 text-center border border-white/5">
          <SlidersHorizontal className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Movies Found</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            We couldn't find any films matching your search terms or filter combinations. Try resetting some filters or searching for something else.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-4">
          <span className="text-xs text-gray-500 font-medium">
            Page <strong className="text-white font-bold">{currentPage}</strong> of <strong className="text-white font-bold">{totalPages}</strong> ({totalItems} records)
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400 hover:bg-white/10 hover:text-white transition disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400 hover:bg-white/10 hover:text-white transition disabled:opacity-40 cursor-pointer"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
