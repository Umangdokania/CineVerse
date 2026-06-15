export const mockUserData = {
  currentUser: {
    name: "Alex Rivera",
    email: "alex@cineverse.ai",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    role: "Administrator",
    favoriteGenres: ["Sci-Fi", "Thriller", "Drama"],
    stats: {
      hoursWatched: 142,
      reviewsWritten: 28,
      roomsHosted: 12,
      activeDays: 45
    },
    achievements: [
      { id: "a1", title: "Cosmic Voyager", description: "Watch 5 Sci-Fi movies in CineVerse.", icon: "🌌", unlocked: true, date: "June 10, 2026" },
      { id: "a2", title: "First Critic", description: "Write your first public movie review.", icon: "✍️", unlocked: true, date: "May 15, 2026" },
      { id: "a3", title: "Social Butterfly", description: "Host or join a virtual room with 5+ friends.", icon: "🦋", unlocked: true, date: "June 02, 2026" },
      { id: "a4", title: "Movie Marathoner", description: "Watch 3 movies in a single calendar day.", icon: "🏃‍♂️", unlocked: false }
    ],
    watchlist: {
      wantToWatch: ["m4", "m8"],
      watching: ["m2", "m3"],
      completed: ["m1", "m5"],
      favorites: ["m1", "m2", "m7"]
    }
  },
  activeRoom: {
    roomId: "vr-alpha",
    roomName: "Interstellar Deep-Space Sync",
    movieId: "m1", // Interstellar
    isPlaying: true,
    currentTime: 4680, // 1 hour 18 mins
    participants: [
      { name: "Alex Rivera", isHost: true, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80", isOnline: true },
      { name: "Sarah Connor", isHost: false, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", isOnline: true },
      { name: "Marcus Wright", isHost: false, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", isOnline: true },
      { name: "Elena Rostova", isHost: false, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80", isOnline: false }
    ],
    chatMessages: [
      { id: "c1", user: "Sarah Connor", text: "That black hole scene is gorgeous! The science behind it is incredible.", timestamp: "4:15 PM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
      { id: "c2", user: "Marcus Wright", text: "The organ music here gives me goosebumps every single time.", timestamp: "4:17 PM", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      { id: "c3", user: "Alex Rivera", text: "Welcome to the sync guys! Make sure couple mode is off if you want to invite more people.", timestamp: "4:18 PM", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" }
    ]
  }
};
