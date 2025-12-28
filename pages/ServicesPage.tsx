import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { MOCK_SERVICES } from '../constants';
import { Service } from '../types';
import { motion } from 'framer-motion';

// Type declaration for window.lucide
declare global {
  interface Window {
    lucide: {
      icons: { [key: string]: any };
      toSvg: (iconNode: any, options?: { class?: string, [key: string]: any }) => string;
      createIcons: (options?: any) => void;
    };
  }
}

const LucideIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const [iconHtml, setIconHtml] = React.useState('');

  React.useEffect(() => {
    if (window.lucide) {
      const lowerCaseName = name.toLowerCase();
      const iconNode = window.lucide.icons[lowerCaseName];

      if (iconNode) {
        const svgString = window.lucide.toSvg(iconNode, {
          class: className || "w-12 h-12 text-accent mb-4",
        });
        setIconHtml(svgString);
      } else {
        console.warn(`Lucide icon "${name}" not found.`);
      }
    }
  }, [name, className]);

  return <div dangerouslySetInnerHTML={{ __html: iconHtml }} />;
};


const ServicesPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif text-heading text-center mb-4">Our Expertise</h1>
        <p className="text-center text-accent max-w-3xl mx-auto mb-16">
          We offer a comprehensive suite of architectural and design services, tailored to meet the unique needs of each client and project. Our integrated approach ensures a seamless journey from initial concept to final construction.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {MOCK_SERVICES.map((service: Service, index) => (
            <motion.div
              key={index}
              className="bg-section-gray p-8 rounded-lg border border-border-gray shadow-sm flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <LucideIcon name={service.icon} />
              <h2 className="text-2xl font-serif text-heading mb-3">{service.title}</h2>
              <p className="text-body leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ServicesPage;
