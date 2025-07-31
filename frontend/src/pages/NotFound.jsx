import { useNavigate } from 'react-router-dom';
import { FiAlertCircle, FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-br from-red-100 via-red-200 to-red-300 py-10 px-8 text-center border-b border-red-300">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-red-400 rounded-full blur-xl opacity-20"></div>
              <FiAlertCircle className="relative text-6xl text-red-600" />
            </div>
          </div>

          <h1 className="text-[64px] font-extrabold leading-none tracking-tight text-red-700">
            404
          </h1>
          <p className="mt-2 text-[15px] uppercase tracking-widest font-semibold text-red-500">
            Not that kind of hidden page
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 text-center">
          <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
            The page you’re looking for doesn’t exist, or maybe it’s just too hot to handle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-5 py-3.5 border border-red-300 rounded-xl text-red-600 hover:bg-red-50 transition"
            >
              <FiArrowLeft />
              Go Back
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition"
            >
              <FiHome />
              Home
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-red-50 px-6 py-4 text-center border-t border-red-200">
          <p className="text-xs text-red-400">
            © {new Date().getFullYear()} <span className="font-semibold">RedVibe™</span> • 
            <a href="/support" className="ml-1 hover:underline text-red-600">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
