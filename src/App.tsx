import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import InteractiveDemo from './components/InteractiveDemo';
import ConfirmationPage from './components/ConfirmationPage';
import About from './components/About';
import Features from './components/Features';
import Security from './components/Security';
import Contact from './components/Contact';

type Page = 'demo' | 'about' | 'features' | 'security' | 'contact';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('demo');
  const location = useLocation();

  // Handle navigation from header
  const handleNavigation = (pageId: string) => {
    if (pageId === 'demo') {
      setCurrentPage('demo');
    } else if (pageId === 'about') {
      setCurrentPage('about');
    } else if (pageId === 'features') {
      setCurrentPage('features');
    } else if (pageId === 'security') {
      setCurrentPage('security');
    } else if (pageId === 'contact') {
      setCurrentPage('contact');
    }
  };

  // Listen for navigation events from header
  useEffect(() => {
    const handleNavClick = (event: CustomEvent) => {
      handleNavigation(event.detail);
    };

    window.addEventListener('nav-click', handleNavClick as EventListener);
    return () => {
      window.removeEventListener('nav-click', handleNavClick as EventListener);
    };
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'demo':
        return <InteractiveDemo />;
      case 'about':
        return <About />;
      case 'features':
        return <Features />;
      case 'security':
        return <Security />;
      case 'contact':
        return <Contact />;
      default:
        return <InteractiveDemo />;
    }
  };

  return (
    <div className="min-h-screen cross-gradient-bg">
      <Header onNavigate={handleNavigation} />
      <div className="pt-16"> {/* Add padding-top to account for fixed header */}
        {renderCurrentPage()}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/confirm/:referenceId" element={<ConfirmationPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
