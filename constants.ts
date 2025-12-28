import { Project, Service, Testimonial } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Afghan Carpet Interior',
    category: 'Commercial',
    year: 2025,
    location: 'Dolman Mall, Lahore, Pakistan',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    descriptionShort: 'A modern and luxurious retail space in Dolman Mall, Lahore, designed for "Afghan Carpet" and "Pashmina," showcasing exquisite carpets and pashmina products in a sophisticated and inviting environment.',
    descriptionLong: 'This project involved the comprehensive interior design and architectural planning for a dual-brand boutique, "Afghan Carpet" and "Pashmina," located within the prestigious Dolman Mall in Lahore. The design concept focuses on creating a high-end retail experience that elegantly displays the intricate beauty of Afghan carpets and the luxurious softness of pashmina. The layout is optimized for customer flow and product visibility, featuring distinct zones for each brand while maintaining a cohesive aesthetic. Natural wood tones, warm lighting, and strategic display units highlight the craftsmanship of the products. The exterior is designed to be inviting and prominent within the mall, with a large glass facade showcasing the interior.',
    role: 'Lead Architect & Interior Designer',
    materials: ['Wood paneling', 'Marble flooring (entrance)', 'Carpet flooring (interior)', 'Tempered glass (display units and facade)', 'White laminate', 'Cement board', 'Oak wood strips', 'Acrylic backlit logos', 'LED profile lighting', 'Stainless steel sections'],
    challenges: 'The primary challenge was to create two distinct brand experiences for \'Afghan Carpet\' and \'Pashmina\' within a single retail space, while ensuring a cohesive and luxurious overall ambiance. Integrating specialized lighting to highlight the rich textures of both carpets and pashminas without causing color distortion was also a key focus.',
    galleryImages: [
      'https://i.ibb.co/bj7D97ny/Generated-Image-November-15-2025-7-43-PM.png',
      'https://images.unsplash.com/photo-1594951935552-de1c48549665?q=80&w=1935&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610440332388-01e4a3c1c5a9?q=80&w=1964&auto=format&fit=crop'
    ],
    videos: [],
    floorPlans: [],
    projectPDFs: [],
    isPublished: true,
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    icon: 'Building',
    title: 'Architecture',
    description: 'Comprehensive architectural design services'
  },
  {
    icon: 'Armchair',
    title: 'Interior Design',
    description: 'Creating beautiful, functional interiors'
  },
  {
    icon: 'Cube',
    title: '3D Visualization',
    description: 'Photorealistic renderings and walkthroughs'
  },
  {
    icon: 'Hammer',
    title: 'Renovation',
    description: 'Transforming existing spaces'
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [];