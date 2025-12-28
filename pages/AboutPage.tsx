import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

const SkillBar: React.FC<{ skill: string, level: string }> = ({ skill, level }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-body">{skill}</span>
    </div>
    <div className="w-full bg-card-gray rounded-full h-2.5">
      <motion.div
        className="bg-accent h-2.5 rounded-full"
        style={{ width: level }}
        initial={{ width: 0 }}
        whileInView={{ width: level }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
    </div>
  </div>
);

const SoftwareTag: React.FC<{ name: string }> = ({ name }) => (
  <span className="bg-card-gray text-body text-sm px-4 py-2 rounded-md border border-border-gray">{name}</span>
);


const AboutPage: React.FC = () => {
  const softwareSkills = ['AutoCAD', 'Revit', 'SketchUp', 'Rhino 3D', 'V-Ray', 'Adobe Creative Suite'];



  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-heading mb-6">Shahzad Ahmed</h1>
            <div className="space-y-4 text-body leading-relaxed">
              <p>
                A dynamic and result-oriented professional with over 25 years of experience in Civil & Interior Works with reputed organizations in Pakistan.
              </p>
              <p>
                Resourceful in identifying and formulating practical solutions in the spectrum of architectural issues, in coordination with consultants & other external agencies. Expertise in conceptualizing, design development, and detailing, coupled with strong skills in creative visualization and architectural drawing.
              </p>
            </div>
          </div>
        </div>

        {/* Skills & Experience */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          {/* Skills */}
          <div>
            <h2 className="text-3xl font-serif text-heading mb-8">Skills & Expertise</h2>
            <SkillBar skill="AutoCAD Drafting" level="98%" />
            <SkillBar skill="Interior & Civil Works" level="90%" />
            <SkillBar skill="Site Supervision & Coordination" level="95%" />
            <SkillBar skill="Project Management" level="85%" />
          </div>

          {/* Experience */}
          <div className="bg-section-gray p-8 rounded-lg border border-border-gray">
            <h2 className="text-3xl font-serif text-heading mb-8">Experience</h2>
            <div className="relative border-l-2 border-border-gray pl-6">
              <div className="mb-8">
                <div className="absolute w-4 h-4 bg-accent rounded-full -left-2 mt-1.5 border-4 border-section-gray"></div>
                <h3 className="text-xl font-semibold text-heading">Senior Draftsman</h3>
                <p className="text-sm text-accent mb-1">Naheed Mashooqullah, Studio for Architecture & Interior Design | 2008 - Present</p>
                <p className="text-sm">Translates conceptual designs into detailed architectural drawings for construction, produces drawings for interiors, conducts site visits for measurements and supervision, and coordinates with architects and designers.</p>
              </div>
              <div className="mb-8">
                <div className="absolute w-4 h-4 bg-accent rounded-full -left-2 mt-1.5 border-4 border-section-gray"></div>
                <h3 className="text-xl font-semibold text-heading">Draftsman</h3>
                <p className="text-sm text-accent mb-1">Arshad Shahid Abdullah & Associates (ASA)</p>
                <p className="text-sm">Gained experience in Civil & Interior Works, contributing to design development and producing construction documents for various projects.</p>
              </div>
              <div className="mb-8">
                <div className="absolute w-4 h-4 bg-accent rounded-full -left-2 mt-1.5 border-4 border-section-gray"></div>
                <h3 className="text-xl font-semibold text-heading">Part-time Draftsman</h3>
                <p className="text-sm text-accent mb-1">Monis Masfar | 3 years part-time</p>
                <p className="text-sm">Contributed to various residential and small commercial projects, focusing on detailed drawings and site surveys.</p>
              </div>
              <div className="mb-8">
                <div className="absolute w-4 h-4 bg-accent rounded-full -left-2 mt-1.5 border-4 border-section-gray"></div>
                <h3 className="text-xl font-semibold text-heading">Part-time Draftsman</h3>
                <p className="text-sm text-accent mb-1">Iqbal Bloch | 3 years part-time</p>
                <p className="text-sm">Assisted with freelance drafting work for independent projects, enhancing skills in client coordination and rapid prototyping of designs.</p>
              </div>
              <div>
                <div className="absolute w-4 h-4 bg-accent rounded-full -left-2 mt-1.5 border-4 border-section-gray"></div>
                <h3 className="text-xl font-semibold text-heading">Draftsman</h3>
                <p className="text-sm text-accent mb-1">Dawn Services | 1999 - 2004</p>
                <p className="text-sm">Handled diverse architectural, interior, and perspective design tasks. Developed proficiency in AutoCAD drafting and gained valuable on-site experience.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download CV Button */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <a
              href="/Shahzad-Ahmed-CV.pdf"
              download="Shahzad-Ahmed-CV.pdf"
              className="inline-block border border-button text-button py-3 px-8 font-semibold tracking-wider uppercase hover:bg-button hover:text-white transition-colors duration-300 text-sm"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Software Proficiency */}
        <div>
          <h2 className="text-3xl font-serif text-heading mb-8">Software Proficiency</h2>
          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {softwareSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <SoftwareTag name={skill} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;