
import React, { useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProjects } from '../../hooks/useProjects';
import { Project } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';
import ConfirmationModal from '../../components/ConfirmationModal';
import { supabase } from '../../supabase';

const AdminDashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [activeTab, setActiveTab] = useState<'manage' | 'upload'>('manage');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);


  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setActiveTab('upload');
  };

  const handleFormSuccess = () => {
    setEditingProject(null);
    setActiveTab('manage');
  };

  const handleDeleteRequest = (project: Project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setProjectToDelete(null);
    }
  };


  return (
    <div className="min-h-screen bg-section-gray text-body">
      <header className="bg-background shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <h1 className="text-2xl font-serif text-heading">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-button text-white py-2 px-4 font-semibold tracking-wider uppercase text-sm hover:bg-button-hover transition-colors duration-300 rounded-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-background p-8 rounded-lg border border-border-gray shadow-lg">
          <div className="border-b border-border-gray mb-6">
            <nav className="-mb-px flex space-x-8">
              <button onClick={() => { setActiveTab('manage'); setEditingProject(null); }} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'manage' ? 'border-accent text-heading' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Manage Projects
              </button>
              <button onClick={() => { setActiveTab('upload'); setEditingProject(null); }} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'upload' ? 'border-accent text-heading' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </button>
            </nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'manage' && <ManageProjectsList projects={projects} onEdit={handleEdit} onDeleteRequest={handleDeleteRequest} />}
              {activeTab === 'upload' && <UploadProjectForm key={editingProject?.id || 'new'} project={editingProject} addProject={addProject} updateProject={updateProject} onSuccess={handleFormSuccess} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the project "${projectToDelete?.title}" ? This action cannot be undone.`}
      />
    </div>
  );
};


const ManageProjectsList: React.FC<{ projects: Project[], onEdit: (p: Project) => void, onDeleteRequest: (p: Project) => void }> = ({ projects, onEdit, onDeleteRequest }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-accent">No projects found.</p>
        <p className="text-sm text-gray-500 mt-2">Click on 'Add New Project' to add your first project.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-border-gray">
        {projects.map(p => (
          <li key={p.id} className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <img src={p.coverImage} alt={p.title} className="w-16 h-12 object-cover rounded-md bg-card-gray" />
              <div>
                <p className="font-semibold text-heading">{p.title}</p>
                <p className="text-sm text-accent">{p.category} - {p.year}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => onEdit(p)} className="text-sm bg-gray-200 hover:bg-gray-300 text-body font-semibold py-1 px-3 rounded-md transition">Edit</button>
              <button onClick={() => onDeleteRequest(p)} className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md transition">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};

const UploadProjectForm: React.FC<{
  project: Project | null;
  addProject: (p: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (p: Project) => Promise<void>;
  onSuccess: () => void;
}> = ({ project, addProject, updateProject, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // New state for multiple file uploads
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [floorPlanFiles, setFloorPlanFiles] = useState<File[]>([]);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || ('Residential' as Project['category']),
    year: (project?.year || new Date().getFullYear()).toString(),
    location: project?.location || '',
    coverImage: project?.coverImage || '',
    descriptionShort: project?.descriptionShort || '',
    descriptionLong: project?.descriptionLong || '',
    role: project?.role || '',
    challenges: project?.challenges || '',
    materials: (project?.materials || []).join(', '),
    galleryImages: (project?.galleryImages || []).join('\n'),
    videos: (project?.videos || []).join('\n'),
    floorPlans: (project?.floorPlans || []).join('\n'),
    projectPDFs: (project?.projectPDFs || []).join('\n'),
    isPublished: project?.isPublished ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const processUrls = (urls: string) => {
    return urls.split('\n').map(url => url.trim()).filter(Boolean);
  }

  const uploadFile = async (file: File, folder: string = 'project-images'): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(folder)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(folder)
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // 1. Upload Cover Image
      let coverImageUrl = formData.coverImage;
      if (selectedFile) {
        coverImageUrl = await uploadFile(selectedFile);
      }

      if (!coverImageUrl) {
        setSubmissionError("Please provide a cover image URL or upload an image.");
        setIsSubmitting(false);
        return;
      }

      // 2. Upload Gallery Images
      const newGalleryUrls = await Promise.all(galleryFiles.map(file => uploadFile(file)));
      const existingGalleryUrls = processUrls(formData.galleryImages);
      const allGalleryUrls = [...existingGalleryUrls, ...newGalleryUrls];

      // 3. Upload Videos
      const newVideoUrls = await Promise.all(videoFiles.map(file => uploadFile(file, 'project-images')));
      const existingVideoUrls = processUrls(formData.videos);
      const allVideoUrls = [...existingVideoUrls, ...newVideoUrls];

      // 4. Upload Floor Plans
      const newFloorPlanUrls = await Promise.all(floorPlanFiles.map(file => uploadFile(file, 'project-images')));
      const existingFloorPlanUrls = processUrls(formData.floorPlans);
      const allFloorPlanUrls = [...existingFloorPlanUrls, ...newFloorPlanUrls];

      // 5. Upload PDFs
      const newPdfUrls = await Promise.all(pdfFiles.map(file => uploadFile(file, 'project-images')));
      const existingPdfUrls = processUrls(formData.projectPDFs);
      const allPdfUrls = [...existingPdfUrls, ...newPdfUrls];


      const projectData = {
        title: formData.title,
        category: formData.category,
        year: parseInt(formData.year, 10) || new Date().getFullYear(),
        location: formData.location,
        coverImage: coverImageUrl,
        descriptionShort: formData.descriptionShort,
        descriptionLong: formData.descriptionLong,
        role: formData.role,
        challenges: formData.challenges,
        materials: formData.materials.split(',').map(s => s.trim()).filter(Boolean),
        galleryImages: allGalleryUrls,
        videos: allVideoUrls,
        floorPlans: allFloorPlanUrls,
        projectPDFs: allPdfUrls,
        isPublished: formData.isPublished,
      };

      if (project) {
        await updateProject({ ...projectData, id: project.id });
      } else {
        await addProject(projectData);
      }
      onSuccess();

    } catch (error: any) {
      console.error("Failed to save project:", error);
      setSubmissionError(error.message || `An unexpected error occurred while saving the project.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <InputField name="title" label="Project Title" value={formData.title} onChange={handleChange} required />
        <SelectField name="category" label="Category" value={formData.category} onChange={handleChange} options={['Residential', 'Commercial', 'Interior', 'Concept']} />
        <InputField name="year" label="Year" type="number" value={formData.year} onChange={handleChange} required />
        <InputField name="location" label="Location" value={formData.location} onChange={handleChange} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-body mb-1">Cover Image</label>
        <div className="space-y-2">
          <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-button file:text-white hover:file:bg-button-hover" />
          <div className="text-xs text-gray-500">OR</div>
          <InputField name="coverImage" label="Image URL" value={formData.coverImage} onChange={handleChange} placeholder="https://example.com/image.jpg" />
        </div>
        {(selectedFile || formData.coverImage) && (
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : formData.coverImage}
            alt="Cover preview"
            className="h-32 mt-2 rounded-md border border-border-gray p-1 object-cover"
          />
        )}
      </div>

      <TextAreaField name="descriptionShort" label="Short Description" value={formData.descriptionShort} onChange={handleChange} required />
      <TextAreaField name="descriptionLong" label="Full Description" value={formData.descriptionLong} onChange={handleChange} rows={5} required />
      <InputField name="role" label="Role (e.g., Lead Architect)" value={formData.role} onChange={handleChange} />
      <InputField name="materials" label="Materials (comma separated)" value={formData.materials} onChange={handleChange} />
      <TextAreaField name="challenges" label="Challenges & Solutions" value={formData.challenges} onChange={handleChange} />

      <FileUploadField
        label="Gallery Images"
        files={galleryFiles}
        setFiles={setGalleryFiles}
        accept="image/*"
        existingUrls={formData.galleryImages}
        onExistingChange={(val) => setFormData(prev => ({ ...prev, galleryImages: val }))}
      />

      <FileUploadField
        label="Project Videos"
        files={videoFiles}
        setFiles={setVideoFiles}
        accept="video/*"
        existingUrls={formData.videos}
        onExistingChange={(val) => setFormData(prev => ({ ...prev, videos: val }))}
      />

      <FileUploadField
        label="Floor Plans"
        files={floorPlanFiles}
        setFiles={setFloorPlanFiles}
        accept="image/*"
        existingUrls={formData.floorPlans}
        onExistingChange={(val) => setFormData(prev => ({ ...prev, floorPlans: val }))}
      />

      <FileUploadField
        label="Project PDFs"
        files={pdfFiles}
        setFiles={setPdfFiles}
        accept="application/pdf"
        existingUrls={formData.projectPDFs}
        onExistingChange={(val) => setFormData(prev => ({ ...prev, projectPDFs: val }))}
      />

      <div className="flex items-center">
        <input id="isPublished" name="isPublished" type="checkbox" checked={formData.isPublished} onChange={handleChange} className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded" />
        <label htmlFor="isPublished" className="ml-2 block text-sm text-body">Published</label>
      </div>

      {submissionError && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-left">
          <p className="font-bold">Submission Failed</p>
          <p>{submissionError}</p>
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="w-full bg-button text-white py-3 px-6 font-semibold tracking-wider uppercase hover:bg-button-hover transition-colors duration-300 rounded-sm disabled:bg-gray-400">
        {isSubmitting ? 'Submitting...' : (project ? 'Update Project' : 'Save Project')}
      </button>
    </form>
  )
};

