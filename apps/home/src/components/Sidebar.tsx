
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={cn(
      "fixed top-0 left-0 h-full w-72 z-50 bg-dark-200 shadow-lg transition-transform duration-500 ease-in-out transform",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="flex flex-col h-full">
        {/* Profile */}
        <div className="flex flex-col items-center py-10 px-6">
          <div className="relative mb-4">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gold-100/30">
              <img 
                src="/lovable-uploads/9789592b-887c-4be6-9988-93195067d07e.png" 
                alt="Jordi Marqués" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-1">Jordi Marqués</h2>
          <p className="text-gold-100 text-sm font-medium mb-2">Backend Developer</p>
          
          <div className="w-full mt-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">Residence:</span>
              <span className="text-xs">Barcelona</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">City:</span>
              <span className="text-xs">Barcelona</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-6 py-4">
          <ul className="space-y-2">
            <li><a href="#home" className="sidebar-link active">Home</a></li>
            <li><a href="#about" className="sidebar-link">About</a></li>
            <li><a href="#experience" className="sidebar-link">Experience</a></li>
            <li><a href="#expertise" className="sidebar-link">Expertise</a></li>
            <li><a href="#education" className="sidebar-link">Education</a></li>
            <li><a href="#contact" className="sidebar-link">Contact</a></li>
          </ul>
        </nav>
        
        {/* Skills */}
        <div className="px-6 py-6">
          <h3 className="text-sm font-semibold mb-4">Main Skills</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs">Node.js/JavaScript</span>
                <span className="text-xs text-gold-100">90%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: "90%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs">Python</span>
                <span className="text-xs text-gold-100">80%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: "80%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs">SQL/NoSQL</span>
                <span className="text-xs text-gold-100">85%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Language */}
        <div className="px-6 py-4">
          <h3 className="text-sm font-semibold mb-4">Languages</h3>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gold-100/30 relative">
              <div className="absolute inset-0.5 rounded-full overflow-hidden">
                <div className="bg-gold-100/20 h-full" style={{ width: '100%' }}></div>
              </div>
              <span className="relative text-xs font-medium">Eng</span>
            </div>
            
            <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gold-100/30 relative">
              <div className="absolute inset-0.5 rounded-full overflow-hidden">
                <div className="bg-gold-100/20 h-full" style={{ width: '100%' }}></div>
              </div>
              <span className="relative text-xs font-medium">Spa</span>
            </div>
            
            <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gold-100/30 relative">
              <div className="absolute inset-0.5 rounded-full overflow-hidden">
                <div className="bg-gold-100/20 h-full" style={{ width: '100%' }}></div>
              </div>
              <span className="relative text-xs font-medium">Cat</span>
            </div>
            
            <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gold-100/30 relative">
              <div className="absolute inset-0.5 rounded-full overflow-hidden">
                <div className="bg-gold-100/20 h-full" style={{ width: '70%' }}></div>
              </div>
              <span className="relative text-xs font-medium">Fr</span>
            </div>
          </div>
        </div>
        
        {/* Social & CV */}
        <div className="px-6 py-6 border-t border-dark-300">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-300 hover:bg-dark-300/70 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-300 hover:bg-dark-300/70 transition-colors">
              <Github size={18} />
            </a>
            <a href="mailto:contact@example.com" 
               className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-300 hover:bg-dark-300/70 transition-colors">
              <Mail size={18} />
            </a>
          </div>
          
          <button className="w-full py-2 flex items-center justify-center gap-2 rounded-md bg-gold-100 hover:bg-gold-200 text-dark-100 font-medium transition-colors">
            <Download size={16} />
            <span>Download CV</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
