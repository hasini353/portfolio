import React from 'react';

// Components
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import JourneyTimeline from '../components/home/JourneyTimeline';
import Skills from '../components/home/Skills';
import Experience from '../components/home/Experience';
import ProjectsSummary from '../components/home/ProjectsSummary';
import Achievements from '../components/home/Achievements';
import Contact from '../components/home/Contact';

const Home = () => {
  return (
    <div className="relative bg-[#050505] text-white">
      {/* Background spotlights */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF1E1E]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#D90429]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid background layer */}
      <div className="absolute inset-0 cosmic-grid pointer-events-none opacity-20" />

      {/* 1. Hero Section */}
      <div id="home">
        <Hero />
      </div>

      {/* 2. About Section */}
      <div id="about">
        <About />
      </div>

      {/* 3. Journey Timeline Section */}
      <div id="journey">
        <JourneyTimeline />
      </div>

      {/* 4. Skills Section */}
      <div id="skills">
        <Skills />
      </div>

      {/* 5. Experience Section */}
      <div id="experience">
        <Experience />
      </div>

      {/* 6. Projects Section */}
      <div id="projects">
        <ProjectsSummary />
      </div>

      {/* 7. Achievements Section */}
      <div id="achievements">
        <Achievements />
      </div>

      {/* 8. Contact Section */}
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
