import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCmsData } from '../hooks/useCmsData';
import { NavLink as NavLinkType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLinkType[]>([]);
  const { getNavLinks } = useCmsData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNavLinks = async () => {
        const data = await getNavLinks();
        // The menu from the CMS is now the single source of truth.
        setNavLinks(data);
    };
    fetchNavLinks();
  }, [getNavLinks]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/home');
  };

  const activeLinkClass = 'text-amber-400 font-semibold';
  const inactiveLinkClass = 'text-slate-300 hover:text-amber-400 transition-colors duration-300';

  const SearchButton: React.FC<{className?: string}> = ({ className = ''}) => (
     <button
        onClick={() => setIsSearchOpen(true)}
        className={`p-2 rounded-md text-slate-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 ${className}`}
        aria-label="Buscar no site"
    >
        <i className="fas fa-search"></i>
    </button>
  );

  const authLinksDesktop = (
    <div className="hidden md:flex items-center space-x-4 ml-6">
      <SearchButton />
      <div className="h-6 w-px bg-gray-700"></div>
      {user ? (
        <>
          <span className="text-slate-400 hidden lg:block whitespace-nowrap">Olá, {user.name}!</span>
          {user.role === 'admin' && (
            <Link to="/admin/usuarios" className={inactiveLinkClass}>Admin</Link>
          )}
          <Link to="/area-exclusiva" className={inactiveLinkClass}>Área Exclusiva</Link>
          <Button onClick={handleLogout} variant="secondary" className="px-4 py-2 text-sm">
            Sair
          </Button>
        </>
      ) : (
        <Button to="/login" variant="primary" className="px-4 py-2 text-sm">
          Membros
        </Button>
      )}
    </div>
  );

  const authLinksMobile = (
     <div className="border-t border-gray-800 px-2 pt-3 pb-3 space-y-1 sm:px-3">
        {user ? (
          <>
            <div className="px-3 py-2">
                <span className="block text-base font-medium text-slate-300">Olá, {user.name}!</span>
            </div>
            {user.role === 'admin' && (
               <Link to="/admin/usuarios" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-gray-800 hover:text-amber-400">Admin</Link>
            )}
             <Link to="/area-exclusiva" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-gray-800 hover:text-amber-400">Área Exclusiva</Link>
             <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-gray-800 hover:text-amber-400">Sair</button>
          </>
        ) : (
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium bg-amber-500 text-black text-center">Membros</Link>
        )}
     </div>
  );


  return (
    <>
      <header className="bg-black/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/home" className="text-2xl font-bold tracking-tight text-slate-100">
                Mr. Anderson<span className="text-amber-400">.</span>
              </Link>
            </div>
            <div className="hidden md:flex md:items-center">
              {/* The flex-shrink-0 class prevents the nav from collapsing when auth links are added */}
              <nav className="flex items-center space-x-8 flex-shrink-0">
                {navLinks.map(link => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    // The `end` prop is crucial for the home link to not stay active on other pages
                    end={link.path === '/'}
                    className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
              {authLinksDesktop}
            </div>
            <div className="md:hidden flex items-center gap-2">
              <SearchButton />
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
        
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-black border-t border-gray-800 shadow-lg z-40" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                   // The `end` prop is crucial for the home link to not stay active on other pages
                  end={link.path === '/'}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-900 text-amber-400' : 'text-slate-300 hover:bg-gray-800 hover:text-amber-400'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            {authLinksMobile}
          </div>
        )}
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;