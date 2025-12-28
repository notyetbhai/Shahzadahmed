import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { useProjects } from '../hooks/useProjects';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById } = useProjects();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-3xl font-serif text-heading mb-4">Project Not Found</h1>
          <p className="text-accent mb-8">The project you are looking for does not exist.</p>
          <Link to="/projects" className="bg-button text-white py-2 px-6 font-semibold tracking-wider uppercase hover:bg-button-hover transition-colors duration-300 rounded-sm">
            Back to Portfolio
          </Link>
        </div>
      </AnimatedPage>
    );
  }
  
  return (
    <AnimatedPage>
      {/* Cover Image */}
      <div className="w-full h-[70vh] max-h-[800px] bg-section-gray">
        <img 
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-x-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
                <h1 className="text-5xl md:text-7xl font-serif text-heading mb-6">{project.title}</h1>
                <p className="text-body leading-relaxed mb-12">{project.descriptionLong}</p>
                
                <div className="mb-12">
                    <h2 className="text-2xl font-serif text-heading mb-4">Materials & Palette</h2>
                    <div className="flex flex-wrap gap-3 pt-4">
                        {project.materials.map((material, index) => (
                        <span key={index} className="bg-section-gray text-body text-sm px-4 py-2 rounded-full">{material}</span>
                        ))}
                    </div>
                </div>
                
                <div className="mb-12">
                    <h2 className="text-2xl font-serif text-heading mb-4">Challenges & Solutions</h2>
                    <p className="text-body leading-relaxed">{project.challenges}</p>
                </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 mt-12 lg:mt-0">
                <div className="sticky top-28 bg-section-gray p-8 border border-border-gray rounded-sm">
                    <h3 className="text-xl font-serif text-heading mb-4 pb-4 border-b border-border-gray">Project Details</h3>
                    <ul className="space-y-4 text-body text-sm mb-8">
                        <li><strong>Category:</strong><br/>{project.category}</li>
                        <li><strong>Location:</strong><br/>{project.location}</li>
                        <li><strong>Year:</strong><br/>{project.year}</li>
                        <li><strong>Role:</strong><br/>{project.role}</li>
                    </ul>
                    {project.projectPDFs.length > 0 && (
                        <div>
                            <h3 className="text-xl font-serif text-heading mb-4 pb-4 border-b border-border-gray">Downloads</h3>
                            {project.projectPDFs.map((pdf, index) => (
                                <a 
                                    key={index}
                                    href={pdf} 
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 w-full block text-center bg-button text-white py-3 px-6 font-semibold tracking-wider uppercase hover:bg-button-hover transition-colors duration-300 rounded-sm text-sm"
                                >
                                    Download Document {index + 1}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </aside>
        </div>

        {/* Gallery, Videos, and Floor Plans Section */}
        <div className="mt-16">
            {project.galleryImages.length > 0 && (
                <div className="mb-16">
                <h2 className="text-3xl font-serif text-heading text-center mb-12">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {project.galleryImages.map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-sm bg-section-gray aspect-[4/3]">
                        <img 
                        src={img} 
                        alt={`Gallery image ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                        loading="lazy"
                        />
                    </div>
                    ))}
                </div>
                </div>
            )}

            {project.videos.length > 0 && (
                <div className="mb-16">
                <h2 className="text-3xl font-serif text-heading text-center mb-12">Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.videos.map((video, index) => (
                    <div key={index} className="overflow-hidden aspect-video bg-black">
                        <video controls src={video} className="w-full h-full object-contain"></video>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {project.floorPlans.length > 0 && (
                <div>
                <h2 className="text-3xl font-serif text-heading text-center mb-12">Floor Plans</h2>
                <div className="grid grid-cols-1 gap-8">
                    {project.floorPlans.map((plan, index) => (
                    <div key={index} className="bg-white p-4 border border-border-gray shadow-sm">
                        <img 
                        src={plan} 
                        alt={`Floor plan ${index + 1}`} 
                        className="w-full h-auto" 
                        />
                    </div>
                    ))}
                </div>
                </div>
            )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProjectDetailPage;