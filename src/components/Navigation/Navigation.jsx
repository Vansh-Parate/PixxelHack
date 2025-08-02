import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

     const navItems = [
     { name: 'Home', href: '#home' },
     { name: 'Services', href: '#services' },
     { name: 'Portfolio', href: '#portfolio' },
     { name: 'Team', href: '#team' },
     { name: 'Contact', href: '#contact' },
   ];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Navigation Container */}
      <div className="fixed top-0 left-0 right-0 z-40">
        {/* Full Navigation Bar - Visible at start */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.nav
              className="transition-all duration-300"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                  {/* Logo */}
                  <motion.div
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a href="#home" className="px-4 py-2 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-black font-bold text-sm uppercase border border-gray-200">
                      PixelForge Studio
                    </a>
                  </motion.div>

                  {/* Menu Button */}
                  <motion.button
                    className="px-4 py-2 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-black font-bold text-sm uppercase flex items-center gap-2 z-50 border border-gray-200 min-w-[100px] justify-center"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      key={isMenuOpen ? "close" : "menu"}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMenuOpen ? "CLOSE" : "MENU"}
                    </motion.span>
                    <motion.span
                      animate={isMenuOpen ? { rotate: 45 } : { rotate: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {isMenuOpen ? "×" : "="}
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Menu Button - Only visible when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.button
              className="absolute top-4 right-4 px-4 py-2 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-black font-bold text-sm uppercase flex items-center gap-2 z-50 border border-gray-200 min-w-[100px] justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                ease: "easeOut"
              }}
            >
              <motion.span
                key={isMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? "CLOSE" : "MENU"}
              </motion.span>
              <motion.span
                animate={isMenuOpen ? { rotate: 45 } : { rotate: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? "×" : "="}
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
                                      {/* Menu Panel */}
             <motion.div
               className="fixed top-4 right-4 h-[calc(100vh-2rem)] w-[850px] bg-white rounded-2xl shadow-2xl z-50"
               variants={menuVariants}
               initial="closed"
               animate="open"
               exit="closed"
             >
                               <div className="flex flex-col h-full overflow-hidden">
                 {/* Header with Description and Close Button */}
                 <div className="flex items-start justify-between p-8">
                   {/* Description Text */}
                   <div className="flex-1 pr-8">
                     <p className="text-gray-900 text-xl leading-relaxed">
                       We make digital products for complex challenges: from mobile apps to enterprise systems.
                     </p>
                   </div>
                   
                                       {/* Close Button */}
                    <motion.button
                      className="px-4 py-2 flex items-center gap-2 border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>CLOSE</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                 </div>

                                                      {/* Navigation Items */}
                   <div className="flex-1 px-8 overflow-y-auto">
                     <div className="space-y-0">
                       {/* Top border line */}
                       <div className="border-b-2 border-black"></div>
                       
                                               {navItems.map((item, index) => (
                                                     <motion.div
                             key={item.name}
                             className="relative overflow-hidden last:border-b-0 group"
                             variants={itemVariants}
                             whileHover={{ scale: 1.02 }}
                             transition={{ type: "spring", stiffness: 300 }}
                           >
                             <motion.div className="relative p-8 h-32">
                                                           {/* Arrow Icon - Top Right */}
                              <motion.div
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg bg-white z-20 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out"
                              >
                                <motion.svg 
                                  className='text-black w-5 h-5 group-hover:text-gray-800 group-hover:translate-x-1 transition-transform duration-200' 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  strokeWidth="2.5" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </motion.svg>
                              </motion.div>
                             
                             {/* Centered Text */}
                                                            <motion.a
                                 href={item.href}
                                 className="absolute inset-0 flex items-center justify-center text-8xl font-normal text-gray-900 group-hover:text-white transition-all duration-300 relative z-10 tracking-tight uppercase"
                                 onClick={() => setIsMenuOpen(false)}
                                                                   style={{
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    textShadow: '0 0 0 #000',
                                    WebkitTextStroke: '2px #000',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '-0.02em',
                                    lineHeight: '0.8',
                                    transform: 'translateY(20px)',
                                    transition: 'all 0.3s ease-out'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.WebkitTextFillColor = 'white';
                                    e.target.style.textShadow = 'none';
                                    e.target.style.WebkitTextStroke = 'none';
                                    e.target.style.transform = 'translateY(0px)';
                                    
                                    // Move the separation line down
                                    const line = document.getElementById(`line-${item.name}`);
                                    if (line) {
                                      line.style.transform = 'translateY(64px)';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.WebkitTextFillColor = 'transparent';
                                    e.target.style.textShadow = '0 0 0 #000';
                                    e.target.style.WebkitTextStroke = '2px #000';
                                    e.target.style.transform = 'translateY(20px)';
                                    
                                    // Move the separation line back
                                    const line = document.getElementById(`line-${item.name}`);
                                    if (line) {
                                      line.style.transform = 'translateY(0px)';
                                    }
                                  }}
                               >
                               {item.name}
                             </motion.a>
                           </motion.div>
                         
                                                   {/* Expanding background on hover */}
                          <motion.div
                            className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out ${
                              index === 0 ? 'bg-yellow-400' :
                              index === 1 ? 'bg-amber-500' :
                              index === 2 ? 'bg-lime-500' :
                              index === 3 ? 'bg-emerald-500' :
                              'bg-teal-500'
                            }`}
                          />
                         
                                                   {/* Moving separation line */}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transition-all duration-300 ease-out"
                            style={{ transform: 'translateY(0px)' }}
                            id={`line-${item.name}`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                 
               </div>
             </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 