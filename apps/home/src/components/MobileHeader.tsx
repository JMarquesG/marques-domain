
import React from 'react';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 right-0 z-40 md:hidden w-full bg-dark-200/95 backdrop-blur-md px-4 py-3 border-b border-dark-300/50">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Jordi Marqués</h1>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-dark-300/50 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
