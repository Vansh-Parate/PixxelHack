import { useState } from 'react';
import { motion } from 'framer-motion';

const FormInput = ({ label, name, type, value, onChange, required }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );
};

const GlassContactForm = ({ className = "" }) => {
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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('Thank you! Your message has been sent.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
  };

  return (
    <motion.div
      className={`w-full max-w-2xl mx-4 ${className} mt-20`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {/* Glass Card Container - More Transparent */}
      <div className="backdrop-blur-md bg-white/[0.03] border border-white/[0.08] rounded-xl p-8 shadow-2xl shadow-black/10">
        {/* Header with Better Spacing */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Get In <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-md mx-auto">
            Ready to start your next project? Let's discuss how we can bring your vision to life.
          </p>
        </div>

        {/* Contact Form with Better Spacing */}
        <div className="space-y-6">
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
            <label className="block text-sm font-medium text-white mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          
          <motion.button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 text-lg relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Send Message</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>


      </div>
    </motion.div>
  );
};

export default GlassContactForm;