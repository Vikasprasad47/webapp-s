// src/pages/Home.jsx
import { Link } from "react-router-dom";

const fakeVideos = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `🔥 Video Title #${i + 1}`,
  views: `${Math.floor(Math.random() * 900) + 100}K`,
  thumb: `https://source.unsplash.com/random/400x250?sig=${i}&blur`,
}));

const Home = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-500 mb-6">Trending 🔥</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {fakeVideos.map((video) => (
          <Link
            to={`/watch/${video.id}`}
            key={video.id}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] hover:shadow-pink-500/30 transition-all duration-200"
          >
            <img src={video.thumb} alt={video.title} className="w-full object-cover h-48" />
            <div className="p-3">
              <h2 className="text-white text-md font-semibold truncate">{video.title}</h2>
              <p className="text-zinc-400 text-sm">{video.views} views</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
