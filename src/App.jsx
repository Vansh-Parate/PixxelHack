import React from "react";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScroll, useTransform } from 'motion/react';

import Loader from './components/Loader/Loader';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import ServicesSection from './components/Services/ServicesSection';
import PortfolioGrid from './components/Portfolio/PortfolioGrid';
import TeamSection from './components/Team/TeamSection';
import ContactSection from './components/Contact/ContactSection';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';


function App() {
  const [isLoading, setIsLoading] = useState(true);


  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Loader */}
      <AnimatePresence>
        {isLoading && (
          <Loader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation />
            <Hero />
            <ServicesSection />
            <PortfolioGrid />
            <TeamSection />
            <ContactSection />

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
