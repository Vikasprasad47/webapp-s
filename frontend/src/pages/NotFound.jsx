import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {/* Custom Width Container - Adjust max-w-[] value as needed */}
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        
        {/* Visual Header with Gradient */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 py-10 px-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-amber-200 rounded-full opacity-20 blur-sm"></div>
              <FiAlertTriangle className="relative text-5xl text-amber-600" />
            </div>
          </div>
          
          {/* Typography Hierarchy */}
          <div className="space-y-2">
            <h1 className="text-[77px] font-bold text-gray-900 leading-none">404</h1>
            <div className="w-20 h-0.5 bg-amber-400/80 mx-auto"></div>
            <h2 className="text-lg font-medium text-gray-700 uppercase tracking-[0.15em] mt-3">
              Page Not Found
            </h2>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          <p className="text-gray-600 mb-10 text-center text-[15px] leading-relaxed max-w-[300px] mx-auto">
            The page you requested cannot be located. It may have been moved or no longer exists.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50/80 transition-colors"
            >
              <FiArrowLeft className="text-gray-500" />
              <span>Go Back</span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-gray-900 rounded-xl text-white font-medium hover:bg-gray-800 transition-colors"
            >
              <FiHome />
              <span>Home</span>
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500 tracking-wide">
            © {new Date().getFullYear()} Your Brand • 
            <a href="/support" className="text-gray-700 font-medium hover:underline ml-1">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;