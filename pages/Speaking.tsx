import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { useCmsData } from '../hooks/useCmsData';
import { SpeakingPageData, Testimonial, MentorshipInfo } from '../types';
import { mockTestimonials, mockMcEvents, mockMentorshipInfo } from '../data/mockData';
import FadeIn from '../components/FadeIn';

import imgBook from '../assets/speaking/anderson-book.jpg';
import imgStage1 from '../assets/speaking/anderson-stage-1.jpg';
import imgStage2 from '../assets/speaking/anderson-stage-2.jpg';
import imgTalkRoom from '../assets/speaking/anderson-talk-room.jpg';

type TalkCard = {
  title: string;
  promise: string;
  forWhom: string;
  takeaways: string[];
};

type PackageCard = {
  title: string;
  subtitle: string;
  includes: string[];
  bestFor: string;
};

const universityTalks: TalkCard[] = [
  {
    title: '👉 As 7 Portas da TI: como escolher sua carreira antes que o mercado escolha por você',
    promise: 'Clareza de direção para estudantes entenderem os “universos” da TI e definirem os próximos passos.',
    forWhom: 'Ideal para: alunos iniciantes, coordenação e semanas acadêmicas.',
    takeaways: [
      'Mapa claro das 7 áreas e o que cada uma faz no mundo real',
      'Como escolher uma trilha sem travar na dúvida',
      'Plano prático de primeiros passos para começar com segurança'
    ]
  },
  {
    title: '👉 O que a faculdade não ensina sobre trabalhar com TI',
    promise: 'Realidade do mercado, posicionamento profissional e o que acelera crescimento de carreira.',
    forWhom: 'Ideal para: empregabilidade, formaturas, eventos de carreira.',
    takeaways: [
      'Soft skills que realmente movem a carreira (com exemplos)',
      'Como evitar os erros do “júnior eterno”',
      'Como comunicar valor e crescer mais rápido'
    ]
  },
  {
    title: '👉 Inteligência Artificial não vai tirar seu emprego — mas alguém que usa IA vai',
    promise: 'Como estudantes podem usar IA a favor da carreira e produtividade sem cair em hype.',
    forWhom: 'Ideal para: semanas de tecnologia, liderança estudantil, grupos de pesquisa.',
    takeaways: [
      'Onde IA ajuda de verdade (e onde atrapalha)',
      'Hábitos e ferramentas para estudar e produzir mais rápido',
      'Visão prática do futuro próximo das profissões'
    ]
  },
  {
    title: '👉 A carreira que ninguém vê, mas mantém empresas vivas',
    promise: 'Infra, redes e operação como base invisível do digital. Valorização e direção de carreira.',
    forWhom: 'Ideal para: cursos técnicos, redes, infraestrutura e operação.',
    takeaways: [
      'O que é infraestrutura no mundo real',
      'Caminhos de entrada e evolução na área',
      'Mentalidade de disponibilidade, performance e resiliência'
    ]
  }
];

const companyTalks: TalkCard[] = [
  {
    title: '👉 O que sua empresa precisa saber sobre cybersegurança antes que seja tarde',
    promise: 'Conscientização executiva com risco real e impacto financeiro. Segurança como governança.',
    forWhom: 'Ideal para: liderança, C-level, times híbridos, áreas com dados sensíveis.',
    takeaways: [
      'Como incidentes acontecem na prática (erro humano, engenharia social, vazamentos)',
      'O que muda amanhã para reduzir risco (comportamento e processo)',
      'Segurança não é só TI. É governança e cultura'
    ]
  },
  {
    title: '👉 Cybersegurança básica: 10 erros que empresas cometem todo dia',
    promise: 'Checklist prático e aplicável imediatamente para reduzir risco sem “projeto infinito”.',
    forWhom: 'Ideal para: diretores, gestores, RH, operações e TI.',
    takeaways: [
      'Prioridades claras do que fazer primeiro',
      'Ações rápidas e baratas com alto impacto',
      'Alinhamento entre TI e liderança na decisão'
    ]
  },
  {
    title: '👉 Como implementar IA na sua empresa sem virar refém de modinha',
    promise: 'IA com estratégia, automação real e ROI. Sem brinquedo caro. Sem ilusão.',
    forWhom: 'Ideal para: transformação digital, operações, atendimento, produtos.',
    takeaways: [
      'Onde IA funciona agora e onde não vale o custo',
      'Critérios para decidir projetos e medir retorno',
      'Como evitar dependência de hype e fornecedores'
    ]
  },
  {
    title: '👉 Como reduzir custos operacionais usando tecnologia',
    promise: 'Automação e eficiência operacional para cortar retrabalho e aumentar produtividade.',
    forWhom: 'Ideal para: operações, backoffice, atendimento, áreas com processo repetitivo.',
    takeaways: [
      'O que automatizar primeiro (e como priorizar)',
      'Exemplos reais: service desk inteligente, agentes virtuais, automação de processos',
      'Ganhos típicos: tempo, qualidade e custo'
    ]
  },
  {
    title: '👉 Por que a empresa moderna é uma empresa de tecnologia',
    promise: 'Virada de mentalidade: TI deixa de ser custo e vira motor de crescimento.',
    forWhom: 'Ideal para: lideranças, comitês de gestão, encontros executivos.',
    takeaways: [
      'Como conectar TI, operação e estratégia',
      'Critérios para investir com inteligência',
      'Como destravar crescimento com tecnologia'
    ]
  }
];

