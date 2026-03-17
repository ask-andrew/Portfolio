
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Footer from './components/Footer';
import PatternGame from './components/PatternGame';
import Testimonials from './components/Testimonials';
import Coaching from './components/Coaching';

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen geometric-bg relative overflow-x-hidden">
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-40"></div>
      
      <Navbar />
      
      <main className="relative z-10 pt-16">
        <Hero />
        
        {/* Pattern Game - Quick interactive demo */}
        <section id="play" className="py-12 md:py-20 border-b border-slate-900 bg-slate-950/40 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">The Mindset of Play</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              I believe that when we approach complexity as a game, we find the patterns that others miss. Warm up your brain below.
            </p>
          </div>
          <PatternGame />
        </section>

        {/* Featured Projects - The priority showcase */}
        <section id="projects" className="py-24 scroll-mt-24">
          <Projects />
        </section>

        {/* Skills & Experience - Professional context */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
          <section id="skills" className="py-24 scroll-mt-24">
            <Skills />
          </section>
          
          <section id="experience" className="py-24 border-t border-slate-800/50 scroll-mt-24">
            <Experience />
          </section>
        </div>

        {/* Testimonials - Validation */}
        <section id="testimonials" className="py-24 scroll-mt-24">
          <Testimonials />
        </section>

        {/* Coaching / Consulting - Offerings */}
        <section id="coaching" className="py-24 bg-slate-950/80 border-y border-slate-900 scroll-mt-24">
          <Coaching />
        </section>
        
        {/* Final CTA - Hire Me */}
        <section id="contact" className="py-32 bg-blue-600/10 backdrop-blur-sm scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-black text-blue-400 uppercase tracking-widest mb-8">
              Available for new opportunities
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white leading-tight">
              Let's Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Truly Meaningful</span>
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium">
              Whether you're looking for an efficiency-focused leader, a data-driven strategist, or a custom software solution – I'm ready to dive in.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="mailto:askandrewcoaching@gmail.com" 
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-500 transition-all rounded-2xl font-black text-lg text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105"
              >
                Send an Email
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/andrewledet" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 bg-slate-800 hover:bg-slate-700 transition-all rounded-2xl font-black text-lg text-white border border-slate-700"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
