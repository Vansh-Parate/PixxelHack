import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { projects } from '../../utils/projectData';
import { fadeInUp, staggerContainer, scaleOnHover } from '../../utils/motionVariants';

const PortfolioGrid = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorText, setCursorText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);
  const controls = useAnimation();
  const animationStartTime = useRef(null);
  const animationDuration = 50; // seconds

  const handleMouseMove = (e) => {
    if (cursorText) {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    }
  };

  const startAnimation = () => {
    animationStartTime.current = Date.now();
    controls.start({
      x: "-50%",
      transition: {
        duration: animationDuration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  };

  const handleProjectHover = (projectId) => {
    setHoveredProject(projectId);
    setCursorText('View Project');
    setIsPaused(true);
    controls.stop();
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
    setCursorText('');
    setIsPaused(false);
    
    // Calculate elapsed time and remaining time
    const elapsedTime = (Date.now() - animationStartTime.current) / 1000;
    const remainingTime = animationDuration - (elapsedTime % animationDuration);
    
    // Calculate progress (0 to 1)
    const progress = (elapsedTime % animationDuration) / animationDuration;
    
    // Calculate current position
    const currentX = -(progress * 50); // 50% is the total distance
    
    // Resume animation from current position
    controls.start({
      x: "-50%",
      transition: {
        duration: remainingTime,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  };

  useEffect(() => {
    // Start initial animation
    startAnimation();
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-black">
            Our <span className="text-primary-cyan">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Explore our latest projects and see how we bring creative visions to life
          </p>
        </motion.div>

        {/* Single Row with All Cards - Mobile and Laptop */}
        <div className="page2_top overflow-hidden">
          <motion.div
            ref={animationRef}
            className="page2_subtop flex gap-4 lg:gap-6"
            initial={{ x: 0 }}
            animate={controls}
            style={{
              width: "fit-content",
              minWidth: "200%"
            }}
          >
            {/* First set of all cards */}
            {projects.map((project, index) => (
              <div
                key={`first-${project.id}`}
                className="w-72 lg:w-80 flex-shrink-0"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isHovered={hoveredProject === project.id}
                  onHover={handleProjectHover}
                  onLeave={handleProjectLeave}
                  rowIndex={0}
                  cardIndex={index}
                  isPaused={isPaused}
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {projects.map((project, index) => (
              <div
                key={`second-${project.id}`}
                className="w-72 lg:w-80 flex-shrink-0"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isHovered={hoveredProject === project.id}
                  onHover={handleProjectHover}
                  onLeave={handleProjectLeave}
                  rowIndex={0}
                  cardIndex={index}
                  isPaused={isPaused}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Custom Cursor */}
        <AnimatePresence>
          {cursorText && (
            <motion.div
              className="custom-cursor fixed pointer-events-none z-50 bg-primary-cyan text-white px-4 py-2 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cursorText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mouse Move Listener */}
      <div
        className="fixed inset-0 pointer-events-none"
        onMouseMove={handleMouseMove}
      />
    </section>
  );
};

const ProjectCard = ({ project, index, isHovered, onHover, onLeave, rowIndex, cardIndex, isPaused }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white border-2 border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
      whileHover={{ 
        scale: 0.95,
        z: 10
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onLeave}
    >
      {/* Project Image */}
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20">
        {/* Image */}
        <img
          src={`/src/assets/${project.image}`}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Try different extensions if the original fails
            const originalSrc = e.target.src;
            const baseName = originalSrc.split('/').pop().split('.')[0];
            const extensions = ['webp', 'jpg', 'jpeg', 'png', 'avif'];
            
            for (let ext of extensions) {
              if (ext !== originalSrc.split('.').pop()) {
                const newSrc = originalSrc.replace(/\.[^/.]+$/, `.${ext}`);
                e.target.src = newSrc;
                return;
              }
            }
            
            // If all extensions fail, hide image and show fallback
            e.target.style.display = 'none';
            const fallback = e.target.nextSibling;
            if (fallback) {
              fallback.style.display = 'block';
            }
          }}
        />
        
        {/* Fallback Gradient (hidden by default) */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20"
          style={{ display: 'none' }}
        />
        
        {/* Overlay Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Project Number */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-primary-cyan rounded-full flex items-center justify-center text-sm font-bold text-white z-10">
          {index + 1}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-primary-purple/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white z-10">
          {project.category}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-bold mb-2 text-black group-hover:text-primary-cyan transition-colors"
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h3>
        
        <p className="text-gray-800 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 border-2 border-gray-200 rounded text-xs text-gray-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Client & Year */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="absolute bottom-6 left-6 right-6">
          <motion.button
            className="w-full bg-primary-cyan text-white py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Project
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioGrid; 