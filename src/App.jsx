import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Loader from './components/Loader/Loader';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import ServicesSection from './components/Services/ServicesSection';
import PortfolioGrid from './components/Portfolio/PortfolioGrid';
import TeamSection from './components/Team/TeamSection';
import ContactSection from './components/Contact/ContactSection';
import GoogleGeminiEffect from './components/Contact/Google-gemini-effect';
import { AnimatePresence, motion } from 'framer-motion';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      
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

          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="h-[300vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          title="Get In Touch"
          description="Ready to start your next project? Let's discuss how we can bring your vision to life."
        />
      </div>
      <ContactSection />
      <Chatbot />
    </div>
  );
}

export default App;
