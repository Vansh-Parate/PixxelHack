import { useState } from 'react';
import { teamMembers } from '../../utils/teamData';
import { fadeInUp, staggerContainer } from '../../utils/motionVariants';
import { motion } from 'framer-motion'

// Team images from public folder
const teamImages = {
  'alex-rivera.jpg': '/images/team/alex-rivera.jpg',
  'sarah-chen.jpg': '/images/team/sarah-chen.jpg',
  'marcus-johnson.jpg': '/images/team/marcus-johnson.jpg',
  'emily-watson.jpg': '/images/team/emily-watson.jpg',
};

const TeamSection = () => {
  return (
    <section id="team" className="py-12 md:py-20 bg-white w-full">
      <div className="w-full px-4 md:px-0">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6 text-black tracking-tight">
            Our Team
          </h2>
        </motion.div>

                                                                       {/* Team List - pixel-perfect left-aligned numbered list */}
           <motion.ul
             className="bg-white rounded-lg md:rounded-xl shadow-lg w-full max-w-6xl mx-auto space-y-2 md:space-y-4"
             variants={staggerContainer}
             initial="initial"
             whileInView="animate"
             viewport={{ once: true }}
           >
          {teamMembers.map((member, idx) => (
            <TeamMemberBlock
              key={member.id}
              member={member}
              index={idx}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

const TeamMemberBlock = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
                  <motion.li
        className="flex items-center relative group cursor-pointer transition-all duration-300 p-0 bg-white rounded-lg border-b-0 shadow-sm hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
                style={{ minHeight: '80px' }}
        variants={fadeInUp}
      >
                      {/* Blue color fill animation from top to bottom */}
         <motion.div
           className="absolute inset-0 z-0"
           initial={{ scaleY: 0 }}
           animate={isHovered ? { scaleY: 1 } : { scaleY: 0 }}
           transition={{ type: 'tween', duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
           style={{ originY: 0 }}
         >
           <div className="w-full h-full bg-blue-600 rounded-lg shadow-lg" />
         </motion.div>

                                                                                                               {/* Number */}
          <span className={`relative z-10 text-xl md:text-2xl lg:text-3xl font-mono font-bold px-3 md:px-4 lg:px-8 py-3 md:py-4 lg:py-6 select-none transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-300'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>

                               {/* Content Container */}
         <div className="relative z-10 flex items-center flex-1 px-2 md:px-0 min-w-0">
           {/* Name & subtext */}
           <div className="flex-1 min-w-0">
                        <span className={`block text-base md:text-lg lg:text-xl xl:text-2xl font-heading font-semibold ${isHovered ? 'text-white' : 'text-black'}`}>
                {member.name}
              </span>
                            {/* Hide subtext (bio) on hover */}
               {!isHovered && (
                 <span className="block text-xs md:text-sm lg:text-base font-mono mt-1 md:mt-2 text-gray-500 truncate">
                   {member.bio}
                 </span>
               )}
           </div>

                                   {/* Profile Image - Appears on hover, much larger size */}
          <motion.div
            className="absolute right-1/2 top-1/2 -translate-y-1/2 z-20 md:right-1/2 md:top-1/2 md:-translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <div className="size-32 md:size-50 rounded-full overflow-hidden bg-gradient-to-br from-pink-200 to-orange-200 flex items-center justify-center shadow-xl border-4 border-white">
              <img
                src={teamImages[member.image] || ''}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span className="text-2xl font-bold text-gray-700 hidden">{member.name.charAt(0)}</span>
            </div>
          </motion.div>
      </div>

                                                                                                               {/* Position at right extreme */}
          <span className={`relative z-10 text-xs md:text-sm lg:text-base font-mono px-2 md:px-4 lg:px-6 py-3 md:py-4 lg:py-6 flex-shrink-0 ${isHovered ? 'text-white' : 'text-blue-600'}`}>
            {member.role}
          </span>
    </motion.li>
  );
};

export default TeamSection; 