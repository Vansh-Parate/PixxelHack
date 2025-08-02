import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleOnHover } from '../../utils/motionVariants';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

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
    <footer id="contact" className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <motion.div
            className="py-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              variants={fadeInUp}
            >
              {/* Contact Info */}
              <motion.div variants={fadeInUp}>
                <motion.h3 
                  className="text-3xl font-bold text-black mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Let's Start a Conversation
                </motion.h3>
                
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
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                variants={fadeInUp}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-black mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <input
                      type="text"
                      name="company"
                      placeholder="Company (Optional)"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300 resize-none"
                      required
                    />
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/25 relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Send Message</span>
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Footer Bottom - Minimal Design */}
          <motion.div 
            className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-xs text-gray-500">© 2024 PixelForge Studio. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <a className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700" href="#">
                Terms of Service
              </a>
              <a className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700" href="#">
                Privacy Policy
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg">T</span>
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg">L</span>
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg">I</span>
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg">D</span>
                <span className="sr-only">Dribbble</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

const ContactInfo = ({ icon, title, content, description }) => {
  return (
    <motion.div
      className="flex items-start space-x-4 group"
      whileHover={{ x: 10 }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="w-12 h-12 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-lg flex items-center justify-center text-xl text-white group-hover:scale-110 transition-transform duration-300"
        whileHover={{ rotate: 5 }}
      >
        {icon}
      </motion.div>
      
      <div>
        <h4 className="text-lg font-semibold text-black mb-1">{title}</h4>
        <p className="text-primary-cyan font-medium">{content}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default ContactSection; 