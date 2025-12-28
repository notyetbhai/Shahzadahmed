import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-footer text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Architect Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif text-white mb-4">SHAHZAD AHMED</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Creating spaces that inspire and transform the way we live and work.
            </p>
            <Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">
              Admin Login
            </Link>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:info@shahzadahmed.online" className="hover:text-white transition-colors">info@shahzadahmed.online</a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href="tel:+923212741925" className="hover:text-white transition-colors">+92 3 212741925</a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4">Follow</h4>
            <ul className="space-y-3 text-gray-400">
               <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
               <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Behance</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shahzad Ahmed Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
