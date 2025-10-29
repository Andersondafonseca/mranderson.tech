import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { useCmsData } from '../hooks/useCmsData';
import { SocialLinks } from '../types';

const Contact: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({ linkedin: '#', instagram: '#', spotify: '#', youtube: '#' });
  const { getSocialLinks } = useCmsData();

  useEffect(() => {
    const fetchLinks = async () => {
        const data = await getSocialLinks();
        setSocialLinks(data);
    };
    fetchLinks();
  }, [getSocialLinks]);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">Contato</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Tem uma pergunta, uma proposta ou apenas quer trocar uma ideia? Adoraria ouvir você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-slate-100 mb-6">Envie uma mensagem</h2>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Siga-me</h3>
                <p className="text-slate-300 mb-6">Conecte-se comigo nas redes sociais para ficar por dentro das últimas novidades e discussões.</p>
                <div className="flex justify-start space-x-6">
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors text-3xl">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors text-3xl">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors text-3xl">
                        <i className="fab fa-spotify"></i>
                    </a>
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors text-3xl">
                        <i className="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Informações</h3>
                 <div className="space-y-4 text-slate-300">
                    <p><i className="fas fa-envelope mr-3 text-amber-400"></i> contato@mranderson.tech</p>
                    <p>
                        <a href="tel:+5582999361632" className="hover:text-amber-400 transition-colors">
                            <i className="fab fa-whatsapp mr-3 text-amber-400"></i> +55 (82) 99936-1632
                        </a>
                    </p>
                    <p><i className="fas fa-map-marker-alt mr-3 text-amber-400"></i> Rio de Janeiro, Brasil</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;