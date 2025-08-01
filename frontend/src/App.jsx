import { useState } from 'react';
import Header from './components/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './pages/Footer';
import AgeVerification from './components/AgeVerification';

function App() {
  const [isVerified, setIsVerified] = useState(() => {
    return localStorage.getItem('ageVerified') === 'true';
  });

  return (
    <>
      <AgeVerification isVerified={isVerified} setIsVerified={setIsVerified} />
      
      <div className={`${!isVerified ? 'blur-sm pointer-events-none' : ''}`}>
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;