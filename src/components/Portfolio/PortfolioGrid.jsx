import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../utils/projectData';
import { fadeInUp, staggerContainer, scaleOnHover } from '../../utils/motionVariants';

const PortfolioGrid = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorText, setCursorText] = useState('');

  const handleMouseMove = (e) => {
    if (cursorText) {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    }
  };

  const handleProjectHover = (projectId) => {
    setHoveredProject(projectId);
    setCursorText('View Project');
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
    setCursorText('');
  };

  return (
    <section id="portfolio" className="py-20 bg-white">
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

        {/* Portfolio Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={handleProjectHover}
              onLeave={handleProjectLeave}
            />
          ))}
        </motion.div>

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

const ProjectCard = ({ project, index, isHovered, onHover, onLeave }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white border-2 border-gray-200 shadow-sm hover:shadow-md"
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onLeave}
    >
      {/* Project Image Placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 to-primary-purple/10"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Project Number */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-primary-cyan rounded-full flex items-center justify-center text-sm font-bold text-white">
          {index + 1}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-primary-purple/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
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