const InputField: React.FC<{ name: string, label: string, value: string, onChange: any, type?: string, required?: boolean, placeholder?: string }> = ({ name, label, value, onChange, type = 'text', required = false, placeholder = '' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-body mb-1">{label}</label>
    <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} className="w-full px-3 py-2 bg-section-gray border border-border-gray rounded-md focus:ring-accent focus:border-accent" placeholder={placeholder} />
  </div>
);

const TextAreaField: React.FC<{ name: string, label: string, value: string, onChange: any, rows?: number, required?: boolean, placeholder?: string }> = ({ name, label, value, onChange, rows = 3, required = false, placeholder = '' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-body mb-1">{label}</label>
    <textarea id={name} name={name} value={value} onChange={onChange} rows={rows} required={required} className="w-full px-3 py-2 bg-section-gray border border-border-gray rounded-md focus:ring-accent focus:border-accent" placeholder={placeholder} />
  </div>
);

const SelectField: React.FC<{ name: string, label: string, value: string, onChange: any, options: string[] }> = ({ name, label, value, onChange, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-body mb-1">{label}</label>
    <select id={name} name={name} value={value} onChange={onChange} className="w-full px-3 py-2 bg-section-gray border border-border-gray rounded-md focus:ring-accent focus:border-accent">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const FileUploadField: React.FC<{
  label: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  accept: string;
  existingUrls: string;
  onExistingChange: (val: string) => void;
}> = ({ label, files, setFiles, accept, existingUrls, onExistingChange }) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-body mb-1">{label}</label>

      {/* Existing URLs (Hidden or Editable if needed, keeping editable for flexibility) */}
      <div className="mb-2">
        <textarea
          value={existingUrls}
          onChange={(e) => onExistingChange(e.target.value)}
          placeholder="Existing URLs (one per line)..."
          rows={2}
          className="w-full px-3 py-2 bg-section-gray border border-border-gray rounded-md focus:ring-accent focus:border-accent text-xs"
        />
      </div>

      <div className="space-y-2">
        <input
          type="file"
          multiple
          accept={accept}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-button file:text-white hover:file:bg-button-hover"
        />
      </div>

      {/* File Preview List */}
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between text-sm bg-card-gray p-2 rounded-md">
              <span className="truncate max-w-xs">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboardPage;