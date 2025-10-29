import React from 'react';
import YouTubeEmbed from '../../components/YouTubeEmbed';

const ExclusiveDashboard: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">Uma Mensagem Especial Para Você</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Gravei este vídeo rápido para te dar as boas-vindas e mostrar como aproveitar ao máximo este espaço.</p>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
            <div className="rounded-lg overflow-hidden shadow-2xl shadow-amber-500/10">
            <YouTubeEmbed videoId="y6120QOlsfU" title="Vídeo de Boas-Vindas - Mr. Anderson" />
            </div>
        </div>
    </section>
  );
};

export default ExclusiveDashboard;
