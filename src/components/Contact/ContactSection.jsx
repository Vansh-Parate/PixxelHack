import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleOnHover } from '../../utils/motionVariants';
import { useRef } from 'react';
import GoogleGeminiEffect from './Google-gemini-effect';
import { AnimatePresence } from 'framer-motion';
import { useScroll, useTransform } from 'motion/react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
 
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-white">
            
      <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>

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
            Get In <span className="text-primary-cyan">Touch</span>
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Contact Info */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-black mb-8">
                Let's Start a Conversation
              </h3>
              
              <div className="space-y-6">
                <ContactInfo
                  icon="📍"
                  title="Location"
                  content="San Francisco, CA"
                  description="Serving clients worldwide"
                />
                
                <ContactInfo
                  icon="📧"
                  title="Email"
                  content="hello@pixelforgestudio.com"
                  description="We'll respond within 24 hours"
                />
                
                <ContactInfo
                  icon="📱"
                  title="Phone"
                  content="+1 (555) 123-4567"
                  description="Available Mon-Fri, 9AM-6PM PST"
                />
                
                <ContactInfo
                  icon="💬"
                  title="Social"
                  content="@pixelforgestudio"
                  description="Follow us for updates and insights"
                />
              </div>

              {/* Social Links */}
              <motion.div
                className="mt-8 flex space-x-4"
                variants={fadeInUp}
              >
                {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    className="w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:text-primary-cyan hover:border-primary-cyan/50 transition-all duration-300"
                    variants={scaleOnHover}
                    whileHover="whileHover"
                    whileTap="whileTap"
                  >
                    {platform.charAt(0)}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <FormInput
                  label="Company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/50 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-cyan to-primary-purple text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-cyan/25 text-lg"
                  variants={scaleOnHover}
                  whileHover="whileHover"
                  whileTap="whileTap"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, title, content, description }) => {
  return (
    <motion.div
      className="flex items-start space-x-4"
      whileHover={{ x: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-12 h-12 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-lg flex items-center justify-center text-xl text-white">
        {icon}
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-black mb-1">{title}</h4>
        <p className="text-primary-cyan font-medium">{content}</p>
        <p className="text-gray-800 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const FormInput = ({ label, name, type, value, onChange, required }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/50 transition-all duration-300"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default ContactSection; 