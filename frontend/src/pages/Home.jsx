import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPlay, FaStar, FaFilter, FaTimes } from 'react-icons/fa';
import { GiClothes, GiAnubis, GiNinjaHead, GiTeacher, GiNurseFemale, GiPoliceOfficerHead } from 'react-icons/gi';
import { BsCollectionPlay, BsPeopleFill, BsGlobe, BsCameraReels, BsCameraVideo } from 'react-icons/bs';
import { SiAnilist } from 'react-icons/si';
import { IoMdPodium } from 'react-icons/io';
import { MdOutlineVideocam, MdOutlineVideogameAsset, MdOutlineHearing, MdOutlinePublic, MdOutlineSpa } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  
  // Basic categories
  const basicCategories = [
    { id: 'all', name: 'For You', icon: <BsCollectionPlay /> },
    { id: 'trending', name: 'Trending', icon: <IoMdPodium /> },
    { id: 'new', name: 'New', icon: <BsPeopleFill /> },
    { id: 'popular', name: 'Popular', icon: <BsPeopleFill /> }
  ];

  // Filter categories with icons
  const filterCategories = [
    {
      title: 'By Style',
      icon: <BsCameraReels />,
      options: [
        { name: 'Real/Amateur', icon: <MdOutlineVideocam /> },
        { name: 'Professional', icon: <BsCameraVideo /> },
        { name: 'POV', icon: <FaRegHeart /> },
        { name: 'Cartoon/Hentai', icon: <SiAnilist /> },
        { name: '3D/CGI', icon: <MdOutlineVideogameAsset /> },
        { name: 'VR', icon: <GiNinjaHead /> },
        { name: 'ASMR/Audio', icon: <MdOutlineHearing /> }
      ]
    },
    {
      title: 'By Roleplay',
      icon: <GiClothes />,
      options: [
        { name: 'Cosplay', icon: <GiNinjaHead /> },
        { name: 'Nurse/Doctor', icon: <GiNurseFemale /> },
        { name: 'Teacher/Student', icon: <GiTeacher /> },
        { name: 'Police/Prison', icon: <GiPoliceOfficerHead /> },
        { name: 'Fantasy', icon: <GiAnubis /> }
      ]
    },
    {
      title: 'By Region',
      icon: <BsGlobe />,
      options: [
        { name: 'Indian/Desi', icon: <MdOutlinePublic /> },
        { name: 'Japanese/JAV', icon: <MdOutlinePublic /> },
        { name: 'Korean', icon: <MdOutlinePublic /> },
        { name: 'Western/US', icon: <MdOutlinePublic /> },
        { name: 'European', icon: <MdOutlinePublic /> },
        { name: 'Spanish/Latina', icon: <MdOutlinePublic /> }
      ]
    },
    {
      title: 'By Theme',
      icon: <FaHeart />,
      options: [
        { name: 'Romantic', icon: <FaRegHeart /> },
        { name: 'Hardcore', icon: <FaHeart /> },
        { name: 'Softcore', icon: <FaRegHeart /> },
        { name: 'Public/Outdoor', icon: <MdOutlinePublic /> },
        { name: 'Massage/Spa', icon: <MdOutlineSpa /> },
        { name: 'Cuckold/Hotwife', icon: <GiClothes /> }
      ]
    }
  ];

  // Models and videos data
  const [models, setModels] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentFilterModal, setCurrentFilterModal] = useState(null);

  // Generate more realistic mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Generate 50 models with realistic data
      const mockModels = Array.from({ length: 50 }, (_, i) => {
        const gender = i % 3 === 0 ? 'male' : 'female';
        const imageId = (i % 50) + 1;
        const countries = ['Indian', 'Japanese', 'Korean', 'American', 'European', 'Latina'];
        const styles = ['Real/Amateur', 'Professional', 'POV', 'Cartoon/Hentai'];
        const themes = ['Romantic', 'Hardcore', 'Softcore', 'Public/Outdoor'];
        
        return {
          id: i + 1,
          name: `${['Aria', 'Bella', 'Chloe', 'Daisy', 'Eva', 'Fiona', 'Gia', 'Hana'][i % 8]} ${['Star', 'Moon', 'Sky', 'Rose', 'Diamond', 'Fox', 'Angel', 'Queen'][(i + 2) % 8]}`,
          image: `https://xsgames.co/randomusers/assets/avatars/${gender}/${imageId}.jpg`,
          videos: Math.floor(Math.random() * 100) + 20,
          rating: (Math.random() * 0.7 + 4.3).toFixed(1),
          followers: Math.floor(Math.random() * 50000) + 5000,
          country: countries[i % countries.length],
          style: styles[i % styles.length],
          theme: themes[i % themes.length],
          tags: [
            styles[i % styles.length],
            themes[i % themes.length],
            countries[i % countries.length],
            ['Cosplay', 'Nurse/Doctor', 'Teacher/Student', 'Police/Prison'][i % 4]
          ].filter(Boolean)
        };
      });

      // Generate 200 videos with realistic data
      const mockVideos = Array.from({ length: 200 }, (_, i) => {
        const model = mockModels[i % 50];
        const durations = ['5:30', '12:45', '8:20', '25:10', '15:00', '7:15'];
        const timestamps = ['Just now', '5 min ago', '1 hour ago', 'Today', 'Yesterday', '2 days ago', '1 week ago'];
        
        return {
          id: i + 1,
          title: [
            'Exclusive private show with ' + model.name,
            'Hot session with ' + model.name.split(' ')[0],
            'Full length ' + model.style + ' video',
            'Special ' + model.theme + ' request fulfilled',
            'New toy testing with ' + model.name,
            model.country + ' style ' + model.theme + ' content',
            model.name + ' in ' + model.tags[3] + ' roleplay',
            'Premium ' + model.style + ' content unlocked'
          ][i % 8],
          channel: model.name,
          views: `${Math.floor(Math.random() * 500) + 50}K views`,
          timestamp: timestamps[i % timestamps.length],
          thumbnail: `https://picsum.photos/seed/${i + 100}/500/300`,
          duration: durations[i % durations.length],
          modelId: model.id,
          rating: (Math.random() * 0.7 + 4.3).toFixed(1),
          likes: `${Math.floor(Math.random() * 300) + 50}K`,
          tags: model.tags
        };
      });

      await new Promise(resolve => setTimeout(resolve, 800));
      
      setModels(mockModels);
      setVideos(mockVideos);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'trending' && parseInt(video.views) > 100) ||
      (selectedCategory === 'new' && ['Just now', '5 min ago', '1 hour ago', 'Today'].includes(video.timestamp));
    
    const matchesFilters = activeFilters.length === 0 || 
      activeFilters.some(filter => video.tags?.includes(filter));
    
    const matchesModel = !selectedModel || video.modelId === selectedModel;
    
    return matchesCategory && matchesFilters && matchesModel;
  });

  const handleModelClick = (modelId) => {
    setSelectedModel(modelId);
    navigate(`/model/${modelId}`);
  };

  const handleVideoClick = (videoId) => {
    const video = videos.find(v => v.id === videoId);
    if (video) {
      navigate(`/video/${videoId}`, {
        state: {
          videoData: video,
          recommendedVideos: getRecommendedVideos(video)
        }
      });
    }
  };

  const getRecommendedVideos = (currentVideo) => {
    return videos
      .filter(v => 
        v.id !== currentVideo.id && 
        (v.tags?.some(tag => currentVideo.tags?.includes(tag)) || 
        v.modelId === currentVideo.modelId)
      )
      .slice(0, 12);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  // Subscription section
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Categories Section */}
      <div className="sticky -top-30 z-10 bg-white shadow-sm px-6 py-4">
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2 hide-scrollbar">
          {basicCategories.map(category => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedModel(null);
              }}
              className={`flex items-center px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category.id && !selectedModel
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Filter Cards - Always Visible */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {filterCategories.map((category, i) => {
            const activeFiltersInCategory = activeFilters.filter(f => 
              category.options.some(o => o.name === f)
            );
            
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentFilterModal(category)}
                className={`bg-white p-4 rounded-lg shadow-sm border cursor-pointer ${
                  activeFiltersInCategory.length > 0 
                    ? 'border-pink-500 bg-pink-50' 
                    : 'border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-gray-100 mr-3">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-gray-900">{category.title}</h3>
                </div>
                {/* {activeFiltersInCategory.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 truncate">
                      {activeFiltersInCategory.join(', ')}
                    </p>
                  </div>
                )} */}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Premium Banner */}
        {!selectedModel && (
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Unlock Premium Content</h3>
                <p className="text-sm opacity-90">
                  Access exclusive videos, 4K quality, and no ads with Premium
                </p>
              </div>
              <button 
                onClick={() => navigate('/premium')}
                className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium shadow hover:bg-gray-100 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Featured Models Section */}
        {!selectedModel && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Popular Models
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {models.slice(0, 16).map(model => (
                <motion.div
                  key={`featured-${model.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleModelClick(model.id)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="relative mb-2 w-full aspect-square">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 text-center line-clamp-1">
                    {model.name}
                  </h3>
                  <div className="flex items-center text-xs text-yellow-500 mt-1">
                    <FaStar className="mr-1" />
                    {model.rating}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended For You Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedModel
                ? `${models.find(m => m.id === selectedModel)?.name}'s Videos`
                : selectedCategory === 'all'
                  ? 'Recommended For You'
                  : selectedCategory === 'trending'
                    ? 'Trending Videos'
                    : 'New Videos'}
            </h2>
            {filteredVideos.length > 0 && (
              <button 
                onClick={() => navigate(selectedModel ? `/model/${selectedModel}` : `/category/${selectedCategory}`)}
                className="text-sm text-pink-600 hover:underline"
              >
                View All
              </button>
            )}
          </div>

          {/* Video Grid - 4 per row */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-1.5 gap-y-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredVideos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-1.5 gap-y-6">
              {filteredVideos.slice(0, 12).map(video => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                      loading="lazy"
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
                        {video.channel} • {video.views}
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
            <div className="text-center py-16 bg-white rounded-lg">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No content found
              </h3>
              <p className="text-gray-600 mb-6">
                Try different filters or check back later
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedModel(null);
                  setActiveFilters([]);
                }}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium shadow-lg"
              >
                Reset Filters
              </motion.button>
            </div>
          )}
        </div>

        {/* Email Subscription - Moved below content */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md">
              Subscribe to our newsletter for weekly updates on new models and content
            </p>
            {isSubscribed ? (
              <div className="px-6 py-3 bg-green-100 text-green-800 rounded-lg text-sm">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {currentFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setCurrentFilterModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentFilterModal.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {activeFilters.length > 0 && (
                      <button 
                        onClick={clearAllFilters}
                        className="text-sm text-pink-600 hover:underline"
                      >
                        Clear All
                      </button>
                    )}
                    <button 
                      onClick={() => setCurrentFilterModal(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {currentFilterModal.options.map((option, i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter(option.name)}
                      className={`flex items-center p-3 rounded-lg border ${
                        activeFilters.includes(option.name)
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="mr-3 text-lg">
                        {option.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {option.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;