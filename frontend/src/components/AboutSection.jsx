import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, Palette, Users, Award } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = () => {
    // Mock download functionality
    console.log('Downloading CV...');
  };

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Profile */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-300"></div>
              <div className="absolute inset-0 w-80 h-80 mx-auto bg-gray-200 rounded-3xl shadow-xl flex items-center justify-center">
                <div className="text-6xl font-bold text-gray-400">AK</div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Ashin Krishna
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Passionate visual designer specializing in creating modern, professional designs that make an impact. With expertise in CV design, brand identity, and social media templates.
              </p>
              <p>
                I believe in clean aesthetics, bold typography, and designs that tell a story. Every project is an opportunity to create something extraordinary.
              </p>
              <p>
                Let's work together to bring your vision to life with designs that stand out and make a lasting impression.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                onClick={handleDownloadCV}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <Palette className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <Users className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600">Awards</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;