const packages: PackageCard[] = [
  {
    title: '🎓 Pacote Universitário',
    subtitle: 'Trilha de Carreira em Tecnologia',
    includes: [
      'As 7 Portas da TI',
      'O que a faculdade não ensina sobre trabalhar com TI',
      'IA e o Futuro das Profissões'
    ],
    bestFor: 'Ideal para instituições que querem orientar alunos, reduzir evasão e acelerar empregabilidade.'
  },
  {
    title: '🏢 Pacote Empresarial Essencial',
    subtitle: 'Proteção + Produtividade',
    includes: [
      'Cybersegurança para Empresas Reais',
      'Cybersegurança básica: 10 erros…',
      'Automação e redução de custos operacionais'
    ],
    bestFor: 'Ideal para empresas que querem reduzir risco e aumentar produtividade com ações aplicáveis imediatamente.'
  },
  {
    title: '🏢 Pacote Executivo Premium',
    subtitle: 'Transformação Digital Real',
    includes: [
      'IA nas Empresas (sem modinha)',
      'TI como Estratégia de Negócio',
      'Cybersegurança Executiva'
    ],
    bestFor: 'Ideal para C-level: visão, decisão e alinhamento com governança.'
  }
];

const Speaking: React.FC = () => {
  const [pageData, setPageData] = useState<SpeakingPageData | null>(null);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [mcEvents, setMcEvents] = useState<string[]>([]);
  const [mentorship, setMentorship] = useState<MentorshipInfo | null>(null);

  const { getSpeakingPageData } = useCmsData();

  useEffect(() => {
    const fetchData = async () => {
      const pageContent = await getSpeakingPageData();
      setPageData(pageContent);
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
        {/* HERO */}
        <FadeIn>
          <section className="mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">
                  Palestras que transformam carreira, cultura e resultados
                </h1>
                <p className="mt-4 text-lg text-slate-300 max-w-3xl lg:max-w-none">
                  Para universidades e empresas que querem clareza, produtividade e segurança.

                  Conteúdo direto.

                  Aplicável.

                  Feito para o mundo real.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#contato"
                    onClick={scrollToSection('contato')}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
                  >
                    Solicitar proposta
                  </a>
                  <a
                    href="#temas"
                    onClick={scrollToSection('temas')}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-700 text-slate-100 font-semibold hover:border-amber-400 hover:text-amber-300 transition"
                  >
                    Ver palestras e pacotes
                  </a>
                </div>

                <p className="mt-6 text-sm text-slate-400">
                  Formato: presencial ou online.

                  Duração: 45 a 90 minutos.

                  Público: universidades, líderes e times.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-800 bg-black/20 shadow-2xl shadow-amber-500/10">
                <img
                  src={pageData?.featuredImageUrl || imgStage1}
                  alt="Mr. Anderson palestrando"
                  className="w-full h-[320px] md:h-[420px] object-cover object-top"
                  loading="eager"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src !== imgStage1) img.src = imgStage1;
                  }}
                />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* PROOF STRIP */}
        <FadeIn>
          <section className="mb-16">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 text-center">
                Autoridade que sustenta o palco
              </h2>
              <p className="mt-3 text-center text-slate-300 max-w-4xl mx-auto">
                Conteúdo com visão executiva.

                E linguagem de quem vive operação, pessoas e decisão.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-200">
                <div className="bg-black/30 border border-gray-800 rounded-xl p-6">
                  <p className="font-bold text-amber-300">Podcafé Tech</p>
                  <p className="mt-2 text-slate-300">
                    Host há 6 anos.

                    Top 5 no Spotify.
                  </p>
                </div>
                <div className="bg-black/30 border border-gray-800 rounded-xl p-6">
                  <p className="font-bold text-amber-300">Experiência real</p>
                  <p className="mt-2 text-slate-300">
                    26 anos em tecnologia.

                    Palestras presenciais e webinars online.
                  </p>
                </div>
                <div className="bg-black/30 border border-gray-800 rounded-xl p-6">
                  <p className="font-bold text-amber-300">Autor</p>
                  <p className="mt-2 text-slate-300">
                    Livro: <span className="font-semibold text-slate-100">As 7 Portas da TI</span>.

                    Mapa prático para orientar carreira e decisão.
                  </p>
                </div>
                <div className="bg-black/30 border border-gray-800 rounded-xl p-6">
                  <p className="font-bold text-amber-300">Mestre de Cerimônias</p>
                  <p className="mt-2 text-slate-300">
                    Hackersec 2024 e 2025.

                    Condução com presença e ritmo.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.youtube.com/@MisterAndersonFonseca/shorts"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-700 text-slate-100 font-semibold hover:border-amber-400 hover:text-amber-300 transition"
                >
                  Ver vídeos (YouTube Shorts)
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
                >
                  Quero uma proposta
                </a>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* FOR WHO */}
        <FadeIn>
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
                <h2 className="text-2xl font-bold text-slate-100">Para universidades e faculdades</h2>
                <p className="mt-3 text-slate-300">
                  Ideal para semanas acadêmicas e iniciativas de empregabilidade.
                </p>
                <ul className="mt-5 space-y-2 text-slate-200">
                  <li>• Dá direção para quem está começando</li>
                  <li>• Reduz evasão ao aumentar clareza de carreira</li>
                  <li>• Melhora empregabilidade percebida e engajamento</li>
                </ul>
              </div>

              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
                <h2 className="text-2xl font-bold text-slate-100">Para empresas</h2>
                <p className="mt-3 text-slate-300">
                  Conteúdo voltado para risco, produtividade, ROI e sobrevivência operacional.
                </p>
                <ul className="mt-5 space-y-2 text-slate-200">
                  <li>• Reduz risco com cultura e governança</li>
                  <li>• Aumenta produtividade com automação e IA com estratégia</li>
                  <li>• Tira TI do papel de “custo” e reposiciona como estratégia</li>
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* TALKS */}
        <FadeIn>
          <section id="temas" className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">Palestras e temas</h2>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-100 mb-6">🎓 Universidades</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {universityTalks.map((talk) => (
                  <div key={talk.title} className="bg-gray-900 p-8 rounded-lg shadow-md border-l-4 border-amber-500 h-full">
                    <h4 className="text-xl font-extrabold text-slate-100">{talk.title}</h4>
                    <p className="mt-3 text-slate-300">{talk.promise}</p>
                    <p className="mt-4 text-sm text-slate-400">{talk.forWhom}</p>
                    <ul className="mt-4 space-y-2 text-slate-200">
                      {talk.takeaways.map((t) => (
                        <li key={t}>• {t}</li>
                      ))}
                    </ul>
                    <a href="#contato" className="mt-6 inline-block text-amber-300 font-semibold hover:text-amber-200">
                      Quero essa palestra →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-100 mb-6">🏢 Empresas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {companyTalks.map((talk) => (
                  <div key={talk.title} className="bg-gray-900 p-8 rounded-lg shadow-md border-l-4 border-amber-500 h-full">
                    <h4 className="text-xl font-extrabold text-slate-100">{talk.title}</h4>
                    <p className="mt-3 text-slate-300">{talk.promise}</p>
                    <p className="mt-4 text-sm text-slate-400">{talk.forWhom}</p>
                    <ul className="mt-4 space-y-2 text-slate-200">
                      {talk.takeaways.map((t) => (
                        <li key={t}>• {t}</li>
                      ))}
                    </ul>
                    <a href="#contato" className="mt-6 inline-block text-amber-300 font-semibold hover:text-amber-200">
                      Quero essa palestra →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* PHOTO PROOF */}
        <FadeIn>
          <section className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[imgStage1, imgStage2, imgTalkRoom, imgBook].map((src, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-gray-800 bg-black/20">
                  <img src={src} alt="Foto de palestra" className="w-full h-64 object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-slate-400">
              Eventos, empresas e auditórios.

              Ex.: Malwee (Jaraguá do Sul, SC).
            </p>
          </section>
        </FadeIn>

        {/* PACKAGES */}
        <FadeIn>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">Pacotes e trilhas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((p) => (
                <div key={p.title} className="bg-black p-8 rounded-2xl border border-gray-800 h-full flex flex-col">
                  <h3 className="text-xl font-extrabold text-slate-100">{p.title}</h3>
                  <p className="mt-2 text-amber-300 font-semibold">{p.subtitle}</p>
                  <ul className="mt-5 space-y-2 text-slate-200">
                    {p.includes.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-slate-400">{p.bestFor}</p>
                  <a href="#contato" className="mt-6 inline-block text-amber-300 font-semibold hover:text-amber-200">
                    Quero proposta desse pacote →
                  </a>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* HOW IT WORKS */}
        <FadeIn>
          <section className="mb-16 bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-800">
            <h2 className="text-3xl font-bold text-slate-100 text-center mb-10">Como funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-200">
              <div className="bg-gray-950/40 border border-gray-800 rounded-xl p-6">
                <p className="text-amber-300 font-bold">1) Briefing rápido</p>
                <p className="mt-2 text-slate-300">Público, dor, objetivo e contexto do evento.</p>
              </div>
              <div className="bg-gray-950/40 border border-gray-800 rounded-xl p-6">
                <p className="text-amber-300 font-bold">2) Customização</p>
                <p className="mt-2 text-slate-300">Ajustes de exemplos, linguagem e profundidade.</p>
              </div>
              <div className="bg-gray-950/40 border border-gray-800 rounded-xl p-6">
                <p className="text-amber-300 font-bold">3) Palestra + Q&A</p>
                <p className="mt-2 text-slate-300">Conteúdo direto e aplicável. Espaço para perguntas.</p>
              </div>
              <div className="bg-gray-950/40 border border-gray-800 rounded-xl p-6">
                <p className="text-amber-300 font-bold">4) Próximos passos</p>
                <p className="mt-2 text-slate-300">Recomendações e desdobramentos (se fizer sentido).</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Master of Ceremonies */}
        {mcEvents.length > 0 && (
          <FadeIn>
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-800">
                <FadeIn>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-slate-100 mb-4">Mestre de Cerimônias</h2>
                    <p className="text-lg text-slate-300 mb-8">
                      Condução de eventos com leveza e presença, conectando público e conteúdo.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                      {mcEvents.map((event) => (
                        <span
                          key={event}
                          className="bg-gray-800 text-amber-300 text-sm font-medium px-4 py-2 rounded-full border border-gray-700"
                        >
                          {event}
                        </span>
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

        {/* Mentorship */}
        {mentorship && (
          <FadeIn>
            <section className="mb-16 bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-800">
              <h2 className="text-3xl font-bold text-slate-100 text-center mb-4">{mentorship.title}</h2>
              <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto mb-8">{mentorship.description}</p>
              <div className="max-w-md mx-auto space-y-3 mb-6">
                {mentorship.topics.map((topic) => (
                  <p key={topic} className="text-slate-200">
                    <i className="fas fa-check-circle text-amber-400 mr-3"></i>
                    {topic}
                  </p>
                ))}
              </div>
              <p className="text-center font-semibold text-amber-400">{mentorship.result}</p>
            </section>
          </FadeIn>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <FadeIn>
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">Depoimentos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <FadeIn key={index} delay={`delay-${index * 100}`}
                  >
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

        {/* CONTACT */}
        <FadeIn>
          <div
            id="contato"
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-800"
          >
            <FadeIn>
              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Vamos conversar?</h2>
                <p className="text-lg text-slate-300 mb-6">
                  Me diga o público, o objetivo e a data.
                  
                  Eu retorno com proposta e recomendações de formato.
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
                <ContactForm subjectDefault="Perguntas sobre Palestras e Treinamentos" />
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Speaking;
