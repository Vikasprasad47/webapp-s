import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaMicrophone, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { BiHome } from "react-icons/bi";
import { PiRocketDuotone } from "react-icons/pi";
import { IoLibraryOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { LuMoon } from "react-icons/lu";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Improved theme detection with null check for localStorage
    if (typeof window !== 'undefined') {
      return localStorage.theme === "dark" || 
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });
  const mobileMenuRef = useRef(null);

  // Set initial dark mode with safety checks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [darkMode]);

  // Close menu when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <BiHome size={20} /> },
    { name: "Trending", path: "/trending", icon: <PiRocketDuotone size={20} /> },
    { name: "Library", path: "/library", icon: <IoLibraryOutline size={20} /> },
    { name: "Subscriptions", path: "/subscriptions", icon: <MdOutlineSubscriptions size={20} /> },
  ];

  const userMenuItems = [
    { name: "Your Channel", path: "/channel", icon: <GrChannel size={20} /> },
    { name: "History", path: "/history", icon: <MdHistory size={20} /> },
    { name: "Settings", path: "/settings", icon: <IoSettingsOutline size={20} /> },
    { name: "Sign Out", path: "/logout", icon: <IoLogOutOutline size={20} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Top Bar - Logo and Icons */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl font-bold tracking-tighter focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
            aria-label="Home"
          >
            <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              Youtube
            </span>
          </Link>

          {/* Desktop Search Bar - Centered */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for videos, channels..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-12 text-sm text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                aria-label="Search videos"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                <button 
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
                  aria-label="Voice search"
                >
                  <FaMicrophone size={16} />
                </button>
                <button 
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
                  aria-label="Search"
                >
                  <FaSearch size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun size={18} className="text-yellow-400" /> : <FaMoon size={18} className="text-indigo-400" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FaTimes size={18} className="text-red-500" />
              ) : (
                <FaBars size={18} className="text-pink-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              aria-label="Search videos"
            />
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500 focus:outline-none dark:text-gray-400"
              aria-label="Search"
            >
              <FaSearch size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl dark:bg-gray-800 md:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500"></div>
                  <span className="font-semibold">Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Close menu"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto py-2">
                <div className="space-y-1">
                  {/* Navigation Section */}
                  <div>
                    <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Navigation
                    </h3>
                    <ul className="space-y-1">
                      {navLinks.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.path}
                            className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                              location.pathname === link.path
                                ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-gray-700"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="mr-3">{link.icon}</span>
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Account Section */}
                  <div>
                    <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Account
                    </h3>
                    <ul className="space-y-1">
                      {userMenuItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className="flex items-center px-4 py-3 mx-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="mr-3">{item.icon}</span>
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dark Mode Toggle */}
                  <div className="px-4 py-2 mx-2">
                    <button
                      onClick={toggleDarkMode}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">
                          {darkMode ? <MdOutlineLightMode size={20} /> : <LuMoon size={20} />}
                        </span>
                        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
                        darkMode ? 'bg-pink-500 justify-end' : 'bg-gray-300 justify-start'
                      }`}>
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Youtube Clone
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;