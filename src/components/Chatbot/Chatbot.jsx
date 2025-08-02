import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // PixelForge Studio specific prompt
  const systemPrompt = `You are PixelForge Studio's AI assistant, a creative digital agency specializing in web design, development, and digital solutions. 

  Your role is to help potential clients understand our services and capabilities. You should:

  1. **Introduce PixelForge Studio** as a modern creative agency
  2. **Explain our services**: Web Design, UI/UX, Development, Branding, Digital Marketing
  3. **Showcase our expertise** in React, modern technologies, and creative solutions
  4. **Answer questions** about our process, timeline, pricing, and portfolio
  5. **Provide helpful information** about digital transformation and creative solutions
  6. **Be professional yet friendly** - reflect our creative and innovative approach
  7. **Encourage engagement** by suggesting they view our portfolio or contact us

  Key talking points:
  - We create modern, responsive websites with stunning animations
  - Our team includes designers, developers, and digital marketers
  - We use cutting-edge technologies like React, Framer Motion, Tailwind CSS
  - We focus on user experience and creative solutions
  - We've worked with various industries and can handle complex projects

  Always be helpful, informative, and encourage potential clients to explore our work or get in touch for a consultation.`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fallback responses when API key is not configured
  const getFallbackResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('service') || lowerInput.includes('what do you do')) {
      return "At PixelForge Studio, we specialize in creating modern, responsive websites and digital solutions. Our services include web design, UI/UX design, custom development, branding, and digital marketing. We use cutting-edge technologies like React and Framer Motion to create stunning, interactive experiences. What specific service are you interested in?";
    }
    
    if (lowerInput.includes('portfolio') || lowerInput.includes('work')) {
      return "Great question! We've worked on diverse projects including e-commerce platforms, corporate websites, mobile apps, and creative portfolios. Our portfolio showcases our expertise in modern design and development. You can explore our work in the portfolio section of our website. Is there a specific type of project you'd like to discuss?";
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('pricing')) {
      return "Our pricing varies based on project scope and requirements. We offer custom quotes tailored to each client's needs. Factors include design complexity, development requirements, and timeline. We'd be happy to provide a detailed quote after understanding your specific needs. Would you like to schedule a consultation?";
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('get in touch')) {
      return "Absolutely! You can reach us through our contact form on the website, or email us directly at contact@pixelforgestudio.com. We typically respond within 24 hours and would love to discuss your project requirements. What's the best way to reach you?";
    }
    
    if (lowerInput.includes('process') || lowerInput.includes('how do you work')) {
      return "Our process is collaborative and transparent. We start with discovery and planning, then move to design and development phases. We maintain regular communication throughout the project and provide testing and launch support. The entire process typically takes 4-8 weeks depending on complexity. Would you like to know more about any specific phase?";
    }
    
    if (lowerInput.includes('technology') || lowerInput.includes('tech stack')) {
      return "We use modern, cutting-edge technologies including React, Next.js, Framer Motion for animations, Tailwind CSS for styling, and various other tools depending on project requirements. We stay updated with the latest trends to deliver the best possible solutions. What technologies are you interested in for your project?";
    }
    
    return "Thank you for your interest in PixelForge Studio! We're a creative digital agency that specializes in modern web design and development. How can I help you today? Feel free to ask about our services, portfolio, or process.";
  };

  // Real Gemini API call
  const callGeminiAPI = async (userInput) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      // Return fallback response instead of throwing error
      return getFallbackResponse(userInput);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser: ${userInput}\n\nAssistant:`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Return fallback response on API error
      return getFallbackResponse(userInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await callGeminiAPI(inputValue);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      const botMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm experiencing technical difficulties. Please email us at contact@pixelforgestudio.com and we'll get back to you within 24 hours.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Add welcome message when opening
      const welcomeMessage = {
        id: Date.now(),
        text: "Hello! I'm PixelForge Studio's AI assistant. I can help you learn about our services, portfolio, process, and more. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <>
                    {/* Chat Toggle Button - Made more visible */}
       <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
         {/* Tooltip */}
         {!isOpen && (
           <motion.div
             className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
           >
             Need help? Ask our AI
             <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
           </motion.div>
         )}
         
         <motion.button
           className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-cyan rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-white cursor-pointer"
           onClick={toggleChat}
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           style={{
             boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)'
           }}
         >
           {isOpen ? (
             <X className="w-6 h-6 text-black" />
           ) : (
             <MessageCircle className="w-6 h-6 text-black" />
           )}
         </motion.button>
       </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
                     <motion.div
             className="fixed bottom-20 right-2 sm:bottom-24 sm:right-6 w-[calc(100vw-1rem)] sm:w-80 h-[calc(100vh-6rem)] sm:h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col"
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: 20 }}
             transition={{ duration: 0.3 }}
           >
                         {/* Header */}
             <div className="bg-primary-cyan text-white p-3 sm:p-4 rounded-t-2xl">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                     <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-white text-sm sm:text-base">PixelForge Studio</h3>
                     <p className="text-xs text-white opacity-90">AI Assistant</p>
                   </div>
                 </div>
                                 <button
                   onClick={toggleChat}
                   className="text-black hover:text-gray-700 transition-colors cursor-pointer"
                 >
                   <X className="w-5 h-5" />
                 </button>
              </div>
            </div>

                         {/* Messages */}
             <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                                     <motion.div
                     className={`max-w-[85%] sm:max-w-xs px-3 py-2 sm:px-4 sm:py-2 rounded-2xl shadow-sm ${
                       message.sender === 'user'
                         ? 'bg-primary-cyan text-black'
                         : 'bg-gray-100 text-gray-600'
                     }`}
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.2 }}
                   >
                     <p className="text-xs sm:text-sm font-medium">{message.text}</p>
                     <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
                   </motion.div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-100 text-gray-800 max-w-xs px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

                         {/* Input */}
             <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-200">
               <div className="flex space-x-2">
                 <input
                   ref={inputRef}
                   type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder="Ask about our services..."
                   className="flex-1 px-2 py-2 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 text-xs sm:text-sm transition-all duration-200"
                   disabled={isLoading}
                 />
                 <motion.button
                   type="submit"
                   disabled={isLoading || !inputValue.trim()}
                   className="px-3 py-2 sm:px-4 sm:py-2 bg-primary-cyan text-white rounded-lg hover:bg-primary-cyan/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <Send className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                 </motion.button>
               </div>
             </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 