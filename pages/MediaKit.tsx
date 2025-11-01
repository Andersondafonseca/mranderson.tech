import React, { useState, useEffect } from 'react';
import { SpeakingTopic, CredentialItem, Testimonial } from '../types';
import { useCmsData } from '../hooks/useCmsData';
import { mockCredentials, mockTestimonials } from '../data/mockData';
import FadeIn from '../components/FadeIn';
import Button from '../components/Button';

// High-resolution photos for media use
const mediaPhotos = [
  { url: 'https://media.licdn.com/dms/image/v2/D4D22AQFZMGzpFWlZOA/feedshare-shrink_1280/feedshare-shrink_1280/0/1727904507228?e=1762387200&v=beta&t=5FXMHzzB_atB72oFqJa_8tEi0w3qLoqoHCFBFCmQcYQ', description: 'Mr. Anderson - Retrato Profissional' },
  { url: 'https://media.licdn.com/dms/image/v2/D4D22AQG6sOTEG5iwQg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1724967384975?e=1762387200&v=beta&t=TjM4Kyi9-m5rdEylVl-ewXc7C5adw4pRNEGRYyx9hHc', description: 'Mr. Anderson - Palestrando no Palco' }
];

const Section: React.FC<{title: string, children: React.ReactNode, className?: string}> = ({title, children, className}) => (
    <FadeIn>
        <section className={`mb-20 ${className}`}>
            <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">{title}</h2>
            {children}
        </section>
    </FadeIn>
);


const MediaKit: React.FC = () => {
    const [topics, setTopics] = useState<SpeakingTopic[]>([]);
    const [credentials] = useState<CredentialItem[]>(mockCredentials);
    const [testimonials] = useState<Testimonial[]>(mockTestimonials);

    const { getSpeakingTopics } = useCmsData();

    useEffect(() => {
        const fetchData = async () => {
            const topicsData = await getSpeakingTopics();
            setTopics(topicsData);
        };
        fetchData();
    }, [getSpeakingTopics]);

    return (
        <div className="py-16 md:py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">Media Kit</h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Recursos para imprensa, organizadores de eventos e parceiros. Aqui você encontrará biografias, fotos em alta resolução e outras informações úteis.
                        </p>
                    </div>
                </FadeIn>

                {/* Bio & Photos Section */}
                <FadeIn>
                    <section className="mb-20">
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 h-full">
                                <h3 className="text-2xl font-bold text-amber-400 mb-4">Biografia Oficial</h3>
                                <div className="space-y-4 text-slate-300">
                                    <p>
                                        <strong>Mr. Anderson</strong> é autor best-seller, palestrante e criador de negócios que transformam tecnologia em impacto real. Com mais de duas décadas de experiência em TI, ele se especializou em traduzir conceitos técnicos complexos em estratégias de negócio claras e acionáveis.
                                    </p>
                                    <p>
                                        Sua jornada, que abrange desde o suporte técnico no Brasil até posições de liderança em vendas e CX em multinacionais na América Latina, culminou na fundação de projetos inovadores como a <strong>Mister Sales</strong> e o <strong>Podcafé Tech</strong>. Sua missão é empoderar profissionais e empresas a usar a tecnologia como uma força para o crescimento e a inovação.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 h-full">
                                <h3 className="text-2xl font-bold text-amber-400 mb-4">Fotos para Divulgação</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {mediaPhotos.map((photo, index) => (
                                        <div key={index} className="space-y-3">
                                            <img src={photo.url} alt={photo.description} className="rounded-lg w-full h-auto object-cover aspect-square" />
                                            <a 
                                                href={photo.url} 
                                                download={`mr-anderson-${index + 1}.jpg`}
                                                className="block w-full text-center px-4 py-2 bg-gray-800 text-slate-200 text-sm font-semibold rounded-md hover:bg-amber-500 hover:text-black transition-colors"
                                            >
                                                <i className="fas fa-download mr-2"></i> Baixar
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         </div>
                    </section>
                </FadeIn>

                {/* Credentials Section */}
                 <Section title="Credenciais e Áreas de Atuação">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {credentials.map((cred) => (
                            <div key={cred.title} className="bg-gray-900 p-8 rounded-lg border border-gray-800 h-full">
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
                        ))}
                    </div>
                </Section>
                
                {/* Speaking Topics Section */}
                <Section title="Principais Tópicos de Palestra">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {topics.map((topic, index) => (
                            <div key={index} className="bg-gray-900 p-6 rounded-lg border-l-4 border-amber-500 h-full">
                                <h3 className="text-xl font-bold text-slate-100">{topic.title}</h3>
                                <p className="mt-2 text-slate-300">{topic.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Button to="/palestras" variant="secondary">Ver todos os detalhes sobre palestras</Button>
                    </div>
                </Section>
                
                {/* Testimonials Section */}
                <Section title="Depoimentos">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-black p-8 rounded-lg border border-gray-800 flex flex-col h-full">
                                <p className="text-slate-300 italic flex-grow">"{testimonial.quote}"</p>
                                <div className="mt-6">
                                <p className="font-bold text-amber-400">{testimonial.author}</p>
                                <p className="text-sm text-slate-400">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
                
                {/* Contact Section */}
                <FadeIn>
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-8 md:p-12 rounded-2xl text-center">
                        <h2 className="text-3xl font-extrabold text-black">Contato para Imprensa</h2>
                        <p className="mt-3 text-lg text-black/80 max-w-2xl mx-auto">
                            Para entrevistas, convites para eventos ou outras solicitações de mídia, entre em contato.
                        </p>
                        <div className="mt-8">
                            <Button to="/contato" variant="secondary" className="bg-black text-amber-400 border-black hover:bg-gray-800">
                                Entrar em Contato
                            </Button>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};

export default MediaKit;