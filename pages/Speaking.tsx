



import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { useCmsData } from '../hooks/useCmsData';
import { SpeakingTopic, SpeakingPageData, Testimonial, MentorshipInfo } from '../types';
import { mockTestimonials, mockMcEvents, mockMentorshipInfo } from '../data/mockData';
import FadeIn from '../components/FadeIn';

const Speaking: React.FC = () => {
  const [pageData, setPageData] = useState<SpeakingPageData | null>(null);
  const [topics, setTopics] = useState<SpeakingTopic[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [mcEvents, setMcEvents] = useState<string[]>([]);
  const [mentorship, setMentorship] = useState<MentorshipInfo | null>(null);

  const { getSpeakingTopics, getSpeakingPageData } = useCmsData();

  useEffect(() => {
    const fetchData = async () => {
      const [pageContent, topicsData] = await Promise.all([
        getSpeakingPageData(),
        getSpeakingTopics()
      ]);
      setPageData(pageContent);
      setTopics(topicsData);
      setTestimonials(mockTestimonials);
      setMcEvents(mockMcEvents);
      setMentorship(mockMentorshipInfo);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{pageData?.pageTitle || 'Palestras'}</h1>
            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
              {pageData?.pageDescription || 'Carregando...'}
            </p>
          </div>
        </FadeIn>

        {(pageData?.featuredVideoId || pageData?.featuredImageUrl) && (
          <FadeIn>
            <div className="mb-16 md:mb-24 max-w-4xl mx-auto">
                 <div className="rounded-lg overflow-hidden shadow-2xl shadow-amber-500/10">
                    {pageData.featuredImageUrl ? (
                        <img 
                            src={pageData.featuredImageUrl} 
                            alt="Mr. Anderson palestrando em um grande auditório" 
                            className="w-full h-auto object-cover" 
                        />
                    ) : pageData.featuredVideoId ? (
                        <YouTubeEmbed videoId={pageData.featuredVideoId} title="Vídeo de Palestra - Mr. Anderson" />
                    ) : null}
                 </div>
            </div>
          </FadeIn>
        )}

        {/* Topics Section */}
        <FadeIn>
          <section className="mb-20">
              <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">Palestras e Treinamentos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {topics.map((topic, index) => (
                  <FadeIn key={index} delay="delay-100">
                    <div className="bg-gray-900 p-8 rounded-lg shadow-md border-l-4 border-amber-500 h-full">
                      <h3 className="text-2xl font-bold text-slate-100">{topic.title}</h3>
                      <p className="mt-3 text-slate-300">{topic.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <p className="text-center mt-8 text-slate-400">Formato: Presencial ou Online • Duração: 45 a 90 minutos • Público: líderes, gestores, equipes técnicas e híbridas</p>
          </section>
        </FadeIn>
        
        {/* Master of Ceremonies Section */}
        {mcEvents.length > 0 && (
          <FadeIn>
             <section className="mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-900 p-8 md:p-12 rounded-2xl">
                    <FadeIn>
                      <div className="text-center md:text-left">
                          <h2 className="text-3xl font-bold text-slate-100 mb-4">Mestre de Cerimônias</h2>
                          <p className="text-lg text-slate-300 mb-8">Com presença de palco carismática e conhecimento técnico profundo, conduzo eventos com leveza, humor inteligente e conexão real com o público.</p>
                          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                              {mcEvents.map(event => (
                                  <span key={event} className="bg-gray-800 text-amber-300 text-sm font-medium px-4 py-2 rounded-full border border-gray-700">{event}</span>
                              ))}
                          </div>
                          <p className="text-xl italic text-slate-100">"Ele não apresenta um evento — ele cria uma experiência."</p>
                      </div>
                    </FadeIn>
                    <div className="flex justify-center">
                      <FadeIn delay="delay-200">
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQF5TzDZ6h8wnQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1724967379795?e=1762387200&v=beta&t=YIoeQ6zdh0hE_GO-EcEyUcTMDdWxeK3dK5s5QDmfdr8"
                            alt="Mr. Anderson como Mestre de Cerimônias no evento da HackerSec"
                            className="rounded-lg shadow-2xl w-full h-auto object-cover max-h-96"
                        />
                      </FadeIn>
                    </div>
                </div>
            </section>
          </FadeIn>
        )}
        
        {/* Mentorship Section */}
        {mentorship && (
          <FadeIn>
             <section className="mb-20 bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl">
                 <h2 className="text-3xl font-bold text-slate-100 text-center mb-4">{mentorship.title}</h2>
                 <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto mb-8">{mentorship.description}</p>
                 <div className="max-w-md mx-auto space-y-3 mb-6">
                    {mentorship.topics.map(topic => (
                        <p key={topic} className="text-slate-200"><i className="fas fa-check-circle text-amber-400 mr-3"></i>{topic}</p>
                    ))}
                 </div>
                 <p className="text-center font-semibold text-amber-400">{mentorship.result}</p>
            </section>
          </FadeIn>
        )}

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <FadeIn>
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">Depoimentos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                      <FadeIn key={index} delay={`delay-${index * 100}`}>
                        <div className="bg-black p-8 rounded-lg border border-gray-800 flex flex-col h-full">
                            <p className="text-slate-300 italic flex-grow">"{testimonial.quote}"</p>
                            <div className="mt-6">
                            <p className="font-bold text-amber-400">{testimonial.author}</p>
                            <p className="text-sm text-slate-400">{testimonial.role}</p>
                            </div>
                        </div>
                      </FadeIn>
                    ))}
                </div>
            </section>
          </FadeIn>
        )}


        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl">
            <FadeIn>
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
            </FadeIn>

            <FadeIn delay="delay-200">
              <div>
                <ContactForm subjectDefault="Perguntas sobre as Palestras" />
              </div>
            </FadeIn>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};

export default Speaking;