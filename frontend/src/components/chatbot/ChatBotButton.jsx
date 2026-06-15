import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { moviesData } from '../../data/movies';
import { MessageSquare, X, Send, Sparkles, Film, Bot } from 'lucide-react';

export default function ChatBotButton() {
  const { accent } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm CineBot, your AI Cinematic Companion. 🎬\n\nTell me what you feel like watching, or tap one of the prompts below to get started!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "🚀 Mind-bending Sci-Fi",
    "😱 Terrifying Horror",
    "🥁 Intense Drama / Music",
    "🍿 Fun group watch",
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic simulated response
    setTimeout(() => {
      let botResponseText = "";
      let matchedMovieId = null;

      const lowerText = textToSend.toLowerCase();

      if (lowerText.includes('sci-fi') || lowerText.includes('space') || lowerText.includes('nolan') || lowerText.includes('mind-bending')) {
        const movie = moviesData.find(m => m.id === 'm1'); // Interstellar
        botResponseText = `I highly recommend Christopher Nolan's **${movie.title}** (${movie.year}). It deals with wormholes, time dilation, and human survival. It has a stunning ${movie.rating}/10 rating!`;
        matchedMovieId = 'm1';
      } else if (lowerText.includes('horror') || lowerText.includes('scary') || lowerText.includes('conjuring')) {
        const movie = moviesData.find(m => m.id === 'm8'); // The Conjuring
        botResponseText = `If you want to be spooked, try **${movie.title}** (${movie.year}). Based on Ed and Lorraine Warren's paranormal investigations, it's a masterpiece in tension and atmosphere.`;
        matchedMovieId = 'm8';
      } else if (lowerText.includes('drama') || lowerText.includes('music') || lowerText.includes('whiplash')) {
        const movie = moviesData.find(m => m.id === 'm5'); // Whiplash
        botResponseText = `You should definitely watch **${movie.title}** (${movie.year}). It's an intense, high-octane drama about a jazz drummer and his ruthless mentor. It will keep you on the edge of your seat!`;
        matchedMovieId = 'm5';
      } else if (lowerText.includes('group') || lowerText.includes('friends') || lowerText.includes('room') || lowerText.includes('everything')) {
        const movie = moviesData.find(m => m.id === 'm3'); // EEAAO
        botResponseText = `A perfect movie to watch and discuss with friends is **${movie.title}** (${movie.year}). It's funny, action-packed, and emotionally deep with its multiverse chaos.`;
        matchedMovieId = 'm3';
      } else if (lowerText.includes('romantic') || lowerText.includes('love') || lowerText.includes('anime')) {
        const movie = moviesData.find(m => m.id === 'm7'); // Your Name
        botResponseText = `I recommend the gorgeous Japanese anime film **${movie.title}** (${movie.year}). It's a mind-bending romance about body-swapping, cosmic anomalies, and deep fate.`;
        matchedMovieId = 'm7';
      } else {
        // Fallback random movie
        const randomIndex = Math.floor(Math.random() * moviesData.length);
        const movie = moviesData[randomIndex];
        botResponseText = `How about **${movie.title}** (${movie.year})? It's rated ${movie.rating}/10 and covers: ${movie.genres.join(', ')}. It's a fantastic fit for a premium movie night!`;
        matchedMovieId = movie.id;
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponseText,
        movieId: matchedMovieId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputValue);
    }
  };

  const themeBtnColor = accent === 'purple' 
    ? 'bg-brand-purple hover:bg-brand-purple/90 glow-btn-purple' 
    : 'bg-brand-cyan hover:bg-brand-cyan/90 glow-btn-cyan';

  return (
    <div className="fixed bottom-20 right-6 z-50 md:bottom-6">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition duration-300 hover:scale-110 ${themeBtnColor}`}
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Expanded Chat Dialog */}
      {isOpen && (
        <div className="glass-card flex h-[480px] w-[340px] flex-col rounded-2xl shadow-2xl sm:w-[380px] border border-white/10 overflow-hidden">
          
          {/* Chat Header */}
          <div className={`flex items-center justify-between px-4 py-3 text-white ${
            accent === 'purple' ? 'bg-brand-purple/20' : 'bg-brand-cyan/20'
          } border-b border-white/5`}>
            <div className="flex items-center gap-2">
              <div className={`rounded-lg p-1.5 ${
                accent === 'purple' ? 'bg-brand-purple/20' : 'bg-brand-cyan/20'
              }`}>
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold">CineBot AI+</h3>
                <span className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> Online Assistant
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messaging Box */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed ${
                  msg.sender === 'user'
                    ? accent === 'purple' ? 'bg-brand-purple text-white rounded-tr-none' : 'bg-brand-cyan text-black rounded-tr-none font-medium'
                    : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}

                  {/* Movie Shortcut Link inside chatbot response */}
                  {msg.movieId && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(`/movie/${msg.movieId}`);
                      }}
                      className="mt-2 flex items-center gap-1 text-xs underline font-semibold text-white hover:text-gray-300"
                    >
                      <Film className="h-3.5 w-3.5" /> View Movie Details
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Quick Prompts */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <span className="text-[10px] text-gray-400 font-medium mb-1 block">Quick Prompts:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.substring(2))} // strip emoji for search
                    className="text-xs bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 px-2.5 py-1 rounded-full transition text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Field */}
          <div className="p-3 border-t border-white/5 bg-white/2 flex gap-2">
            <input
              type="text"
              placeholder="Ask CineBot about movies..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-white/20"
            />
            <button
              onClick={() => handleSend(inputValue)}
              className={`rounded-xl p-2 text-white transition ${
                accent === 'purple' ? 'bg-brand-purple hover:bg-brand-purple/80' : 'bg-brand-cyan text-black hover:bg-brand-cyan/80'
              }`}
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
