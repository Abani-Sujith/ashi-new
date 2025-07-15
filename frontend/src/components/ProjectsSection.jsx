import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockProjects } from '../data/mockData';
import { ExternalLink, Eye } from 'lucide-react';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const ProjectCard = ({ project, index }) => (
    <Card 
      className={`group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
        isVisible ? 'animate-in fade-in-0 slide-in-from-bottom-4' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={() => setSelectedProject(project)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <Eye className="w-5 h-5 mb-2" />
            <p className="text-sm">Click to view details</p>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="bg-purple-100 text-purple-700">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
                <ExternalLink className="w-4 h-4" />
                View Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-5xl font-black text-gray-900 mb-6">
            Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore my latest work in CV design, brand identity, and social media templates
          </p>
        </div>

        <Tabs defaultValue="cv" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-white shadow-lg rounded-2xl p-2">
            <TabsTrigger value="cv" className="rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold text-lg py-3">
              CV Designs
            </TabsTrigger>
            <TabsTrigger value="branding" className="rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold text-lg py-3">
              Brand Identity
            </TabsTrigger>
            <TabsTrigger value="social" className="rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold text-lg py-3">
              Social Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cv">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProjects.cvDesigns.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="branding">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProjects.brandingIdentity.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProjects.socialMedia.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>
    </section>
  );
};

export default ProjectsSection;