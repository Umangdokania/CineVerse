import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { mockUserData } from '../data/users';
import { moviesData } from '../data/movies';
import { 
  Play, Pause, Send, Share2, Heart, HeartOff, 
  Smile, Users, Volume2, Maximize, MessageSquare 
} from 'lucide-react';

export default function Booking() {
  const { user } = useAuth();
  const { accent } = useTheme();
  
  const roomData = mockUserData.activeRoom;
  const movie = moviesData.find(m => m.id === roomData.movieId) || moviesData[0];

  // Room states
  const [isPlaying, setIsPlaying] = useState(roomData.isPlaying);
  const [participants, setParticipants] = useState(roomData.participants);
  const [chatMessages, setChatMessages] = useState(roomData.chatMessages);
  const [chatInput, setChatInput] = useState('');
  const [coupleMode, setCoupleMode] = useState(false);
  
  const [showInviteToast, setShowInviteToast] = useState(false);
  const [reactions, setReactions] = useState([]);
  const reactionIdRef = useRef(0);

  const videoRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log(e));
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      id: `c-new-${Date.now()}`,
      user: user?.name || 'Alex Rivera',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const responseMsg = {
        id: `c-reply-${Date.now()}`,
        user: "Sarah Connor",
        text: "That cinematic organ score is mind-blowing in sync!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
      };
      setChatMessages(prev => [...prev, responseMsg]);
    }, 1500);
  };

  // Trigger floating reactions
  const triggerReaction = (emoji) => {
    const id = reactionIdRef.current++;
    // Random offset between 20% and 80%
    const leftOffset = Math.floor(Math.random() * 60) + 20;
    // Random rotation and float duration for organic feel
    const rotate = Math.floor(Math.random() * 40) - 20; // -20deg to 20deg
    const duration = (Math.random() * 0.8 + 1.6).toFixed(2); // 1.6s to 2.4s
    
    const newReaction = { id, emoji, leftOffset, rotate, duration };
    setReactions(prev => [...prev, newReaction]);

    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
    }, parseFloat(duration) * 1000);
  };

  const handleInvite = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowInviteToast(true);
    setTimeout(() => setShowInviteToast(false), 3000);
  };

  const accentColor = accent === 'purple' ? 'brand-purple' : 'brand-cyan';
  const textAccent = accent === 'purple' ? 'text-brand-purple' : 'text-brand-cyan';
  const bgAccent = accent === 'purple' ? 'btn-neon-purple' : 'btn-neon-cyan';
  const borderAccent = accent === 'purple' ? 'border-brand-purple/20' : 'border-brand-cyan/20';

  return (
    <div className="space-y-6 animate-fade-in pb-16 relative">
      
      {/* Dynamic Keyframes injected locally */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes swayFloat {
          0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
          15% { opacity: 1; transform: translateY(-40px) scale(1.3) rotate(-10deg); }
          50% { transform: translateY(-130px) scale(1.1) translate(15px, 0) rotate(15deg); }
          100% { transform: translateY(-250px) scale(0.7) translate(-10px, 0) rotate(-5deg); opacity: 0; }
        }
        .reaction-bubble {
          animation-name: swayFloat;
          animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          animation-fill-mode: forwards;
        }
      `}} />

      {/* Sync Link Toast */}
      {showInviteToast && (
        <div className="fixed top-20 right-6 z-50 rounded-2xl bg-green-500 text-black px-4 py-3 text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <span>🔗 Sync Connection Key Copied to Clipboard!</span>
        </div>
      )}

      {/* Room Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <span className={`text-[10px] bg-${accentColor}/10 border border-${accentColor}/30 text-white font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full`}>
            🟢 Session Active
          </span>
          <h1 className="text-2xl font-black text-white mt-2">{roomData.roomName}</h1>
          <p className="text-xs text-gray-400 mt-1">
            Synchronized Movie: <strong className="text-white">{movie.title}</strong> • Hosted by {participants.find(p => p.isHost)?.name}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleInvite}
            className={`flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-white px-4 py-2.5 transition cursor-pointer`}
          >
            <Share2 className="h-4 w-4" /> Share Sync Key
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Player with glowing accent border */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Movie Player with conditional Neon reflection */}
          <div 
            className={`relative aspect-video rounded-3xl overflow-hidden bg-black border transition-all duration-700 shadow-2xl group ${
              coupleMode 
                ? 'border-pink-500/40 shadow-pink-500/10' 
                : accent === 'purple' 
                  ? 'border-brand-purple/30 shadow-brand-purple/5' 
                  : 'border-brand-cyan/30 shadow-brand-cyan/5'
            }`}
          >
            <video
              ref={videoRef}
              src={movie.trailerUrl}
              loop
              muted
              className="w-full h-full object-cover"
              onClick={handlePlayPause}
            />

            {/* Floating Reaction Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {reactions.map(react => (
                <div
                  key={react.id}
                  className="absolute bottom-10 text-3xl reaction-bubble"
                  style={{ 
                    left: `${react.leftOffset}%`,
                    transform: `rotate(${react.rotate}deg)`,
                    animationDuration: `${react.duration}s`,
                  }}
                >
                  {react.emoji}
                </div>
              ))}
            </div>

            {/* Custom controls bar */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
              <div className="w-full bg-white/20 h-1 rounded-full mb-4 cursor-pointer relative">
                <div 
                  className={`h-full ${accent === 'purple' ? 'bg-brand-purple' : 'bg-brand-cyan'} rounded-full`}
                  style={{ width: '45%' }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={handlePlayPause} className="text-white hover:scale-105 transition">
                    {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                  </button>
                  <div className="flex items-center gap-1 text-white">
                    <Volume2 className="h-4.5 w-4.5" />
                    <span className="text-xs">45%</span>
                  </div>
                  <span className="text-[10px] text-gray-300">01:18:00 / 02:49:00</span>
                </div>
                <button className="text-white hover:scale-105 transition">
                  <Maximize className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Big Initial Play button */}
            {!isPlaying && (
              <div onClick={handlePlayPause} className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer">
                <div className="rounded-full p-6 bg-black/60 border border-white/25 hover:scale-105 transition shadow-2xl">
                  <Play className={`h-8 w-8 ${textAccent} fill-current`} />
                </div>
              </div>
            )}
          </div>

          {/* Lower controls: Emoji reaction tray and couple mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Reaction Tray */}
            <div className="glass-card rounded-2xl p-4 border border-white/5 flex flex-col justify-center shadow-lg">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">Sync Reaction Emoji</span>
              <div className="flex items-center justify-between px-2">
                {['❤️', '😂', '😮', '😢', '🔥', '👏'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => triggerReaction(emoji)}
                    className="text-2xl hover:scale-130 hover:-translate-y-0.5 transition duration-200 p-1 bg-white/2 hover:bg-white/10 rounded-xl cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Couple Mode setting (changes border and ripples) */}
            <div className={`glass-card rounded-2xl p-4 border transition duration-500 shadow-lg ${
              coupleMode 
                ? 'border-pink-500/40 bg-pink-500/5'
                : 'border-white/5'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Privacy Configuration</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">Couple Co-Watch Link</h3>
                </div>
                <button
                  onClick={() => setCoupleMode(!coupleMode)}
                  className={`rounded-xl p-2.5 transition cursor-pointer ${
                    coupleMode 
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' 
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {coupleMode ? <Heart className="h-5 w-5 fill-current animate-pulse" /> : <HeartOff className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
                {coupleMode 
                  ? '💖 Couple Mode Engaged: Private co-watch channel established. Secondary sync links blocked.' 
                  : '👥 Couple Mode Disengaged: Multi-sync active. Up to 8 syncers allowed.'}
              </p>
            </div>

          </div>

        </div>

        {/* Right Column: Chat & active syncers */}
        <div className="space-y-4">
          
          {/* Synchronized participants list */}
          <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-3 shadow-lg">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <Users className="h-4.5 w-4.5" /> Active Syncers ({participants.filter(p => p.isOnline).length})
              </span>
              {coupleMode && (
                <span className="text-[8px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded font-extrabold uppercase tracking-widest animate-pulse border border-pink-500/30">Locked</span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {participants.map((person, idx) => {
                if (coupleMode && idx > 1) return null;
                return (
                  <div key={idx} className="relative group cursor-pointer" title={person.name}>
                    <img 
                      src={person.avatar} 
                      alt={person.name} 
                      className={`h-9 w-9 rounded-full object-cover border-2 ${
                        person.isHost 
                          ? accent === 'purple' ? 'border-brand-purple' : 'border-brand-cyan' 
                          : 'border-white/10'
                      }`} 
                    />
                    <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-black ${
                      person.isOnline ? 'bg-green-500' : 'bg-gray-600'
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Chat Panel */}
          <div className="glass-card rounded-3xl border border-white/5 flex flex-col h-[360px] overflow-hidden shadow-lg">
            <div className="px-4 py-3 bg-white/2 border-b border-white/5">
              <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" /> Live Room Chat
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className="flex gap-2.5 items-start">
                  <img src={msg.avatar} alt={msg.user} className="h-7 w-7 rounded-full object-cover mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-extrabold text-white">{msg.user}</span>
                      <span className="text-[8px] text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed bg-[#101015]/80 border border-white/5 px-2.5 py-1.5 rounded-xl rounded-tl-none">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendChat} className="p-3 border-t border-white/5 bg-[#0a0a0d] flex gap-2">
              <input
                type="text"
                placeholder="Type message in room..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-white/3 border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-white/10"
              />
              <button
                type="submit"
                className={`rounded-xl p-2 text-white transition cursor-pointer ${
                  accent === 'purple' ? 'bg-brand-purple hover:bg-brand-purple/80' : 'bg-brand-cyan text-black hover:bg-brand-cyan/80'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
