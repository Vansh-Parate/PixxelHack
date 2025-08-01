import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInDown, scaleOnHover } from '../../utils/motionVariants';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
      variants={fadeInDown}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            variants={scaleOnHover}
            whileHover="whileHover"
          >
            <a href="#home" className="text-2xl md:text-3xl font-heading font-bold text-primary-cyan">
              PixelForge
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-cyan transition-colors duration-300 font-medium"
                variants={scaleOnHover}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                {item.name}
              </motion.a>
            ))}
            
            <motion.button
              className="bg-gradient-to-r from-primary-cyan to-primary-purple text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-cyan/25"
              variants={scaleOnHover}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variants={scaleOnHover}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}></span>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-primary-cyan transition-colors duration-300 font-medium px-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  className="bg-gradient-to-r from-primary-cyan to-primary-purple text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-cyan/25 mx-4 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation; 