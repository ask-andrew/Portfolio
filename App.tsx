
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
        
        {/* Pattern Game is now front-and-center to invite "Play" early on */}
        <section id="play" className="py-12 md:py-20 border-y border-slate-900 bg-slate-950/40 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">The Mindset of Play</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Data doesn't have to be stressful. I believe that when we approach complexity as a game, we find the patterns that others miss. Warm up your brain below.
            </p>
          </div>
          <PatternGame />
        </section>

        <section id="projects" className="py-20 scroll-mt-24">
          <Projects />
        </section>

        <section id="coaching" className="py-24 bg-slate-900/30 scroll-mt-24">
          <Coaching />
        </section>
        
        <section id="experience" className="py-20 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800 scroll-mt-24">
          <Experience />
        </section>

        <section id="testimonials" className="py-24 scroll-mt-24">
          <Testimonials />
        </section>
        
        <section id="skills" className="py-20 bg-slate-950/80 scroll-mt-24">
          <Skills />
        </section>
        
        <section id="contact" className="py-20 bg-blue-600/10 backdrop-blur-sm scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Meaningful</h2>
            <p className="text-slate-400 text-lg mb-8">
              Whether you want to talk efficiency hacking, customer success strategy, or jazz theory – I'm always open to new connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:andrew.ledet@gmail.com" 
                className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-semibold text-lg"
              >
                Send an Email
              </a>
              <a 
                href="https://linkedin.com/in/andrewledet" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg font-semibold text-lg border border-slate-700"
              >
                Connect on LinkedIn
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
