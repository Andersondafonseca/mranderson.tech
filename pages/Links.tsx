import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

type LinkItem = {
  title: string;
  description?: string;
  to: string;
  external?: boolean;
};

const links: LinkItem[] = [
  {
    title: 'Contrate para Palestras',
    description: 'Agenda, temas e formulário para convite.',
    to: '/palestras',
  },
  {
    title: 'Media Kit',
    description: 'Bio, fotos oficiais e informações para imprensa/eventos.',
    to: '/media-kit',
  },
  {
    title: 'Livros',
    description: 'Conheça meus livros e lançamentos.',
    to: '/livros',
  },
  {
    title: 'Contato',
    description: 'Fale comigo pelo formulário do site.',
    to: '/contato',
  },
  {
    title: 'Instagram (vida pessoal)',
    description: 'Bastidores, viagens e vida real.',
    to: 'https://instagram.com/andersondafonseca',
    external: true,
  },
];

const Links: React.FC = () => {
  return (
    <div className="bg-black text-slate-200">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-950" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Links
              <span className="text-amber-400">.</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Tudo em um só lugar.
              <br />
              Convites, media kit, livros e contato.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4">
            {links.map((item) => {
              const Card = (
                <div className="w-full rounded-2xl border border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 transition-colors p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                      {item.description && (
                        <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                      )}
                    </div>
                    <span className="text-amber-400 font-semibold">Abrir</span>
                  </div>
                </div>
              );

              if (item.external) {
                return (
                  <a
                    key={item.title}
                    href={item.to}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    {Card}
                  </a>
                );
              }

              return (
                <Link key={item.title} to={item.to} className="block">
                  {Card}
                </Link>
              );
            })}
          </div>

          <p className="mt-8 text-xs text-slate-500">
            Dica: se você veio do Instagram, o caminho mais rápido para convites é a página de
            Contato.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Links;
