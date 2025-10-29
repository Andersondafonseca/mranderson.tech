

import React, { useState, useEffect } from 'react';
import { TimelineEvent, CredentialItem } from '../types';
import { useCmsData } from '../hooks/useCmsData';
import { mockCredentials } from '../data/mockData';
import FadeIn from '../components/FadeIn';

const About: React.FC = () => {
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
    const [credentials, setCredentials] = useState<CredentialItem[]>([]);
    const { getTimelineEvents } = useCmsData();

    useEffect(() => {
        const fetchData = async () => {
            const timelineData = await getTimelineEvents();
            setTimelineEvents(timelineData);
            setCredentials(mockCredentials); // Using mock data as per media kit
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="py-16 md:py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Intro Section */}
                <FadeIn>
                  <section className="mb-24">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                          <div className="flex justify-center md:justify-start">
                              <img
                                  src="https://media.licdn.com/dms/image/v2/D4D22AQFZMGzpFWlZOA/feedshare-shrink_1280/feedshare-shrink_1280/0/1727904507228?e=1762387200&v=beta&t=5FXMHzzB_atB72oFqJa_8tEi0w3qLoqoHCFBFCmQcYQ"
                                  alt="Mr. Anderson palestrando"
                                  className="w-64 h-64 object-cover rounded-full border-4 border-amber-400 tech-glow"
                              />
                          </div>
                          <div className="md:col-span-2 text-center md:text-left">
                              <h2 className="text-base font-semibold text-amber-400 tracking-wider uppercase">Sobre Mr. Anderson</h2>
                              <p className="mt-2 text-3xl font-extrabold text-slate-100 tracking-tight sm:text-4xl">
                                  Autor Best-Seller, Palestrante e Criador de Negócios em Tecnologia
                              </p>
                              <p className="mt-5 text-lg text-slate-300">
                                  Com mais de 15 anos de experiência, sou reconhecido por transformar temas técnicos complexos em apresentações inspiradoras. Minha missão é traduzir a linguagem da tecnologia em transformação real de negócios e pessoas — com uma comunicação envolvente que une técnica, humor e storytelling.
                              </p>
                          </div>
                      </div>
                  </section>
                </FadeIn>
                
                {/* Credentials Section */}
                <FadeIn>
                  <section className="mb-24">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {credentials.map((cred, index) => (
                               <FadeIn key={cred.title} delay={index === 1 ? 'delay-150' : ''}>
                                  <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 h-full">
                                    <h3 className="text-2xl font-bold text-amber-400 mb-4">{cred.title}</h3>
                                    <ul className="space-y-3">
                                        {cred.items.map(item => (
                                            <li key={item} className="flex items-start">
                                                <i className="fas fa-check-circle text-amber-500 mt-1 mr-3"></i>
                                                <span className="text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                              </FadeIn>
                          ))}
                      </div>
                  </section>
                </FadeIn>


                {/* Timeline Section */}
                <FadeIn>
                  <section>
                      <FadeIn>
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight sm:text-4xl">
                                Minha Jornada
                            </h2>
                            <p className="mt-4 max-w-prose mx-auto text-xl text-slate-300">
                                Uma trajetória marcada pela paixão por tecnologia, pela coragem de empreender e pelo desejo de gerar impacto real.
                            </p>
                        </div>
                      </FadeIn>

                      <div className="mt-20">
                          <div className="relative">
                              {/* A linha vertical da timeline */}
                              <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-gray-800" aria-hidden="true"></div>

                              {timelineEvents.map((event, index) => (
                                  <FadeIn key={index}>
                                    <div className="relative mb-12">
                                        <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                            <div className="w-1/2 px-4">
                                                <div className={`text-right ${index % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                                    <p className="text-lg font-bold text-amber-400">{event.year}</p>
                                                    <h3 className="text-2xl font-semibold text-slate-100 mt-1">{event.title}</h3>
                                                    <p className="mt-2 text-slate-300">{event.description}</p>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black text-xl z-10 absolute left-1/2 -translate-x-1/2">
                                                <i className={event.icon}></i>
                                            </div>
                                            <div className="w-1/2"></div>
                                        </div>
                                    </div>
                                  </FadeIn>
                              ))}
                          </div>
                      </div>
                  </section>
                </FadeIn>
            </div>
        </div>
    );
};

export default About;