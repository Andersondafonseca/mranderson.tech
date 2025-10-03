
import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { useCmsData } from '../hooks/useCmsData';
import { SpeakingTopic, SpeakingPageData } from '../types';

const Speaking: React.FC = () => {
  const [pageData, setPageData] = useState<SpeakingPageData | null>(null);
  const [topics, setTopics] = useState<SpeakingTopic[]>([]);
  const { getSpeakingTopics, getSpeakingPageData } = useCmsData();

  useEffect(() => {
    const fetchData = async () => {
      const [pageContent, topicsData] = await Promise.all([
        getSpeakingPageData(),
        getSpeakingTopics()
      ]);
      setPageData(pageContent);
      setTopics(topicsData);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{pageData?.pageTitle || 'Palestras'}</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            {pageData?.pageDescription || 'Carregando...'}
          </p>
        </div>

        {pageData?.featuredVideoId && (
            <div className="mb-16 md:mb-24 max-w-4xl mx-auto">
                 <h2 className="text-3xl font-bold text-center text-slate-100 mb-8">Veja-me em Ação</h2>
                 <div className="rounded-lg overflow-hidden shadow-2xl shadow-amber-500/10">
                    <YouTubeEmbed videoId={pageData.featuredVideoId} title="Vídeo de Palestra - Mr. Anderson" />
                 </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {topics.map((topic, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-lg shadow-md border-l-4 border-amber-500">
              <h3 className="text-2xl font-bold text-slate-100">{topic.title}</h3>
              <p className="mt-3 text-slate-300">{topic.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Vamos conversar?</h2>
            <p className="text-lg text-slate-300 mb-6">
              Estou disponível para palestras, workshops e painéis, tanto em formatos presenciais quanto online. Preencha o formulário para discutir como posso agregar valor ao seu próximo evento.
            </p>
             <div className="space-y-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-500 text-black flex items-center justify-center">
                        <i className="fas fa-users"></i>
                    </div>
                    <p className="ml-4 text-slate-200 font-medium">Formatos: Presencial e Online</p>
                </div>
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-600 text-black flex items-center justify-center">
                        <i className="fas fa-globe"></i>
                    </div>
                    <p className="ml-4 text-slate-200 font-medium">Idiomas: Português e Inglês</p>
                </div>
            </div>
          </div>

          <div>
            <ContactForm subjectDefault="Inquérito sobre Palestra" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Speaking;