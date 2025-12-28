import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Project } from '../types';
import { supabase } from '../supabase';

interface ProjectContextType {
  projects: Project[];
  getProjectById: (id: string) => Project | undefined;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (project: Project) => Promise<void>;
  loading: boolean;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('year', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setProjects(data as Project[]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const getProjectById = useCallback((id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  }, [projects]);

  const addProject = useCallback(async (projectData: Omit<Project, 'id'>) => {
    try {
      // Generate a random ID or let Supabase handle it if we used uuid type, 
      // but since we defined id as text primary key, we should probably generate it or let DB default if it was uuid default gen_random_uuid()
      // In my SQL I defined: id text primary key. So I must provide it.
      const newId = crypto.randomUUID();

      const { error } = await supabase
        .from('projects')
        .insert([{ ...projectData, id: newId }]);

      if (error) throw error;

      await fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  }, [fetchProjects]);

  const updateProject = useCallback(async (updatedProject: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updatedProject)
        .eq('id', updatedProject.id);

      if (error) throw error;

      await fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }, [fetchProjects]);

  const deleteProject = useCallback(async (projectToDelete: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id);

      if (error) throw error;

      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }, [fetchProjects]);

  return (
    <ProjectContext.Provider value={{ projects, getProjectById, addProject, updateProject, deleteProject, loading }}>
      {children}
    </ProjectContext.Provider>
  );
};