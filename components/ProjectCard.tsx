import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isFeatured }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <Link to={`/project/${project.id}`} className="block">
        <div className="overflow-hidden aspect-[4/3] bg-gray-200">
          <img
            src={project.coverImage}
            alt={project.title}
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{
              imageRendering: 'crisp-edges',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
        </div>
        {isFeatured && (
          <div className="bg-black -mt-2 relative z-10 py-3 px-6">
            <p className="text-white text-sm font-bold tracking-[0.2em] uppercase">Architect</p>
          </div>
        )}
        <div className="bg-card-gray p-6">
          <h3 className="text-xl font-serif text-heading">{project.title}</h3>
          <p className="text-sm text-accent mt-1">{project.location}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;