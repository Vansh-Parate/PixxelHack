import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teamMembers } from '../../utils/teamData';
import { fadeInUp, staggerContainer } from '../../utils/motionVariants';

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  return (
    <section id="team" className="py-20 bg-gray-50">
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
            Meet Our <span className="text-primary-cyan">Team</span>
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            The creative minds behind every successful project
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              member={member}
              isHovered={hoveredMember === member.id}
              onHover={() => setHoveredMember(member.id)}
              onLeave={() => setHoveredMember(null)}
            />
          ))}
        </motion.div>

        {/* Photo Pop-up */}
        <AnimatePresence>
          {hoveredMember && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHoveredMember(null)}
            >
              <motion.div
                className="relative max-w-md w-full mx-4 bg-white rounded-xl overflow-hidden shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Member Photo Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 to-primary-purple/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary-cyan rounded-full flex items-center justify-center text-2xl font-bold text-white">
                      {teamMembers.find(m => m.id === hoveredMember)?.name.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {teamMembers.find(m => m.id === hoveredMember)?.name}
                  </h3>
                  <p className="text-primary-cyan font-medium mb-4">
                    {teamMembers.find(m => m.id === hoveredMember)?.role}
                  </p>
                  <p className="text-gray-800 mb-4 leading-relaxed">
                    {teamMembers.find(m => m.id === hoveredMember)?.bio}
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {teamMembers.find(m => m.id === hoveredMember)?.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary-cyan/20 text-primary-cyan rounded-full text-sm border-2 border-primary-cyan/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const TeamMember = ({ member, isHovered, onHover, onLeave }) => {
  return (
    <motion.div
      className="text-center group cursor-pointer"
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Member Avatar */}
      <motion.div
        className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border-4 border-gray-200"
        animate={{
          scale: isHovered ? 1.1 : 1,
          borderColor: isHovered ? '#00d4ff' : '#e5e7eb',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 to-primary-purple/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary-cyan rounded-full flex items-center justify-center text-xl font-bold text-white">
            {member.name.charAt(0)}
          </div>
        </div>
        
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-primary-cyan/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Member Info */}
      <motion.h3
        className="text-xl font-bold text-black mb-2"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {member.name}
      </motion.h3>
      
      <motion.p
        className="text-primary-cyan font-medium mb-3"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        {member.role}
      </motion.p>
      
      <motion.p
        className="text-gray-800 text-sm leading-relaxed"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {member.bio}
      </motion.p>

      {/* Hover Indicator */}
      <motion.div
        className="mt-4 text-primary-cyan text-sm font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10
        }}
        transition={{ duration: 0.3 }}
      >
        Click to learn more
      </motion.div>
    </motion.div>
  );
};

export default TeamSection; 