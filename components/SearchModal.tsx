import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCmsData } from '../hooks/useCmsData';
import { BlogPost } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { searchBlogPosts } = useCmsData();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setHasSearched(true);

    if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
    }

    if (!term.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    debounceTimer.current = window.setTimeout(async () => {
        const data = await searchBlogPosts(term);
        setResults(data);
        setIsLoading(false);
    }, 500); // 500ms debounce
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20 sm:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-2xl shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="p-6">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Pesquisar artigos..."
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border-2 border-gray-700 text-slate-100 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        
        <div className="p-6 pt-0 max-h-[60vh] overflow-y-auto">
          {isLoading && <p className="text-center text-slate-400">Buscando...</p>}
          {!isLoading && hasSearched && results.length === 0 && searchTerm.trim() && (
            <p className="text-center text-slate-400">Nenhum resultado encontrado para "{searchTerm}".</p>
          )}
          {!isLoading && results.length > 0 && (
            <ul className="space-y-2">
              {results.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="block p-4 bg-gray-800/50 hover:bg-gray-800 rounded-md transition-colors duration-200"
                  >
                    <h3 className="font-bold text-amber-400">{post.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{post.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;