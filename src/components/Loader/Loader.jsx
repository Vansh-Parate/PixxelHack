import { motion } from 'framer-motion';
import { loaderVariants, logoVariants, textVariants } from '../../utils/motionVariants';

const Loader = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
      variants={loaderVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={() => {
        setTimeout(onComplete, 2000);
      }}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="mb-8"
          variants={logoVariants}
        >
          <div className="relative">
            {/* Morphing shapes */}
            <motion.div
              className="absolute inset-0 w-24 h-24 mx-auto"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full opacity-20 blur-sm"></div>
            </motion.div>
            
            <motion.div
              className="absolute inset-0 w-16 h-16 mx-auto top-4"
              animate={{
                rotate: [360, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-primary-cyan rounded-lg opacity-40"></div>
            </motion.div>
            
            <motion.div
              className="absolute inset-0 w-8 h-8 mx-auto top-8"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-primary-purple rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Logo Text */}
        <motion.h1
          className="text-4xl md:text-6xl font-heading font-bold text-black mb-4"
          variants={logoVariants}
        >
          PixelForge
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 font-light"
          variants={textVariants}
        >
          Crafting Your Digital Experience...
        </motion.p>

        {/* Loading Dots */}
        <motion.div
          className="flex justify-center mt-6 space-x-2"
          variants={textVariants}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary-cyan rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader; 