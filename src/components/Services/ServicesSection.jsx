import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleOnHover } from '../../utils/motionVariants';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Web Design & Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      icon: "💻",
      color: "from-primary-cyan to-primary-blue",
      features: ["Responsive Design", "Performance Optimization", "SEO Friendly"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Brand Identity Design",
      description: "Complete brand identity packages including logos, guidelines, and visual assets.",
      icon: "🎨",
      color: "from-primary-purple to-accent-pink",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "User-centered design solutions that create intuitive and engaging experiences.",
      icon: "✨",
      color: "from-accent-green to-primary-cyan",
      features: ["User Research", "Prototyping", "Usability Testing"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions to grow your online presence and reach.",
      icon: "📈",
      color: "from-accent-orange to-accent-pink",
      features: ["Social Media", "Content Strategy", "SEO & Analytics"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold mb-6 text-black"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-primary-cyan">Services</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-800 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive digital solutions to help your business thrive in the digital landscape
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-lg text-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to start your next project?
          </motion.p>
          <motion.button
            className="bg-black text-white px-10 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/25 text-lg relative overflow-hidden group"
            variants={scaleOnHover}
            whileHover="whileHover"
            whileTap="whileTap"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Get Started Today</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-cyan/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2"
      variants={fadeInUp}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      {/* Floating Background Elements */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, ${service.gradient})`
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Icon with Enhanced Animation */}
      <motion.div
        className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}
        whileHover={{ 
          rotate: [0, -10, 10, 0],
          scale: 1.1
        }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 200
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {service.icon}
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.h3 
        className="text-xl font-bold text-black mb-4 group-hover:text-primary-cyan transition-colors duration-300"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {service.title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-800 mb-6 leading-relaxed"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {service.description}
      </motion.p>

      {/* Features with Staggered Animation */}
      <div className="space-y-2">
        {service.features.map((feature, featureIndex) => (
          <motion.div
            key={feature}
            className="flex items-center text-sm text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ 
              delay: 0.4 + (featureIndex * 0.1),
              duration: 0.5,
              type: "spring", 
              stiffness: 300
            }}
          >
            <motion.div 
              className="w-2 h-2 bg-primary-cyan rounded-full mr-3"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: featureIndex * 0.3
              }}
            />
            {feature}
          </motion.div>
        ))}
      </div>

      {/* Hover Overlay Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-cyan/5 to-primary-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      {/* Border Animation */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent"
        style={{
          background: `linear-gradient(45deg, ${service.gradient})`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ServicesSection; 