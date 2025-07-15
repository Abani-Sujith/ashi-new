import React from 'react';
import { Separator } from './ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio 2025
            </h3>
            <p className="text-gray-400 mb-4">
              By Ashin Krishna - Creating exceptional visual designs that make an impact.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => window.open('mailto:ashin.krishna@example.com')}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Email
              </button>
              <button 
                onClick={() => window.open('https://linkedin.com/in/ashin-krishna')}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                LinkedIn
              </button>
              <button 
                onClick={() => window.open('https://behance.net/ashin-krishna')}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Behance
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>CV Design</li>
              <li>Brand Identity</li>
              <li>Social Media Templates</li>
              <li>Logo Design</li>
              <li>Print Design</li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Ashin Krishna. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Designed with passion and creativity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;