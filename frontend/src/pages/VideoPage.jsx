import { useState, useEffect, useRef, useReducer } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHeart, FaRegHeart, FaArrowLeft, FaShare, FaBookmark, 
  FaChevronDown, FaChevronUp, FaCog, FaExpand, FaCompress, 
  FaDownload, FaLock, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, 
  FaVolumeDown, FaStar, FaCrown 
} from 'react-icons/fa';
import YouTube from 'react-youtube';

// Video reducer for centralized state management
const videoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIDEO':
      return { 
        ...state, 
        video: { 
          ...action.payload, 
          tags: action.payload.tags || [] 
        } 
      };
    case 'SET_RECOMMENDED':
      return { ...state, recommendedVideos: action.payload };
    case 'TOGGLE_FAVORITE':
      return { ...state, isFavorite: !state.isFavorite };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_PLAY':
      return { ...state, isPlaying: action.payload };
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
    case 'SET_VOLUME':
      return { 
        ...state, 
        volume: action.payload, 
        isMuted: action.payload === 0 
      };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_PLAYBACK_SPEED':
      return { ...state, playbackSpeed: action.payload };
    case 'SET_QUALITY':
      return { ...state, quality: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PREMIUM':
      return { ...state, isPremium: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};

const initialState = {
  video: null,
  recommendedVideos: [],
  isLoading: true,
  isFavorite: false,
  isPlaying: false,
  isMuted: false,
  volume: 80,
  currentTime: 0,
  duration: 0,
  playbackSpeed: 1,
  quality: 'auto',
  isPremium: false,
  page: 1,
  totalPages: 1
};

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const [isFullscreen, setIsFullscreen] = useState(false); // ✅ Add this line
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverTimePosition, setHoverTimePosition] = useState(0);
  const [showNextUp, setShowNextUp] = useState(false);
  
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const videoContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const playerInstanceRef = useRef(null);

  const youtubeVideoId = 'dQw4w9WgXcQ';

  // Premium videos for sidebar
  const premiumVideos = [
    {
      id: 1001,
      title: "Exclusive Premium Content",
      thumbnail: "https://picsum.photos/seed/premium1/200/300",
      duration: "10:25",
      isPremium: true
    },
    {
      id: 1002,
      title: "Members Only Video",
      thumbnail: "https://picsum.photos/seed/premium2/200/300",
      duration: "15:40",
      isPremium: true
    }
  ];

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: "User123",
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
      text: "This video is amazing! The quality is top-notch.",
      timestamp: "2 hours ago",
      likes: 24
    }
  ];

  // Top videos data
  const topVideos = [
    {
      id: 2001,
      title: "Trending Now #1",
      thumbnail: "https://picsum.photos/seed/trending1/200/300",
      views: "1.2M views"
    }
  ];

  useEffect(() => {
    if (location.state?.videoData) {
      dispatch({ type: 'SET_VIDEO', payload: location.state.videoData });
      dispatch({ type: 'SET_RECOMMENDED', payload: location.state.recommendedVideos || [] });
      dispatch({ type: 'SET_LOADING', payload: false });
    } else {
      fetchVideoData();
    }

    // Check premium status
    const userIsPremium = localStorage.getItem('isPremium') === 'true';
    dispatch({ type: 'SET_PREMIUM', payload: userIsPremium });

    return () => {
      clearTimeout(controlsTimeoutRef.current);
      document.exitFullscreen?.();
    };
  }, [id, location.state]);

  const fetchVideoData = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    setTimeout(() => {
      const mockVideo = {
        id: parseInt(id),
        title: `Video Title ${id}`,
        channel: `Model ${id % 50 + 1}`,
        views: `${Math.floor(Math.random() * 500) + 50}K views`,
        timestamp: ['Just now', '5 min ago', '1 hour ago', 'Today', 'Yesterday'][id % 5],
        thumbnail: `https://picsum.photos/seed/${id}/800/450`,
        duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        rating: (Math.random() * 0.7 + 4.3).toFixed(1),
        likes: `${Math.floor(Math.random() * 300) + 50}K`,
        description: `This is a detailed description of video ${id}. It includes all the relevant information about the content.`,
        tags: [
          ['Real/Amateur', 'Professional', 'POV', 'Cartoon'][id % 4],
          ['Romantic', 'Hardcore', 'Softcore', 'Public'][id % 4]
        ]
      };

      const mockRecommendedVideos = generateRecommendedVideos(8);
      dispatch({ type: 'SET_VIDEO', payload: mockVideo });
      dispatch({ type: 'SET_RECOMMENDED', payload: mockRecommendedVideos });
      dispatch({ type: 'SET_TOTAL_PAGES', payload: 5 });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 800);
  };

  const generateRecommendedVideos = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const durations = ['5:30', '12:45', '8:20', '25:10'];
      
      return {
        id: i + 1 + (state.page - 1) * count,
        title: `Recommended video ${i + 1 + (state.page - 1) * count}`,
        channel: `Model ${(i + id) % 50 + 1}`,
        views: `${Math.floor(Math.random() * 500) + 50}K views`,
        thumbnail: `https://picsum.photos/seed/${id}${i}/300/200`,
        duration: durations[i % durations.length],
        rating: (Math.random() * 0.7 + 4.3).toFixed(1)
      };
    });
  };

  const loadPage = (pageNumber) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      const newVideos = generateRecommendedVideos(8);
      dispatch({ type: 'SET_RECOMMENDED', payload: newVideos });
      dispatch({ type: 'SET_PAGE', payload: pageNumber });
      dispatch({ type: 'SET_LOADING', payload: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const toggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE' });
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleRecommendedVideoClick = (videoId) => {
    navigate(`/video/${videoId}`, {
      state: {
        videoData: {
          ...state.recommendedVideos.find(v => v.id === videoId),
          id: videoId
        },
        recommendedVideos: state.recommendedVideos
      }
    });
    dispatch({ type: 'SET_PLAY', payload: false });
  };

  const togglePlayPause = () => {
    if (state.isPlaying) {
      playerInstanceRef.current?.pauseVideo();
    } else {
      playerInstanceRef.current?.playVideo();
    }
    resetControlsTimeout();
  };

  const toggleMute = () => {
    if (state.isMuted) {
      playerInstanceRef.current?.unMute();
      playerInstanceRef.current?.setVolume(state.volume);
    } else {
      playerInstanceRef.current?.mute();
    }
    dispatch({ type: 'TOGGLE_MUTE' });
    resetControlsTimeout();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    playerInstanceRef.current?.setVolume(newVolume);
    dispatch({ type: 'SET_VOLUME', payload: newVolume });
    resetControlsTimeout();
  };

  const handleTimeUpdate = (e) => {
    dispatch({ type: 'SET_TIME', payload: e.target.getCurrentTime() });
    dispatch({ type: 'SET_DURATION', payload: e.target.getDuration() });
    resetControlsTimeout();

    // Show next up when video is near end
    if (e.target.getDuration() > 0 && e.target.getCurrentTime() / e.target.getDuration() > 0.9) {
      setShowNextUp(true);
    } else {
      setShowNextUp(false);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * state.duration;
    playerInstanceRef.current?.seekTo(seekTime, true);
    dispatch({ type: 'SET_TIME', payload: seekTime });
    resetControlsTimeout();
  };

  const handleProgressHover = (e) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    setHoverTimePosition(position);
    setHoverTime(position * state.duration);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
    resetControlsTimeout();
  };

  const changePlaybackSpeed = (speed) => {
    playerInstanceRef.current?.setPlaybackRate(speed);
    dispatch({ type: 'SET_PLAYBACK_SPEED', payload: speed });
    resetControlsTimeout();
  };

  const changeQuality = (quality) => {
    dispatch({ type: 'SET_QUALITY', payload: quality });
    resetControlsTimeout();
  };

  const downloadVideo = () => {
    if (!state.isPremium) return;
    alert('Downloading video... (Premium feature)');
  };

  const handlePlayerReady = (e) => {
    playerInstanceRef.current = e.target;
    dispatch({ type: 'SET_DURATION', payload: e.target.getDuration() });
    e.target.setVolume(state.volume);
    e.target.setPlaybackRate(state.playbackSpeed);
    if (state.isMuted) e.target.mute();
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: state.isPlaying ? 1 : 0,
      mute: state.isMuted ? 1 : 0,
      controls: 0,
      modestbranding: 1,
      rel: 0
    },
  };

  const Pagination = () => (
    <div className="flex justify-center mt-6">
      <div className="flex gap-1">
        {Array.from({ length: state.totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => loadPage(i + 1)}
            className={`px-3 py-1 rounded ${state.page === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );

  if (state.isLoading && !state.video) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
            <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-1 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!state.video) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Video not found</h2>
          <p className="text-gray-600 mb-4">The video you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex-1">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-pink-600 hover:text-pink-800 mb-3 transition-colors text-sm"
          >
            <FaArrowLeft className="mr-1" />
            Back
          </button>

          <div className="mb-6 flex flex-col lg:flex-row gap-6" ref={videoContainerRef}>
            {/* Main Video Player */}
            <div 
              ref={videoRef}
              onMouseMove={handleMouseMove}
              className="relative bg-black rounded-xl overflow-hidden flex-1 shadow-lg"
              style={{ aspectRatio: '16/9' }}
            >
              {state.isPlaying ? (
                <YouTube
                  videoId={youtubeVideoId}
                  opts={opts}
                  onReady={handlePlayerReady}
                  onStateChange={(e) => {
                    if (e.data === YouTube.PlayerState.PLAYING) {
                      dispatch({ type: 'SET_PLAY', payload: true });
                    } else if (e.data === YouTube.PlayerState.PAUSED || e.data === YouTube.PlayerState.ENDED) {
                      dispatch({ type: 'SET_PLAY', payload: false });
                    }
                  }}
                  onPlay={() => dispatch({ type: 'SET_PLAY', payload: true })}
                  onPause={() => dispatch({ type: 'SET_PLAY', payload: false })}
                  onEnd={() => dispatch({ type: 'SET_PLAY', payload: false })}
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full"
                />
              ) : (
                <>
                  <img
                    src={state.video.thumbnail}
                    alt={state.video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={togglePlayPause}
                      className="bg-black/50 hover:bg-black/70 transition-all rounded-full p-4 hover:scale-110"
                    >
                      <FaPlay className="text-white text-2xl" />
                    </button>
                  </div>
                </>
              )}

              {/* Next Up Overlay */}
              {showNextUp && (
                <div className="absolute bottom-20 left-0 right-0 bg-black/80 p-4 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Next Up</h3>
                    <button 
                      onClick={() => setShowNextUp(false)}
                      className="text-xs opacity-70 hover:opacity-100"
                    >
                      Close
                    </button>
                  </div>
                  {state.recommendedVideos.length > 0 && (
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded"
                      onClick={() => handleRecommendedVideoClick(state.recommendedVideos[0].id)}
                    >
                      <div className="w-24 h-14 flex-shrink-0 relative">
                        <img
                          src={state.recommendedVideos[0].thumbnail}
                          alt={state.recommendedVideos[0].title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xxs px-1 py-0.5 rounded">
                          {state.recommendedVideos[0].duration}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-1">{state.recommendedVideos[0].title}</h4>
                        <p className="text-xs opacity-80">{state.recommendedVideos[0].channel}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRecommendedVideoClick(state.recommendedVideos[0].id);
                        }}
                        className="ml-auto bg-pink-600 hover:bg-pink-700 text-white rounded-full p-1"
                      >
                        <FaPlay className="text-xs" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Video Controls */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                onMouseEnter={() => resetControlsTimeout()}
              >
                {/* Progress Bar with Hover Preview */}
                <div className="relative mb-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(state.currentTime / state.duration) * 100 || 0}
                    onChange={handleSeek}
                    onMouseMove={handleProgressHover}
                    onMouseEnter={() => setHoverTime(true)}
                    onMouseLeave={() => setHoverTime(null)}
                    ref={progressBarRef}
                    className="w-full h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
                  />
                  {hoverTime !== null && (
                    <div 
                      className="absolute top-[-30px] text-xs bg-black/80 text-white px-1.5 py-0.5 rounded pointer-events-none"
                      style={{ left: `${hoverTimePosition * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {formatTime(hoverTime)}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Play/Pause Button */}
                  <button 
                    onClick={togglePlayPause} 
                    className="text-white hover:text-pink-400 transition-colors text-lg"
                    title={state.isPlaying ? 'Pause' : 'Play'}
                  >
                    {state.isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  
                  {/* Time Display */}
                  <div className="flex items-center gap-1 text-white text-sm font-mono">
                    <span>{formatTime(state.currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(state.duration)}</span>
                  </div>
                  
                  {/* Volume Controls */}
                  <div className="flex items-center group">
                    <button 
                      onClick={toggleMute}
                      className="text-white hover:text-pink-400 transition-colors text-lg"
                      title={state.isMuted ? 'Unmute' : 'Mute'}
                    >
                      {state.isMuted ? <FaVolumeMute /> : state.volume > 50 ? <FaVolumeUp /> : <FaVolumeDown />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={state.isMuted ? 0 : state.volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
                    />
                  </div>
                  
                  {/* Settings Button */}
                  <button 
                    onClick={() => setShowSettingsModal(true)}
                    className="text-white hover:text-pink-400 transition-colors text-lg"
                    title="Settings"
                  >
                    <FaCog />
                  </button>
                  
                  {/* Fullscreen */}
                  <button 
                    onClick={toggleFullscreen}
                    className="text-white hover:text-pink-400 transition-colors text-lg ml-auto"
                    title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-4 space-y-4">
                {/* Creator Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={`https://xsgames.co/randomusers/assets/avatars/female/${id % 50 + 1}.jpg`}
                        alt={state.video.channel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{state.video.channel}</h3>
                      <p className="text-xs text-gray-600">Model</p>
                    </div>
                  </div>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-medium transition-colors">
                    Follow
                  </button>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Comments ({comments.length})</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {comments.map(comment => (
                      <div key={comment.id} className="flex gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900">{comment.user}</div>
                          <p className="text-xs text-gray-700">{comment.text}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xxs text-gray-500">{comment.timestamp}</span>
                            <button className="text-xxs text-gray-500 hover:text-pink-600">
                              Like ({comment.likes})
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add a comment..."
                      className="flex-1 text-xs border border-gray-300 rounded-full px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    <button className="text-xs bg-pink-600 text-white px-3 py-1.5 rounded-full hover:bg-pink-700">
                      Post
                    </button>
                  </div>
                </div>

                {/* Top Videos */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Top Videos</h3>
                  <div className="space-y-3">
                    {topVideos.map(video => (
                      <div 
                        key={video.id}
                        className="group cursor-pointer"
                        onClick={() => handleRecommendedVideoClick(video.id)}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h3 className="mt-1 text-xs font-medium text-gray-900 line-clamp-1">{video.title}</h3>
                        <p className="text-xxs text-gray-600">{video.views}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Modal */}
          {showSettingsModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div 
                className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Video Settings</h3>
                  <button 
                    onClick={() => setShowSettingsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaChevronDown />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Playback Speed</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                        <button
                          key={speed}
                          onClick={() => {
                            changePlaybackSpeed(speed);
                            setShowSettingsModal(false);
                          }}
                          className={`py-2 rounded-lg ${state.playbackSpeed === speed ? 'bg-pink-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Quality</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['Auto', '1080p', '720p', '480p'].map(quality => (
                        <button
                          key={quality}
                          onClick={() => {
                            changeQuality(quality.toLowerCase());
                            setShowSettingsModal(false);
                          }}
                          className={`py-2 rounded-lg ${state.quality === quality.toLowerCase() ? 'bg-pink-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <button 
                      onClick={downloadVideo}
                      disabled={!state.isPremium}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${state.isPremium ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      <span>Download Video</span>
                      {!state.isPremium && <FaLock />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{state.video.title}</h1>
            
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>{state.video.views}</span>
                <span>•</span>
                <span>{state.video.timestamp}</span>
                <span>•</span>
                <div className="flex items-center text-yellow-500">
                  <FaStar className="mr-0.5 text-xs" />
                  <span>{state.video.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleFavorite}
                  className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
                  title={state.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {state.isFavorite ? <FaHeart className="text-pink-600" /> : <FaRegHeart />}
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  title="Share"
                >
                  <FaShare />
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  title="Save to watch later"
                >
                  <FaBookmark />
                </button>
                <button 
                  onClick={downloadVideo}
                  disabled={!state.isPremium}
                  className={`text-gray-600 transition-colors text-sm ${state.isPremium ? 'hover:text-gray-900' : 'opacity-50 cursor-not-allowed'}`}
                  title={state.isPremium ? 'Download video' : 'Premium feature'}
                >
                  <FaDownload />
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 mb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleDescription}
              >
                <h3 className="font-medium text-gray-900 text-sm">Details</h3>
                {isDescriptionExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${isDescriptionExpanded ? 'max-h-96 mt-2' : 'max-h-0'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={`https://xsgames.co/randomusers/assets/avatars/female/${id % 50 + 1}.jpg`}
                      alt={state.video.channel}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{state.video.channel}</h4>
                    <p className="text-xs text-gray-600">Model</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {state.video.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700 whitespace-pre-line text-xs">
                  {state.video.description}
                </p>
              </div>
            </div>
          </div>

          {/* More Videos with Pagination */}
          <div>
            <h2 className="text-md font-bold text-gray-900 mb-2">More Videos</h2>
            
            {state.recommendedVideos.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {state.recommendedVideos.map((recVideo) => (
                    <div 
                      key={recVideo.id}
                      onClick={() => handleRecommendedVideoClick(recVideo.id)}
                      className="relative group cursor-pointer"
                    >
                      <div className="aspect-video rounded overflow-hidden shadow relative">
                        <img
                          src={recVideo.thumbnail}
                          alt={recVideo.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xxs px-1 py-0.5 rounded">
                          {recVideo.duration}
                        </div>
                      </div>

                      <div className="mt-1">
                        <h3 className="text-xs font-medium text-gray-900 line-clamp-2">
                          {recVideo.title}
                        </h3>
                        <div className="text-xxs text-gray-600">
                          {recVideo.channel} • {recVideo.views}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination />
              </>
            ) : (
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">No recommended videos found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;