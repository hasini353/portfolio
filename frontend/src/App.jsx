import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';

// Page Views
import Home from './pages/Home';

const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#050505] text-[#FFFFFF] antialiased select-none selection:bg-[#FF1E1E] selection:text-white">
      {/* 1. Custom Cursor */}
      <CustomCursor />

      {/* 2. Interactive Particles Network canvas background */}
      <ParticlesBackground />

      {/* 3. Page Scroll Reset */}
      <ScrollToTop />

      {/* 4. Global sticky navigation header */}
      <Navbar />

      {/* 5. Active Page routes rendering wrapper */}
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
