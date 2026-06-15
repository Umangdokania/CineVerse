import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { moviesData } from '../data/movies';
import { Sparkles, Star, Film, Smile, Frown, Flame, Heart, Zap, Ghost, Rocket } from 'lucide-react';

export default function MoodRecommendation() {
  const { accent } = useTheme();
  const navigate = useNavigate();

  // Active Mood State
  const [selectedMood, setSelectedMood] = useState('Sci-Fi');

  const moods = [
    { id: 'Happy', label: 'Happy', emoji: '😊', icon: Smile, gradient: 'from-amber-400/20 to-yellow-500/10 border-yellow-500/30 text-yellow-400' },
    { id: 'Sad', label: 'Sad', emoji: '😢', icon: Frown, gradient: 'from-blue-500/20 to-indigo-600/10 border-blue-500/30 text-blue-400' },
    { id: 'Romantic', label: 'Romantic', emoji: '💖', icon: Heart, gradient: 'from-pink-500/20 to-rose-600/10 border-pink-500/30 text-pink-400' },
    { id: 'Motivational', label: 'Motivational', emoji: '✊', icon: Zap, gradient: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400' },
    { id: 'Action', label: 'Action', emoji: '🔥', icon: Flame, gradient: 'from-red-500/20 to-orange-600/10 border-red-500/30 text-red-400' },
    { id: 'Horror', label: 'Horror', emoji: '😱', icon: Ghost, gradient: 'from-purple-900/40 to-black/50 border-purple-800/40 text-purple-400' },
    { id: 'Sci-Fi', label: 'Sci-Fi', emoji: '🌌', icon: Rocket, gradient: 'from-cyan-500/20 to-violet-600/10 border-cyan-500/30 text-cyan-400' },
  ];

  // Resolve matching movies & AI analysis explanations
  const moodRecommendations = useMemo(() => {
    let list = [];
    let aiExplanation = "";

    switch (selectedMood) {
      case 'Happy':
        list = moviesData.filter(m => m.id === 'm3' || m.id === 'm6'); // EEAAO, Parasite (comedy elements)
        aiExplanation = "CineBot AI Chemical Analysis: We've matched you with films featuring whimsical absurdist comedy, vibrant visual aesthetics, and smart satirical social themes to elevate dopamine receptors and stimulate laughter.";
        break;
      case 'Sad':
        list = moviesData.filter(m => m.id === 'm1' || m.id === 'm5'); // Interstellar, Whiplash
        aiExplanation = "CineBot AI Chemical Analysis: These cathartic dramas deal with heavy themes of sacrifice, alienation, and obsessive ambition, creating a perfect aesthetic space for self-reflection and emotional release.";
        break;
      case 'Romantic':
        list = moviesData.filter(m => m.id === 'm7'); // Your Name
        aiExplanation = "CineBot AI Chemical Analysis: Focused on cosmic fate, deep connections, and romantic longing, this stunning animation stimulates oxytocin levels by examining the absolute persistence of love across time and space.";
        break;
      case 'Motivational':
        list = moviesData.filter(m => m.id === 'm5' || m.id === 'm1'); // Whiplash, Interstellar
        aiExplanation = "CineBot AI Chemical Analysis: Highlighting relentless persistence, passion, and astronomical odds, these stories trigger adrenaline and motivation to help push you past creative or mental blockades.";
        break;
      case 'Action':
        list = moviesData.filter(m => m.id === 'm2' || m.id === 'm4' || m.id === 'm3'); // Blade Runner, Dune 2, EEAAO
        aiExplanation = "CineBot AI Chemical Analysis: Packed with high-stakes conflict, breathtaking martial arts, futuristic war, and massive scale, these films are designed to elevate heart rate and trigger intense sensory engagement.";
        break;
      case 'Horror':
        list = moviesData.filter(m => m.id === 'm8'); // The Conjuring
        aiExplanation = "CineBot AI Chemical Analysis: Haunting soundscapes, demonic possession, and jump scares stimulate immediate fight-or-flight reactions, delivering a safe but extreme adrenaline rush.";
        break;
      case 'Sci-Fi':
        list = moviesData.filter(m => m.genres.includes('Sci-Fi')); // Interstellar, Blade Runner, EEAAO, Dune 2, Your Name
        aiExplanation = "CineBot AI Chemical Analysis: These masterpieces dive deep into wormholes, cybernetic humanoids, timeline synchronization, and cosmic anomalies, triggering deep cognitive wonder and existential curiosity.";
        break;
      default:
        list = moviesData;
        aiExplanation = "Explore all available records tailored by general AI matches.";
    }

    return { list, aiExplanation };
  }, [selectedMood]);

  const accentColor = accent === 'purple' ? 'brand-purple' : 'brand-cyan';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const bgAccent = accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan text-black';
  const borderAccent = accent === 'purple' ? 'border-brand-purple/20' : 'border-brand-cyan/20';

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Sparkles className={`h-7 w-7 ${textAccent}`} /> AI Mood Recommendations
        </h1>
        <p className="text-gray-400 mt-1">
          Tell our neural network how you feel, and CineBot will select the perfect chemical matching cinema.
        </p>
      </div>

      {/* Mood Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {moods.map(mood => {
          const MoodIcon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`glass-card rounded-2xl p-4 border text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? `bg-${accentColor}/15 border-${accentColor}/50 shadow-lg shadow-${accentColor}/10 scale-[1.03] text-white`
                  : 'border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-bold">{mood.label}</span>
            </button>
          );
        })}
      </div>

      {/* AI Explanation Banner */}
      <div className={`glass-card rounded-3xl p-5 border border-white/5 bg-gradient-to-r ${
        moods.find(m => m.id === selectedMood)?.gradient || ''
      }`}>
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Sparkles className="h-4.5 w-4.5 animate-pulse" /> Neural Chemistry Analysis
        </h3>
        <p className="text-xs text-gray-300 mt-2.5 leading-relaxed leading-5">
          {moodRecommendations.aiExplanation}
        </p>
      </div>

      {/* Recommended Movies Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white">Recommended Matches ({moodRecommendations.list.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moodRecommendations.list.map(movie => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden cursor-pointer flex border border-white/5 group h-44"
            >
              {/* Poster frame */}
              <img src={movie.posterUrl} alt={movie.title} className="w-28 sm:w-32 object-cover shrink-0" />
              
              {/* Info frame */}
              <div className="p-4 flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-extrabold text-sm text-white group-hover:text-brand-purple transition truncate">
                      {movie.title}
                    </h4>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-white">{movie.rating}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">{movie.year} • {movie.duration} • {movie.language}</p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed hidden sm:block">
                    {movie.synopsis}
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex gap-1 flex-wrap">
                    {movie.genres.slice(0, 2).map(g => (
                      <span key={g} className="text-[8px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-gray-400">
                        {g}
                      </span>
                    ))}
                  </div>

                  <span className={`text-[10px] font-bold text-${accentColor} flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition`}>
                    View Details <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
