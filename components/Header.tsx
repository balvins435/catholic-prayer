
import React from 'react';

interface HeaderProps {
  currentView: 'readings' | 'prayers';
  setCurrentView: (view: 'readings' | 'prayers') => void;
}

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-700">
    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
  </svg>
);

export default function Header({ currentView, setCurrentView }: HeaderProps) {
  const navItemClasses = "cursor-pointer py-2 px-4 text-sm sm:text-base font-medium transition-colors duration-300";
  const activeNavItemClasses = "border-b-2 border-amber-800 text-amber-900";
  const inactiveNavItemClasses = "text-gray-500 hover:text-amber-800";

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <CrossIcon />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
              Sanctuary
            </h1>
          </div>
        </div>
        <nav className="flex space-x-4">
          <button
            onClick={() => setCurrentView('readings')}
            className={`${navItemClasses} ${currentView === 'readings' ? activeNavItemClasses : inactiveNavItemClasses}`}
            aria-current={currentView === 'readings' ? 'page' : undefined}
          >
            Daily Readings
          </button>
          <button
            onClick={() => setCurrentView('prayers')}
            className={`${navItemClasses} ${currentView === 'prayers' ? activeNavItemClasses : inactiveNavItemClasses}`}
            aria-current={currentView === 'prayers' ? 'page' : undefined}
          >
            Prayers
          </button>
        </nav>
      </div>
    </header>
  );
}
