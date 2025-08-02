import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/motionVariants';
import { useState, useRef } from 'react';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  
  // Scroll-based text scaling
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Magnetic effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      mouseX.set(x * 0.1);
      mouseY.set(y * 0.1);
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Enhanced Background Elements with Magnetic Effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-primary-cyan rounded-full blur-3xl"
          style={{ x: springX, y: springY }}
          animate={{ scale: isHovering ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-primary-purple rounded-full blur-3xl"
          style={{ x: springX.get() * -0.5, y: springY.get() * -0.5 }}
          animate={{ scale: isHovering ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary-blue rounded-full blur-3xl"
          style={{ x: springX.get() * 0.3, y: springY.get() * 0.3 }}
          animate={{ scale: isHovering ? 1.15 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          {/* Enhanced Main Title with Magnetic Effect */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 cursor-default"
            style={{ scale: textScale, opacity: textOpacity }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="text-primary-cyan inline-block"
              whileHover={{ 
                scale: 1.05,
                color: "#00ffff",
                textShadow: "0 0 20px rgba(0, 255, 255, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              PixelForge
            </motion.span>
            <br />
            <motion.span 
              className="text-black inline-block"
              whileHover={{ 
                scale: 1.05,
                color: "#000000",
                textShadow: "0 0 20px rgba(0, 0, 0, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Studio
            </motion.span>
          </motion.h1>

          {/* Enhanced Subtitle with Typing Effect */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-black mb-8 font-light"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Crafting Digital Experiences That Inspire
            </motion.span>
          </motion.p>

          {/* Enhanced Description with Staggered Text */}
          <motion.p
            className="text-lg text-gray-800 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              We're a team of creative professionals passionate about bringing digital visions to life through innovative design and cutting-edge technology.
            </motion.span>
          </motion.p>

          {/* Enhanced CTA Button with Advanced Microinteractions */}
          <motion.div
            className="flex justify-center mb-16"
            variants={fadeInUp}
          >
            <motion.button
              className="bg-black text-white px-10 py-4 rounded-lg font-medium text-lg relative overflow-hidden group cursor-pointer"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ 
                scale: 0.95,
                y: 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* Enhanced Button Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-primary-purple opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              
              {/* Button Text with Glow Effect */}
              <motion.span 
                className="relative z-10"
                whileHover={{ 
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
                }}
              >
                Get in Touch
              </motion.span>
              
              {/* Enhanced Ripple Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ 
                  scale: [0, 1.4, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  background: "radial-gradient(circle, white 0%, transparent 70%)"
                }}
              />
              
              {/* Magnetic Particles */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer"
              whileHover={{ 
                borderColor: "#00ffff",
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
              }}
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.div
                className="w-1 h-3 bg-primary-cyan rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 