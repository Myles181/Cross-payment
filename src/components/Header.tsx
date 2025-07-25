import React, { useState, useEffect } from 'react';
import { Menu, X, User, Shield, Globe, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (pageId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-md border-b border-white/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNavClick('demo')}>
            <div className="w-10 h-10 cross-purple-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-xl font-bold text-white group-hover:text-cross-purple-300 transition-colors">Cross</span>
              <span className="text-sm text-gray-300 group-hover:text-cross-purple-200 transition-colors">by Fluxel</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: 'demo', label: 'Interactive Demo' },
              { id: 'about', label: 'About Cross' },
              { id: 'features', label: 'Features' },
              { id: 'security', label: 'Security' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-white hover:text-cross-purple-300 transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cross-purple-300 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-cross-purple-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/10 group">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="cross-purple-gradient px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-cross-purple-500/25">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              {[
                { id: 'demo', label: 'Interactive Demo', icon: Globe },
                { id: 'about', label: 'About Cross', icon: Shield },
                { id: 'features', label: 'Features', icon: BarChart3 },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'contact', label: 'Contact', icon: User }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center space-x-3 text-white hover:text-cross-purple-300 transition-all duration-300 p-3 rounded-lg hover:bg-white/10 group"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="pt-4 border-t border-white/20">
                <button className="cross-purple-gradient w-full px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 transform">
                  Get Started
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 