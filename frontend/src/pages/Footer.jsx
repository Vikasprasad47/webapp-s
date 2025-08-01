import { FaHeart, FaTwitter, FaReddit, FaTelegram } from 'react-icons/fa';
import { MdExplore, MdStars, MdLabel, MdHelp } from 'react-icons/md';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-100 to-white pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-pink-100">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-pink-800 mb-4 font-dmsans">Explore</h3>
            <ul className="space-y-3">
              <FooterLink icon={<MdExplore />} text="Videos" />
              <FooterLink icon={<MdStars />} text="Popular Models" />
              <FooterLink icon={<MdLabel />} text="Categories & Tags" />
              <FooterLink icon={<FaHeart className="text-pink-600" />} text="Premium Content" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-pink-800 mb-4 font-dmsans">Support</h3>
            <ul className="space-y-3">
              <FooterLink icon={<MdHelp />} text="Help Center" />
              <FooterLink text="Contact Us" />
              <FooterLink text="Content Removal" />
              <FooterLink text="Safety Guidelines" />
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-pink-800 mb-4 font-dmsans">Legal</h3>
            <ul className="space-y-3">
              <FooterLink text="Terms of Service" />
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Age Verification" />
              <FooterLink text="2257 Statement" />
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-pink-800 mb-4 font-dmsans">Connect</h3>
              <div className="flex space-x-4">
                <SocialIcon icon={<FaTwitter />} />
                <SocialIcon icon={<FaReddit />} />
                <SocialIcon icon={<FaTelegram />} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pink-200 mb-8"></div>

        {/* Branding & Disclaimer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-3 shadow-sm">
              <FaHeart className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-pink-800 font-dmsans">Lustre</h2>
              <p className="text-sm text-pink-600">Pleasure, Curated for You</p>
            </div>
          </div>

          <div className="text-xs text-pink-700 text-center md:text-right max-w-md">
            <p>© {currentYear} Lustre. All rights reserved.</p>
            <p className="mt-1 italic">This site is strictly for 18+ users. All models are 18+ and consented. Viewer discretion advised.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable Footer Link Component
const FooterLink = ({ icon, text }) => (
  <motion.li 
    whileHover={{ x: 3 }}
    className="flex items-center group"
  >
    {icon && <span className="mr-2 text-pink-500">{icon}</span>}
    <a 
      href="#" 
      className="text-pink-700 hover:text-pink-900 transition-colors group-hover:underline decoration-pink-300"
    >
      {text}
    </a>
  </motion.li>
);

// Reusable Social Icon Component
const SocialIcon = ({ icon }) => (
  <motion.a 
    href="#" 
    whileHover={{ y: -3 }}
    className="w-10 h-10 bg-white border border-pink-200 hover:bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 transition-colors shadow-sm"
  >
    {icon}
  </motion.a>
);

export default Footer;