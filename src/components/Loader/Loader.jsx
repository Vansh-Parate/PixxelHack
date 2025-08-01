import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [nowStyle, setNowStyle] = useState('normal');

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (delay) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1],
        delay: delay * 0.2
      }
    })
  };

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  useEffect(() => {
    // Progress animation from 0 to 100 with easing
    const duration = 4000; // 4 seconds total
    const startTime = Date.now();
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic formula
      const t = 1 - Math.pow(1 - progress, 3);
      setProgress(Math.floor(t * 100));
      
      if (progress >= 1) {
        clearInterval(progressInterval);
      }
    }, 16); // 60fps update

    // Change NOW style sequence (2 cycles of 1s each)
    const nowTimer1 = setTimeout(() => {
      setNowStyle('outline');
    }, 1000);

    const nowTimer2 = setTimeout(() => {
      setNowStyle('normal');
    }, 2000);

    const nowTimer3 = setTimeout(() => {
      setNowStyle('outline');
    }, 3000);

    const nowTimer4 = setTimeout(() => {
      setNowStyle('normal');
    }, 4000);

    // Complete loader after 4 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(nowTimer1);
      clearTimeout(nowTimer2);
      clearTimeout(nowTimer3);
      clearTimeout(nowTimer4);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const line1 = "YOUR";
  const line2 = "WEB EXPERIENCE";
  const line3 = "IS LOADING RIGHT";
  const nowText = "NOW";

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
             <div className="text-white relative w-full h-full p-4 sm:p-8 md:p-12">
         {/* Main Text Container */}
         <div className="text-left mt-8 sm:mt-16 md:mt-24 ml-4 sm:ml-8 md:ml-12">
           {/* Text Lines Container */}
           <div className="space-y-1 sm:space-y-2">
             {/* Line 1: Progress Numbers + YOUR */}
             <div className="flex flex-col sm:flex-row sm:items-start">
               <motion.div
                 variants={numberVariants}
                 initial="hidden"
                 animate="visible"
                 className="text-2xl sm:text-3xl md:text-[50px] font-serif italic text-gray-400 tracking-tight w-auto sm:w-[180px] flex-shrink-0 mb-4 sm:mb-0 sm:mr-8 md:mr-20 whitespace-nowrap"
               >
                 <span className="tabular-nums inline-block">{progress.toString().padStart(2, '0')}</span>
                 <span className="inline-block"> - 100</span>
               </motion.div>
               <motion.div
                 custom={0}
                 variants={textVariants}
                 initial="hidden"
                 animate="visible"
                 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]"
               >
                 {line1}
               </motion.div>
             </div>

             {/* Line 2: WEB EXPERIENCE */}
             <motion.div
               custom={1}
               variants={textVariants}
               initial="hidden"
               animate="visible"
               className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]"
             >
               {line2}
             </motion.div>

             {/* Line 3: IS LOADING RIGHT NOW */}
             <motion.div
               custom={2}
               variants={textVariants}
               initial="hidden"
               animate="visible"
               className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-x-5"
             >
               <span>{line3}</span>
               <AnimatePresence mode="wait">
                 <motion.span
                 key={nowStyle} // Force re-render on style change
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{
                   duration: 0.4,
                   ease: "easeInOut"
                 }}
                 className={`
                   ${nowStyle === 'outline' 
                     ? 'font-serif italic text-white font-bold tracking-wider'
                     : 'font-bold text-white'
                   }
                 `}
               >
                 {nowText}
               </motion.span>
               </AnimatePresence>
             </motion.div>
           </div>
         </div>

         {/* Subtitle */}
         <motion.div
           className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-center"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.5, duration: 0.8 }}
         >
           <p className="text-xs sm:text-sm font-light text-gray-400">
             Please wait
           </p>
           <p className="text-xs sm:text-sm font-light text-gray-400 mt-1">
             a few seconds.
           </p>
         </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;