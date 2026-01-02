
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-sm rotate-45 flex items-center justify-center">
            <span className="text-white font-bold text-[10px] -rotate-45">AL</span>
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-400 uppercase">ANDREW LEDET</span>
        </div>
        
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Andrew Ledet. Built with React & Tailwind.
        </p>
        
        <div className="flex space-x-6 text-slate-500">
          <a href="https://linkedin.com/in/andrewledet" className="hover:text-blue-500 transition-colors">LinkedIn</a>
          <a href="mailto:andrew.ledet@gmail.com" className="hover:text-blue-500 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
