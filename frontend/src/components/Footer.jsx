import React, { useState, useEffect } from 'react';
import { Separator } from './ui/separator';
import { Loader2 } from 'lucide-react';
import { profileAPI } from '../services/api';

const Footer = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profileData = await profileAPI.get();
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
              By {profile?.name || 'Ashin Krishna'} - Creating exceptional visual designs that make an impact.
            </p>
            <div className="flex space-x-4">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => handleExternalLink(`mailto:${profile?.email || 'ashin.krishna@example.com'}`)}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Email
                  </button>
                  <button 
                    onClick={() => handleExternalLink(profile?.linkedin || 'https://linkedin.com/in/ashin-krishna')}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    LinkedIn
                  </button>
                  <button 
                    onClick={() => handleExternalLink(profile?.behance || 'https://behance.net/ashin-krishna')}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Behance
                  </button>
                </>
              )}
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
            © {currentYear} {profile?.name || 'Ashin Krishna'}. All rights reserved.
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