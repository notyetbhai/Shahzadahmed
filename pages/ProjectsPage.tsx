
import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';

type CategoryFilter = 'All' | Project['category'];

const ProjectsPage: React.FC = () => {
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');

  const filters: CategoryFilter[] = ['All', 'Residential', 'Commercial', 'Interior', 'Concept'];

  const filteredProjects = activeFilter === 'All'
    ? projects.filter(p => p.isPublished)
    : projects.filter(p => p.category === activeFilter && p.isPublished);

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif text-heading text-center mb-4">Our Portfolio</h1>
        <p className="text-center text-accent max-w-2xl mx-auto mb-12">
          A curated collection of our work, showcasing our commitment to design excellence and innovation across various scales and typologies.
        </p>
        
        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-semibold tracking-wider uppercase rounded-sm transition-colors duration-300 ${
                activeFilter === filter
                  ? 'bg-button text-white'
                  : 'bg-card-gray text-body hover:bg-border-gray'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-accent mt-12">No projects found in this category.</p>
        )}
      </div>
    </AnimatedPage>
  );
};

export default ProjectsPage;
