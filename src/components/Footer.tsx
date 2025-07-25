import React from 'react';
import { Globe, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 border-t border-white/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 cross-purple-gradient rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Cross</span>
                <span className="text-sm text-gray-300 block">by Fluxel</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Africa's smartest escrow-powered business payment rail. Empowering verified African 
              businesses to securely send payments globally with AI risk engines and stablecoin escrow rails.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cross-purple-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cross-purple-300 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cross-purple-300 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-300 hover:text-cross-purple-300 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-cross-purple-300 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#security" className="text-gray-300 hover:text-cross-purple-300 transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cross-purple-300 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cross-purple-300 transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href="mailto:hello@cross.africa" className="text-gray-300 hover:text-cross-purple-300 transition-colors">
                  hello@cross.africa
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href="tel:+2348000000000" className="text-gray-300 hover:text-cross-purple-300 transition-colors">
                  +234 800 000 0000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">
                  Lagos, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Cross by Fluxel. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cross-purple-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-cross-purple-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-cross-purple-300 transition-colors">
                Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 