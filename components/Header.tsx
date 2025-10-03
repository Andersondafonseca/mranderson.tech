
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCmsData } from '../hooks/useCmsData';
import { NavLink as NavLinkType } from '../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLinkType[]>([]);
  const { getNavLinks } = useCmsData();

  useEffect(() => {
    const fetchNavLinks = async () => {
        const data = await getNavLinks();
        // Add a fallback in case the API fails
        const defaultLinks = [
            { name: 'Home', path: '/' }, { name: 'Sobre', path: '/sobre' }, { name: 'Livros', path: '/livros' },
            { name: 'Palestras', path: '/palestras' }, { name: 'Blog', path: '/blog' },
            { name: 'Projetos', path: '/projetos' }, { name: 'Contato', path: '/contato' },
        ];
        setNavLinks(data && data.length > 0 ? data : defaultLinks);
    };
    fetchNavLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeLinkClass = 'text-amber-400 font-semibold';
  const inactiveLinkClass = 'text-slate-300 hover:text-amber-400 transition-colors duration-300';

  return (
    <header className="bg-black/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight text-slate-100">
              Mr. Anderson<span className="text-amber-400">.</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="flex items-center space-x-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black border-t border-gray-800 shadow-lg z-40" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-900 text-amber-400' : 'text-slate-300 hover:bg-gray-800 hover:text-amber-400'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
