import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [paperDropdown, setPaperDropdown] = useState(false);

  const navLinks = [
    { name: 'Introduction', href: '#introduction' },
    { name: 'Brainstorm', href: '#innovation' },
    { name: 'Demos', href: '#demos' },
    { name: 'Members', href: '#members' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif italic text-2xl mr-3 shadow-lg">
              &epsilon;
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Epsilon Acoustic Revolution Lab
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#introduction" className="text-gray-600 hover:text-ear-teal transition-colors font-medium">Introduction</a>
            
            {/* Papers Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setPaperDropdown(true)}
              onMouseLeave={() => setPaperDropdown(false)}
            >
              <button className="flex items-center text-gray-600 hover:text-ear-teal transition-colors font-medium focus:outline-none">
                Papers <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {paperDropdown && (
                <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-xl border border-gray-100 py-2 animate-fade-in-down">
                  <a href="#paper-duo-tok" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ear-teal">
                    Duo-Tok
                  </a>
                  <a href="#paper-ear-vae" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ear-teal">
                    &epsilon;ar-VAE
                  </a>
                  <a href="#paper-eval" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ear-teal">
                    &epsilon;ar-DPO
                  </a>
                </div>
              )}
            </div>

            <a href="#demos" className="text-gray-600 hover:text-ear-teal transition-colors font-medium">Demos</a>
            <a href="#innovation" className="text-gray-600 hover:text-ear-teal transition-colors font-medium">Brainstorm</a>
            <a href="#members" className="text-gray-600 hover:text-ear-teal transition-colors font-medium">Members</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-ear-teal hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
             <div className="border-t border-gray-100 my-2"></div>
             <p className="px-3 py-2 text-xs text-gray-400 font-bold uppercase">Papers</p>
             <a href="#paper-duo-tok" className="block px-3 py-2 text-base text-gray-600 hover:text-ear-teal" onClick={() => setIsOpen(false)}>Duo-Tok</a>
             <a href="#paper-ear-vae" className="block px-3 py-2 text-base text-gray-600 hover:text-ear-teal" onClick={() => setIsOpen(false)}>&epsilon;ar-VAE</a>
             <a href="#paper-eval" className="block px-3 py-2 text-base text-gray-600 hover:text-ear-teal" onClick={() => setIsOpen(false)}>&epsilon;ar-DPO</a>
          </div>
        </div>
      )}
    </nav>
  );
};