import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock } from "react-icons/fa";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const AgeVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") setIsVerified(true);
    else document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const calculateAge = (d, m, y) => {
    const birthDate = new Date(`${m + 1}/${d}/${y}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const mDiff = today.getMonth() - birthDate.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleVerify = () => {
    if (!day || month === "" || !year) return;
    const age = calculateAge(day, month, year);
    if (age >= 18) {
      localStorage.setItem("ageVerified", "true");
      setIsVerified(true);
      document.body.classList.remove("overflow-hidden");
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  if (isVerified) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white/10 backdrop-blur-md flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#fdfcfb] rounded-2xl shadow-lg max-w-md w-full p-6 sm:p-8 border border-[#eae7e3] relative"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-4 right-4 text-[#b2927b]">
            <FaLock size={18} />
          </div>

          {/* Headline */}
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#3f342e]">
              Are You 18 or Older?
            </h2>
            <p className="text-[#5c5046] text-sm mt-2 max-w-xs mx-auto">
              This website contains content intended for adults only. Please confirm your age.
            </p>
          </div>

          {/* Birthday Input */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <select
              className="bg-white border border-[#e0d9d1] text-[#4a3f35] text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a61e4d]"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">Day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              className="bg-white border border-[#e0d9d1] text-[#4a3f35] text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a61e4d]"
              value={month}
              onChange={(e) => setMonth(e.target.selectedIndex - 1)}
            >
              <option value="">Month</option>
              {months.map((m, idx) => (
                <option key={idx} value={idx}>
                  {m}
                </option>
              ))}
            </select>

            <select
              className="bg-white border border-[#e0d9d1] text-[#4a3f35] text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a61e4d]"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Terms & Conditions */}
          <div className="text-[#6d6157] text-xs leading-relaxed text-left font-serif space-y-2 mb-6">
            <p>
              By entering, you certify that you are at least 18 years old and agree to abide by our
              Terms of Use and Privacy Policy.
            </p>
            <p>
              This website may include explicit visual, textual, and audio content that is
              inappropriate for minors. Viewer discretion is advised.
            </p>
            <p>
              We take no responsibility for any consequences that may result from unauthorized access.
              Misrepresenting your age may be illegal and could result in legal action.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleVerify}
              className="bg-[#a61e4d] text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200 hover:bg-gradient-to-r hover:from-[#a61e4d] hover:to-[#72112f] focus:outline-none"
            >
              I Am 18+
            </button>
            <button
              onClick={() => (window.location.href = "https://www.google.com")}
              className="border border-[#a61e4d] text-[#a61e4d] text-sm font-medium py-2 px-4 rounded-md transition duration-200 hover:bg-[#fcebef] focus:outline-none"
            >
              No, I'm Not
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgeVerification;
