
import React, { useState, useEffect } from 'react';
import { TimelineEvent } from '../types';
import { useCmsData } from '../hooks/useCmsData';

const About: React.FC = () => {
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
    const { getTimelineEvents } = useCmsData();

    useEffect(() => {
        const fetchTimeline = async () => {
            const data = await getTimelineEvents();
            setTimelineEvents(data);
        };
        fetchTimeline();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="py-16 md:py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-amber-400 tracking-wider uppercase">Minha Jornada</h2>
                    <p className="mt-2 text-3xl font-extrabold text-slate-100 tracking-tight sm:text-4xl">
                        De Executivo de TI a Criador de Negócios
                    </p>
                    <p className="mt-5 max-w-prose mx-auto text-xl text-slate-300">
                        Uma trajetória marcada pela paixão por tecnologia, pela coragem de empreender e pelo desejo de gerar impacto real.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="relative">
                        {/* A linha vertical da timeline */}
                        <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-gray-800" aria-hidden="true"></div>

                        {timelineEvents.map((event, index) => (
                            <div key={index} className="relative mb-12">
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;