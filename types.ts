
export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Interior' | 'Concept';
  year: number;
  location: string;
  coverImage: string;
  descriptionShort: string;
  descriptionLong: string;
  role: string;
  materials: string[];
  challenges: string;
  galleryImages: string[];
  videos: string[];
  floorPlans: string[];
  projectPDFs: string[];
  isPublished: boolean;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}