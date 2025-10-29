import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ExclusiveNav from '../components/ExclusiveNav';

const ExclusiveArea: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <>
      <div className="bg-black pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">
              Bem-vindo(a), <span className="text-amber-400">{user?.name || 'Leitor'}</span>!
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Esta é sua área exclusiva com conteúdos bônus do livro "As 7 Portas da TI".
            </p>
          </div>
        </div>
      </div>
      
      <ExclusiveNav />
      
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <Outlet />
        </div>
      </div>
    </>
  );
};

export default ExclusiveArea;