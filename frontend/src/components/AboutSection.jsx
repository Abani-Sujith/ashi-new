import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, Palette, Users, Award, Loader2 } from 'lucide-react';
import { profileAPI } from '../services/api';
import { toast } from 'sonner';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = async () => {
    try {
      // Increment download count
      await profileAPI.incrementCVDownload();
      
      // Update local state
      setProfile(prev => ({
        ...prev,
        cv_download_count: prev.cv_download_count + 1
      }));
      
      // Mock download functionality
      toast.success('CV download started! (Mock functionality)');
      
      // In a real app, you would trigger actual file download here
      // window.open('/path/to/cv.pdf', '_blank');
      
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('Failed to download CV. Please try again.');
    }
  };

  if (loading) {
    return (
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600">Loading profile...</span>
          </div>
        </div>
      </section>
    );
  }

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
              {profile?.name || 'Ashin Krishna'}
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                {profile?.bio || 'Passionate visual designer specializing in creating modern, professional designs that make an impact. With expertise in CV design, brand identity, and social media templates.'}
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
                {profile?.cv_download_count > 0 && (
                  <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded-full">
                    {profile.cv_download_count}
                  </span>
                )}
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <Palette className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">
                  {profile?.total_projects || 0}+
                </div>
                <div className="text-sm text-gray-600">Projects</div>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <Users className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">
                  {profile?.happy_clients || 0}+
                </div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">
                  {profile?.awards || 0}
                </div>
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