import { useState, useRef } from 'react';
import { FaFire, FaMusic, FaGamepad, FaFilm, FaNewspaper, FaFutbol, FaLightbulb, FaSearch, FaRandom } from 'react-icons/fa';
import { IoMdTrendingUp, IoMdTime } from 'react-icons/io';
import { GiClothes, GiQueenCrown } from 'react-icons/gi';
import { BsPersonVideo, BsCollectionPlay, BsThreeDotsVertical, BsFillPlayFill } from 'react-icons/bs';
import { RiLiveFill } from 'react-icons/ri';
import { MdOutlineWatchLater, MdOutlineSlowMotionVideo } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  // Model categories
  const modelCategories = [
    { id: 'all', name: 'All', icon: <BsCollectionPlay /> },
    { id: 'trending', name: 'Trending', icon: <IoMdTrendingUp /> },
    { id: 'music', name: 'Music', icon: <FaMusic /> },
    { id: 'gaming', name: 'Gaming', icon: <FaGamepad /> },
    { id: 'movies', name: 'Movies', icon: <FaFilm /> },
    { id: 'news', name: 'News', icon: <FaNewspaper /> },
    { id: 'sports', name: 'Sports', icon: <FaFutbol /> },
    { id: 'learning', name: 'Learning', icon: <FaLightbulb /> },
    { id: 'fashion', name: 'Fashion', icon: <GiClothes /> },
    { id: 'celebrities', name: 'Celebrities', icon: <BsPersonVideo /> },
    { id: 'live', name: 'Live', icon: <RiLiveFill /> },
    { id: 'premium', name: 'Premium', icon: <GiQueenCrown /> }
  ];

  // Video types
  const videoTypes = [
    { id: 'all', name: 'All Videos' },
    { id: 'shorts', name: 'Shorts', icon: <MdOutlineSlowMotionVideo /> },
    { id: 'longform', name: 'Long-form' },
    { id: '4k', name: '4K' },
    { id: 'recent', name: 'Recently Added', icon: <IoMdTime /> },
    { id: 'watched', name: 'Watched', icon: <MdOutlineWatchLater /> },
    { id: 'random', name: 'Random', icon: <FaRandom /> }
  ];

  // Celebrities data
  const celebrities = [
    { id: 1, name: 'Emma Watson', image: 'https://randomuser.me/api/portraits/women/1.jpg', videos: 24 },
    { id: 2, name: 'Tom Holland', image: 'https://randomuser.me/api/portraits/men/1.jpg', videos: 18 },
    { id: 3, name: 'Beyoncé', image: 'https://randomuser.me/api/portraits/women/2.jpg', videos: 42 },
    { id: 4, name: 'Chris Hemsworth', image: 'https://randomuser.me/api/portraits/men/2.jpg', videos: 31 },
    { id: 5, name: 'Taylor Swift', image: 'https://randomuser.me/api/portraits/women/3.jpg', videos: 56 },
    { id: 6, name: 'Dwayne Johnson', image: 'https://randomuser.me/api/portraits/men/3.jpg', videos: 29 },
    { id: 7, name: 'Zendaya', image: 'https://randomuser.me/api/portraits/women/4.jpg', videos: 37 },
    { id: 8, name: 'Robert Downey Jr.', image: 'https://randomuser.me/api/portraits/men/4.jpg', videos: 22 },
    { id: 9, name: 'Ariana Grande', image: 'https://randomuser.me/api/portraits/women/5.jpg', videos: 48 },
    { id: 10, name: 'Ryan Reynolds', image: 'https://randomuser.me/api/portraits/men/5.jpg', videos: 33 }
  ];

  // Mock video data
  const videos = [
    {
      id: 1,
      title: 'How to build a React app in 10 minutes',
      channel: 'CodeMaster',
      views: '1.2M views',
      timestamp: '3 days ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '10:30',
      category: 'learning'
    },
    {
      id: 2,
      title: 'Top 10 Fashion Trends 2023',
      channel: 'FashionTV',
      views: '3.4M views',
      timestamp: '1 week ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '8:45',
      category: 'fashion'
    },
    {
      id: 3,
      title: 'Breaking News: Latest Updates',
      channel: 'News24',
      views: '5.6M views',
      timestamp: '2 hours ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '15:20',
      category: 'news'
    },
    {
      id: 4,
      title: 'Gaming Tournament Finals',
      channel: 'GamePro',
      views: '2.1M views',
      timestamp: '5 days ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '45:10',
      category: 'gaming'
    },
    {
      id: 5,
      title: 'Celebrity Interview Exclusive',
      channel: 'StarTalk',
      views: '7.8M views',
      timestamp: '1 day ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '22:15',
      category: 'celebrities'
    },
    {
      id: 6,
      title: 'Learn Guitar in 30 Days',
      channel: 'MusicMasters',
      views: '1.5M views',
      timestamp: '3 weeks ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '12:40',
      category: 'music'
    },
    {
      id: 7,
      title: 'Movie Review: Blockbuster Hit',
      channel: 'FilmCritic',
      views: '4.3M views',
      timestamp: '4 days ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '18:25',
      category: 'movies'
    },
    {
      id: 8,
      title: 'Sports Highlights of the Week',
      channel: 'SportsCenter',
      views: '6.7M views',
      timestamp: '2 days ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '9:50',
      category: 'sports'
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideoType, setSelectedVideoType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCelebrity, setSelectedCelebrity] = useState(null);
  const sliderRef = useRef();

  // Slider settings for celebrity carousel
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Filter videos based on selections
  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCelebrity = !selectedCelebrity || video.celebrityId === selectedCelebrity;
    
    return matchesCategory && matchesSearch && matchesCelebrity;
  });

  const handleCelebrityClick = (celebrityId) => {
    setSelectedCelebrity(celebrityId === selectedCelebrity ? null : celebrityId);
    setSelectedCategory('celebrities');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-10">
      {/* Model Filter Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 hide-scrollbar">
            {modelCategories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedCelebrity(null);
                }}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg min-w-fit transition-colors ${
                  selectedCategory === category.id && !selectedCelebrity
                    ? 'bg-pink-100 text-pink-600 dark:bg-gray-700 dark:text-pink-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg mb-1">{category.icon}</span>
                <span className="text-xs">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Celebrities Section */}
        <div className="px-4 pt-4 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Popular Celebrities</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {celebrities.sort((a, b) => b.videos - a.videos).slice(0, 6).map(celebrity => (
              <button
                key={`popular-${celebrity.id}`}
                onClick={() => handleCelebrityClick(celebrity.id)}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={celebrity.image}
                  alt={celebrity.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-pink-500 mb-2"
                />
                <h3 className="font-medium text-gray-900 dark:text-white text-center line-clamp-1">{celebrity.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{celebrity.videos} videos</p>
              </button>
            ))}
          </div>
        </div>

      {/* Video Grid */}
      <div className="px-4 py-6">
        {/* Section Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {selectedCelebrity
              ? `${celebrities.find(c => c.id === selectedCelebrity)?.name}'s Videos`
              : selectedCategory === 'all'
                ? 'Recommended Videos'
                : `${modelCategories.find(c => c.id === selectedCategory)?.name} Videos`}
          </h2>
          {filteredVideos.length > 0 && (
            <button className="text-sm text-pink-600 dark:text-pink-400 hover:underline">
              See all
            </button>
          )}
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredVideos.map(video => (
              <div key={video.id} className="group relative">
                {/* Video Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <BsFillPlayFill className="text-white text-4xl transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                  {video.isLive && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                      <RiLiveFill className="mr-1" /> LIVE
                    </div>
                  )}
                </div>
                
                {/* Video Info */}
                <div className="mt-2 flex">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 text-sm">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {video.channel}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 space-x-2">
                      <span>{video.views}</span>
                      <span>•</span>
                      <span>{video.timestamp}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2">
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              {selectedCelebrity
                ? `No videos found for ${celebrities.find(c => c.id === selectedCelebrity)?.name}`
                : 'No videos match your filters'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try changing your filters or search for something else
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedVideoType('all');
                setSelectedCelebrity(null);
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-sm font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;