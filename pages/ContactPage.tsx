import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // In a real app, you would send this data to a backend or an email service.
    // Here we just simulate a network request with a 1.5-second delay.
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // You can add error handling here if the submission fails
    
    // Simulate success
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
  };

  return (
    <AnimatedPage>
      <div className="bg-section-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-heading mb-4">Get in Touch</h1>
            <p className="text-accent">
              We'd love to hear about your project. Please fill out the form below or reach out to us directly to start the conversation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h3 className="text-2xl font-serif text-heading mb-4">Contact Information</h3>
              <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@shahzadahmed.online" className="text-accent hover:text-heading">info@shahzadahmed.online</a></p>
              <p><strong>Phone:</strong> <a href="tel:+923212741925" className="text-accent hover:text-heading">+92 3 212741925</a></p>
            </div>
            
            {/* Contact Form */}
            <div className="bg-background p-8 md:p-12 rounded-lg border border-border-gray shadow-lg max-w-2xl mx-auto">
              {submitStatus === 'success' ? (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-serif text-heading mb-3">Thank You!</h3>
                  <p className="text-body">Your message has been sent successfully. I will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-body mb-2">Name</label>
                      <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-background border border-border-gray rounded-md focus:ring-accent focus:border-accent" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-body mb-2">Email</label>
                      <input type="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 bg-background border border-border-gray rounded-md focus:ring-accent focus:border-accent" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-body mb-2">Subject</label>
                    <input type="text" id="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-2 bg-background border border-border-gray rounded-md focus:ring-accent focus:border-accent" />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-body mb-2">Message</label>
                    <textarea id="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full px-4 py-2 bg-background border border-border-gray rounded-md focus:ring-accent focus:border-accent"></textarea>
                  </div>
                  <div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-button text-white py-3 px-6 font-semibold tracking-wider uppercase hover:bg-button-hover transition-colors duration-300 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                   {submitStatus === 'error' && (
                    <p className="text-red-500 text-sm mt-4 text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ContactPage;
