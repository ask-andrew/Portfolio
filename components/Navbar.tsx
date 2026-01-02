
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-sm rotate-45 flex items-center justify-center">
            <span className="text-white font-bold text-xs -rotate-45">AL</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">ANDREW LEDET</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
          <a href="#projects" className="hover:text-blue-400 transition-colors">Creations</a>
          <a href="#coaching" className="hover:text-blue-400 transition-colors">Coaching</a>
          <a href="#experience" className="hover:text-blue-400 transition-colors">History</a>
          <a href="#testimonials" className="hover:text-blue-400 transition-colors">Vouched</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>

        <div className="flex items-center space-x-4">
          <a 
            href="https://linkedin.com/in/andrewledet" 
            target="_blank" 
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-blue-400"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
