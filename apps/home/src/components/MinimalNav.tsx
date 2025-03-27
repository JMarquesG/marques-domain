
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

const MinimalNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "#home", label: t('home') },
    { href: "#about", label: t('about') },
    { href: "#experience", label: t('experience') },
    { href: "#expertise", label: t('expertise') },
    { href: "#education", label: t('education') },
    { href: "#contact", label: t('contact') }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium">Jordi Marqués</div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="minimal-nav py-2">
                {item.label}
              </a>
            ))}
            <LanguageSwitcher />
          </div>
          
          <button className="md:hidden" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  className="py-3 text-lg hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MinimalNav;
