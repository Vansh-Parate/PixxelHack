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
      features: ["Responsive Design", "Performance Optimization", "SEO Friendly"]
    },
    {
      id: 2,
      title: "Brand Identity Design",
      description: "Complete brand identity packages including logos, guidelines, and visual assets.",
      icon: "🎨",
      color: "from-primary-purple to-accent-pink",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity"]
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "User-centered design solutions that create intuitive and engaging experiences.",
      icon: "✨",
      color: "from-accent-green to-primary-cyan",
      features: ["User Research", "Prototyping", "Usability Testing"]
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions to grow your online presence and reach.",
      icon: "📈",
      color: "from-accent-orange to-accent-pink",
      features: ["Social Media", "Content Strategy", "SEO & Analytics"]
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
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-black">
            Our <span className="text-primary-cyan">Services</span>
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Comprehensive digital solutions to help your business thrive in the digital landscape
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
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
          <p className="text-lg text-gray-800 mb-8">
            Ready to start your next project?
          </p>
          <motion.button
            className="bg-gradient-to-r from-primary-cyan to-primary-purple text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-cyan/25 text-lg"
            variants={scaleOnHover}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-cyan/50 transition-all duration-300 shadow-sm hover:shadow-md"
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Icon */}
      <motion.div
        className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
        whileHover={{ rotate: 5 }}
      >
        {service.icon}
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-bold text-black mb-4 group-hover:text-primary-cyan transition-colors">
        {service.title}
      </h3>
      
      <p className="text-gray-800 mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* Features */}
      <div className="space-y-2">
        {service.features.map((feature, index) => (
          <motion.div
            key={feature}
            className="flex items-center text-sm text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-primary-cyan rounded-full mr-3"></div>
            {feature}
          </motion.div>
        ))}
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-cyan/5 to-primary-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  );
};

export default ServicesSection; 