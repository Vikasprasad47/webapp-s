import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaHeart, FaRegHeart, FaPlay, FaStar, FaArrowLeft, 
  FaBookmark, FaLock 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ModelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [isModelLiked, setIsModelLiked] = useState(false);

  // Mock data fetch
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockModel = {
        id: parseInt(id),
        name: `Model ${id}`,
        image: `https://xsgames.co/randomusers/assets/avatars/female/${id}.jpg`,
        videos: Math.floor(Math.random() * 100) + 20,
        rating: (Math.random() * 0.7 + 4.3).toFixed(1),
        followers: Math.floor(Math.random() * 50000) + 5000,
        country: ['Indian', 'Japanese', 'Korean', 'American', 'European', 'Latina'][id % 6],
        bio: `Professional model with ${Math.floor(Math.random() * 5) + 2} years of experience. Specializes in various genres and always delivers high-quality content.`,
        tags: [
          ['Real/Amateur', 'Professional', 'POV', 'Cartoon/Hentai'][id % 4],
          ['Romantic', 'Hardcore', 'Softcore', 'Public/Outdoor'][id % 4],
          ['Cosplay', 'Nurse/Doctor', 'Teacher/Student', 'Police/Prison'][id % 4]
        ],
        hasPremiumContent: Math.random() > 0.3
      };

      const mockVideos = Array.from({ length: 12 }, (_, i) => {
        const durations = ['5:30', '12:45', '8:20', '25:10'];
        const timestamps = ['Just now', '5 min ago', '1 hour ago', 'Today'];
        
        return {
          id: i + 1,
          title: [
            `Exclusive private show with Model ${id}`,
            `Hot session with Model ${id}`,
            `Full length video with Model ${id}`,
            `Special request fulfilled by Model ${id}`
          ][i % 4],
          views: `${Math.floor(Math.random() * 500) + 50}K views`,
          timestamp: timestamps[i % timestamps.length],
          thumbnail: `https://picsum.photos/seed/${id}${i}/500/300`,
          duration: durations[i % durations.length],
          rating: (Math.random() * 0.7 + 4.3).toFixed(1),
          likes: `${Math.floor(Math.random() * 300) + 50}K`,
          isPremium: Math.random() > 0.7,
          isWatched: Math.random() > 0.8
        };
      });

      setModel(mockModel);
      setVideos(mockVideos);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const toggleFavorite = (videoId, e) => {
    e?.stopPropagation();
    setFavorites(prev => 
      prev.includes(videoId) ? prev.filter(favId => favId !== videoId) : [...prev, videoId]
    );
  };

  const toggleModelLike = () => {
    setIsModelLiked(!isModelLiked);
  };

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const unlockPremium = () => {
    // Premium unlock logic
    alert('Premium content unlocked!');
  };

  if (isLoading) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">

          {/* Back button skeleton */}
          <div className="h-8 w-24 bg-gray-200 rounded mb-6"></div>

          {/* Profile Skeleton */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {/* Mobile layout */}
            <div className="flex items-start gap-4 sm:hidden mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg shadow-md flex-shrink-0"></div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="flex gap-1 flex-wrap mt-1">
                  <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden sm:block space-y-4 mb-4">
              <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
              <div className="flex gap-2 flex-wrap">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2 mb-6">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 w-20 bg-gray-200 rounded-full"></div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 overflow-x-auto mb-6 hide-scrollbar">
              {['Videos', 'About', 'Photos'].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-16 bg-gray-200 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Videos grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-video bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


  if (!model) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Model not found</h2>
          <p className="text-gray-600 mb-6">The model you're looking for doesn't exist or may have been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-800 mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Model Profile Section */}
        <div className="w-full md:w-2/3 lg:w-3/4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {/* Mobile Layout */}
                <div className="flex items-start gap-4 sm:hidden mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                    <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-gray-900">{model.name}</h1>

                    <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{model.country}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{model.videos} videos</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{model.followers.toLocaleString()} fans</span>
                    </div>
                </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{model.name}</h1>
                </div>

                {/* Info badges for desktop */}
                <div className="hidden sm:flex flex-wrap gap-2 mb-4">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{model.country}</span>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{model.videos} videos</span>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{model.followers.toLocaleString()} fans</span>
                </div>

                {/* Bio — below image/info on all screens */}
                <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">{model.bio}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                {model.tags.map((tag, i) => (
                    <span key={i} className="text-sm bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
                    {tag}
                    </span>
                ))}
                </div>

                {/* Sticky Tabs */}
                <div className="sticky top-0 bg-white z-10 border-b border-gray-200 mb-6">
                <nav className="flex space-x-6 overflow-x-auto py-2 px-1 snap-x hide-scrollbar">
                    {['videos', 'about', 'photos'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`snap-start whitespace-nowrap py-2 px-2 text-sm font-medium border-b-2 transition-all ${
                        activeTab === tab
                            ? 'border-pink-500 text-pink-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                    ))}
                </nav>
                </div>
            </motion.div>
        </div>


        {/* Content Section */}
        {activeTab === 'videos' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Videos</h2>
            
            {videos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVideoClick(video.id)}
                    className="relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                  >
                    {/* Video Thumbnail */}
                    <div className="aspect-video relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      {video.isPremium && (
                        <>
                          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-pink-600 text-white rounded-full p-3">
                              <FaLock size={20} />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="text-white text-sm font-medium truncate">
                          {video.title}
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      {video.isWatched && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Watched
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 rounded-full p-3">
                          <FaPlay className="text-white text-xl" />
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-600">
                          {video.views} • {video.timestamp}
                        </p>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => toggleFavorite(video.id, e)}
                            className="text-gray-400 hover:text-pink-600"
                          >
                            {favorites.includes(video.id) ? (
                              <FaHeart className="text-pink-600" />
                            ) : (
                              <FaRegHeart />
                            )}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Watch later functionality
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <FaBookmark size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600">No videos found for this model.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About {model.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                <p className="text-gray-700">{model.bio}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-gray-600 w-24">Country:</span>
                    <span className="font-medium">{model.country}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 w-24">Videos:</span>
                    <span className="font-medium">{model.videos}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 w-24">Fans:</span>
                    <span className="font-medium">{model.followers.toLocaleString()}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 w-24">Rating:</span>
                    <span className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      {model.rating}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="bg-white rounded-lg p-6 shadow text-center">
            <p className="text-gray-600">Photo gallery coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelPage;