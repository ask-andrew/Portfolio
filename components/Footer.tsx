
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-sm rotate-45 flex items-center justify-center">
            <span className="text-white font-bold text-[10px] -rotate-45">AL</span>
          </div>
          <span className="font-black text-lg tracking-tight text-white uppercase">AskAndrew</span>
        </div>
        
        <p className="text-slate-600 text-sm font-medium">
          &copy; {new Date().getFullYear()} AskAndrew. Built for the curious.
        </p>
        
        <div className="flex space-x-6 text-slate-500 font-bold text-xs uppercase tracking-widest">
          <a href="https://askandrew.substack.com/" target="_blank" className="hover:text-orange-400 transition-colors">Substack</a>
          <a href="https://linkedin.com/in/andrewledet" target="_blank" className="hover:text-blue-500 transition-colors">LinkedIn</a>
          <a href="mailto:askandrewcoaching@gmail.com" className="hover:text-blue-500 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
