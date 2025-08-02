import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import ServicesSection from './components/Services/ServicesSection';
import PortfolioGrid from './components/Portfolio/PortfolioGrid';
import TeamSection from './components/Team/TeamSection';
import ContactSection from './components/Contact/ContactSection';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navigation />
      <Hero />
      <ServicesSection />
      <PortfolioGrid />
      <TeamSection />
      <ContactSection />
      <Chatbot />
    </div>
  );
}

export default App;
