export const moviesData = [
  {
    id: "m1",
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    duration: "2h 49m",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    language: "English",
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Faced with dwindling resources on Earth, they must search for a new habitable home among the stars, crossing dimensions of space, time, and gravity.",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
    isTrending: true,
    isAIRecommended: true,
    isContinueWatching: false,
    isRecentlyViewed: true,
    progress: 0,
    votes: "1.9M",
    director: "Christopher Nolan",
    cast: [
      { name: "Matthew McConaughey", role: "Cooper", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      { name: "Anne Hathaway", role: "Brand", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
      { name: "Jessica Chastain", role: "Murph", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: "r1", user: "CinephileMax", rating: 9, text: "A modern masterpiece of hard sci-fi. Hans Zimmer's score is absolutely breathtaking and elevates every scene.", date: "2 days ago", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" },
      { id: "r2", user: "NolanFanboy", rating: 10, text: "The depiction of black holes and gravity dilation is brilliant. Emotive, ambitious, and visually stunning.", date: "1 week ago", avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=80" }
    ],
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "m2",
    title: "Blade Runner 2049",
    year: 2017,
    rating: 8.4,
    duration: "2h 44m",
    genres: ["Sci-Fi", "Action", "Thriller"],
    language: "English",
    synopsis: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. His discovery leads him on a quest to find Rick Deckard, a former blade runner who has been missing for thirty years.",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80",
    isTrending: true,
    isAIRecommended: true,
    isContinueWatching: true,
    isRecentlyViewed: true,
    progress: 65,
    remainingTime: "58 mins left",
    votes: "620K",
    director: "Denis Villeneuve",
    cast: [
      { name: "Ryan Gosling", role: "Officer K", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      { name: "Harrison Ford", role: "Rick Deckard", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" },
      { name: "Ana de Armas", role: "Joi", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: "r3", user: "CyberNeon", rating: 9, text: "Denis Villeneuve does it again. Roger Deakins' cinematography is pure art. A worthy successor to the original.", date: "3 days ago", avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80" }
    ],
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "m3",
    title: "Everything Everywhere All at Once",
    year: 2022,
    rating: 8.5,
    duration: "2h 19m",
    genres: ["Sci-Fi", "Action", "Comedy", "Drama"],
    language: "English / Mandarin",
    synopsis: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
    posterUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80",
    isTrending: false,
    isAIRecommended: true,
    isContinueWatching: true,
    isRecentlyViewed: false,
    progress: 30,
    remainingTime: "1h 37m left",
    votes: "450K",
    director: "Daniel Kwan, Daniel Scheinert",
    cast: [
      { name: "Michelle Yeoh", role: "Evelyn Wang", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" },
      { name: "Ke Huy Quan", role: "Waymond Wang", imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80" },
      { name: "Jamie Lee Curtis", role: "Deirdre Beaubeirdre", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: "r4", user: "MultiverseHop", rating: 10, text: "The most creative film I have seen in a decade. It transitions from absurd comedy to heartwarming family drama seamlessly.", date: "4 days ago", avatarUrl: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&auto=format&fit=crop&q=80" }
    ],
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "m4",
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.9,
    duration: "2h 46m",
    genres: ["Sci-Fi", "Action", "Adventure"],
    language: "English",
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
    posterUrl: "https://images.unsplash.com/photo-1547483238-2cbf88be306d?w=500&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    isTrending: true,
    isAIRecommended: false,
    isContinueWatching: false,
    isRecentlyViewed: true,
    progress: 0,
    votes: "380K",
    director: "Denis Villeneuve",
    cast: [
      { name: "Timothée Chalamet", role: "Paul Atreides", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
      { name: "Zendaya", role: "Chani", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
      { name: "Austin Butler", role: "Feyd-Rautha", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: "r5", user: "ArrakisDreamer", rating: 10, text: "A visual and auditory tour de force. The scale of this movie is simply unmatched. Timothée and Austin are outstanding.", date: "5 days ago", avatarUrl: "https://images.unsplash.com/photo-1527983359383-4758693f760c?w=100&auto=format&fit=crop&q=80" }
    ],
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    id: "m5",
    title: "Whiplash",
    year: 2014,
    rating: 8.5,
    duration: "1h 46m",
    genres: ["Drama", "Music"],
    language: "English",
    synopsis: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    posterUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",
    isTrending: false,
    isAIRecommended: true,
    isContinueWatching: false,
    isRecentlyViewed: false,
    progress: 0,
    votes: "930K",
    director: "Damien Chazelle",
    cast: [
      { name: "Miles Teller", role: "Andrew Neiman", imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80" },
      { name: "J.K. Simmons", role: "Terence Fletcher", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: "r6", user: "JazzTempo", rating: 9, text: "Intense, thrilling, and relentless. Simmons delivers one of the most chilling performances in modern cinema history.", date: "1 month ago", avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80" }
    ],
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    id: "m6",
    title: "Parasite",
    year: 2019,
    rating: 8.5,
    duration: "2h 12m",
    genres: ["Drama", "Thriller", "Comedy"],
    language: "Korean",
    synopsis: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan, sparking a series of unexpected, tragic incidents.",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=1600&auto=format&fit=crop&q=80",
    isTrending: false,
    isAIRecommended: false,
    isContinueWatching: false,
    isRecentlyViewed: true,
    progress: 0,
    votes: "900K",
    director: "Bong Joon Ho",
    cast: [
      { name: "Song Kang-ho", role: "Ki-taek", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      { name: "Lee Sun-kyun", role: "Mr. Park", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: "r7", user: "SeoulCine", rating: 10, text: "A scathing satire that morphs into a nail-biting thriller. Masterfully paced and layered with heavy metaphors.", date: "3 weeks ago", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" }
    ],
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    id: "m7",
    title: "Your Name",
    year: 2016,
    rating: 8.4,
    duration: "1h 46m",
    genres: ["Romantic", "Sci-Fi", "Drama", "Animation"],
    language: "Japanese",
    synopsis: "Two strangers find themselves linked in a bizarre way. When a connection is formed, will distance be the only thing to keep them apart? A mind-bending, emotional tale of time, love, and comets.",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&auto=format&fit=crop&q=80",
    isTrending: true,
    isAIRecommended: false,
    isContinueWatching: false,
    isRecentlyViewed: false,
    progress: 0,
    votes: "290K",
    director: "Makoto Shinkai",
    cast: [
      { name: "Ryunosuke Kamiki", role: "Taki Tachibana", imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80" },
      { name: "Mone Kamishiraishi", role: "Mitsuha Miyamizu", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: "r8", user: "AnimeOtaku", rating: 9, text: "Visually spectacular. Shinkai masterfully captures longing, fate, and cosmic connections. The soundtrack is iconic.", date: "1 month ago", avatarUrl: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&auto=format&fit=crop&q=80" }
    ],
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
  },
  {
    id: "m8",
    title: "The Conjuring",
    year: 2013,
    rating: 7.5,
    duration: "1h 52m",
    genres: ["Horror", "Mystery", "Thriller"],
    language: "English",
    synopsis: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse. Forced to confront a powerful demonic entity, the Warrens find themselves in the most terrifying case of their lives.",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1505635330303-31953027e03b?w=1600&auto=format&fit=crop&q=80",
    isTrending: false,
    isAIRecommended: false,
    isContinueWatching: false,
    isRecentlyViewed: false,
    progress: 0,
    votes: "500K",
    director: "James Wan",
    cast: [
      { name: "Vera Farmiga", role: "Lorraine Warren", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
      { name: "Patrick Wilson", role: "Ed Warren", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: "r9", user: "SpookyNight", rating: 8, text: "One of the best modern haunted house movies. James Wan uses camera movements and silence to create extreme suspense.", date: "2 months ago", avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80" }
    ],
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  }
];

export const genresList = [
  "All",
  "Sci-Fi",
  "Action",
  "Drama",
  "Thriller",
  "Comedy",
  "Adventure",
  "Music",
  "Romantic",
  "Horror",
  "Animation"
];

export const languagesList = [
  "All",
  "English",
  "Korean",
  "Japanese",
  "Mandarin"
];
