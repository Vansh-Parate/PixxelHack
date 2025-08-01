import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/motionVariants';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  
  // Scroll-based text scaling
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-cyan rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary-purple rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary-blue rounded-full blur-3xl"></div>
      </motion.div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          {/* Main Title with Scroll Animation */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6"
            style={{ scale: textScale, opacity: textOpacity }}
          >
            <span className="text-primary-cyan">PixelForge</span>
            <br />
            <span className="text-black">Studio</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-black mb-8 font-light"
            variants={fadeInUp}
          >
            Crafting Digital Experiences That Inspire
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-800 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            We're a team of creative professionals passionate about bringing digital visions to life through innovative design and cutting-edge technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <motion.button
              className="bg-gradient-to-r from-primary-cyan to-primary-purple text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-cyan/25 text-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              View Our Work
            </motion.button>
            
            <motion.button
              className="border-2 border-primary-cyan text-primary-cyan px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-primary-cyan hover:text-white text-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-primary-cyan rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 