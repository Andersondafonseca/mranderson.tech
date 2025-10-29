import React from 'react';
import { NavLink } from 'react-router-dom';

const ExclusiveNav: React.FC = () => {
  // New "pill" or "tab" style classes for better visual clarity
  const activeLinkClass = 'bg-amber-500 text-black shadow-md';
  const inactiveLinkClass = 'text-slate-300 hover:bg-gray-800 hover:text-white';
  const baseClasses = 'flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md';

  const links = [
    { to: '/area-exclusiva', text: 'Início', icon: 'fas fa-home', end: true },
    { to: '/area-exclusiva/videoteca', text: 'Videoteca', icon: 'fas fa-video' },
    { to: '/area-exclusiva/enviar-pergunta', text: 'Enviar Pergunta', icon: 'fas fa-question-circle' },
    { to: '/area-exclusiva/questionarios', text: 'Checklist de Carreira', icon: 'fas fa-file-alt' },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Changed to a wrapping, centered layout for better responsiveness */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => 
                `${baseClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              <i className={`${link.icon}`}></i>
              <span>{link.text}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ExclusiveNav;
