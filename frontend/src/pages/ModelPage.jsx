import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPlay, FaStar, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ModelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Mock data fetch - in a real app, you'd fetch from an API
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate mock model data
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
        ]
      };

      // Generate mock videos for this model
      const mockVideos = Array.from({ length: 12 }, (_, i) => {
        const durations = ['5:30', '12:45', '8:20', '25:10', '15:00', '7:15'];
        const timestamps = ['Just now', '5 min ago', '1 hour ago', 'Today', 'Yesterday', '2 days ago', '1 week ago'];
        
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
          likes: `${Math.floor(Math.random() * 300) + 50}K`
        };
      });

      setModel(mockModel);
      setVideos(mockVideos);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const toggleFavorite = (videoId, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(videoId) ? prev.filter(favId => favId !== videoId) : [...prev, videoId]
    );
  };

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
              </div>
              
              <div className="md:w-2/3 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Model not found</h2>
          <p className="text-gray-600 mb-6">The model you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-pink-600 hover:text-pink-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        {/* Model Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Model Image */}
          <div className="md:w-1/3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center text-white">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-medium">{model.rating}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Model Info */}
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{model.name}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {model.country}
                </span>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {model.videos} videos
                </span>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {model.followers.toLocaleString()} followers
                </span>
              </div>

              <p className="text-gray-700 mb-6">{model.bio}</p>

              <div className="flex flex-wrap gap-2">
                {model.tags.map((tag, i) => (
                  <span key={i} className="text-sm bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Videos</h2>
          
          {videos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVideoClick(video.id)}
                  className="relative group cursor-pointer"
                >
                  {/* Video Thumbnail */}
                  <div className="aspect-video rounded-lg overflow-hidden shadow relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white text-sm font-medium">
                        {video.title}
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 rounded-full p-3">
                        <FaPlay className="text-white text-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-600">
                        {video.views} • {video.timestamp}
                      </p>
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
      </div>
    </div>
  );
};

export default ModelPage;