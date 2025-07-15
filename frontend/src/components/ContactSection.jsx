import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Linkedin, ExternalLink, Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    setTimeout(() => {
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 3000,
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-5xl font-black text-gray-900 mb-6">
            Let's Work <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Together</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to create something amazing? Get in touch and let's discuss your next project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className={`shadow-2xl border-0 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or how I can help you..."
                    rows={5}
                    required
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">ashin.krishna@example.com</p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  onClick={() => window.open('mailto:ashin.krishna@example.com')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">LinkedIn</h3>
                    <p className="text-gray-600">Connect professionally</p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  onClick={() => window.open('https://linkedin.com/in/ashin-krishna')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-orange-600 rounded-full flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Behance</h3>
                    <p className="text-gray-600">View my portfolio</p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-colors"
                  onClick={() => window.open('https://behance.net/ashin-krishna')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;