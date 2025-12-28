import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { MOCK_SERVICES } from '../constants';
import { Service } from '../types';

const HomePage: React.FC = () => {
  const { projects } = useProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <section className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-80px)] py-12 md:py-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-7xl font-serif text-heading tracking-tight leading-tight">
                Architectural Design, Interior & Vision
              </h1>
              <p className="mt-6 text-lg text-accent">
                Spaces that inspire
              </p>
              <Link to="/projects" className="group mt-8 inline-flex items-center bg-button text-white py-3 px-8 font-semibold tracking-wider uppercase hover:bg-button-hover transition-colors duration-300 text-sm">
                View Projects
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden md:block"
            >
               <img 
                src="https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1024&auto=format&fit=crop" 
                alt="Modern neutral-toned living room with minimalist furniture"
                className="w-full h-auto object-cover rounded-sm shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-section bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-serif text-heading mb-6">Shahzad Ahmed</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8 leading-relaxed text-body text-lg">
            With over 25+ years of experience in architectural design, I specialize in creating spaces that seamlessly blend form and function. Offering 5 core services and a lot of freelance work, every project is an opportunity to push boundaries and deliver exceptional results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
           >
            <Link to="/about" className="border border-button text-button py-3 px-8 font-semibold tracking-wider uppercase hover:bg-button hover:text-white transition-colors duration-300 text-sm">
              More About Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-section bg-section-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif text-heading text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
             {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isFeatured={index === 0} 
              />
            ))}
          </div>
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="border border-button text-button py-3 px-8 font-semibold tracking-wider uppercase hover:bg-button hover:text-white transition-colors duration-300 text-sm"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Services Snapshot */}
      <section className="py-section bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif text-heading text-center mb-16">Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_SERVICES.map((service: Service, index: number) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card-gray p-8 text-left rounded-sm"
              >
                <h3 className="text-xl font-serif text-heading mb-3">{service.title}</h3>
                <p className="text-sm text-body">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </AnimatedPage>
  );
};

export default HomePage;