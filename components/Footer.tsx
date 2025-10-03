
import React, { useState, useEffect } from 'react';
import { useCmsData } from '../hooks/useCmsData';
import { SocialLinks } from '../types';

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({ linkedin: '#', instagram: '#', spotify: '#', youtube: '#' });
  const { getSocialLinks } = useCmsData();

  useEffect(() => {
    const fetchLinks = async () => {
        const data = await getSocialLinks();
        if(data) setSocialLinks(data);
    };
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Mr. Anderson. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-6">
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
              <span className="sr-only">Instagram</span>
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
              <span className="sr-only">Spotify</span>
              <i className="fab fa-spotify fa-lg"></i>
            </a>
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
              <span className="sr-only">YouTube</span>
              <i className="fab fa-youtube fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
