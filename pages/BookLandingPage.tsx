import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { useCmsData } from '../hooks/useCmsData';
import { BookLandingPageData } from '../types';

const BookLandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pageData, setPageData] = useState<BookLandingPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getBookLandingPageData } = useCmsData();

  useEffect(() => {
    const fetchPageData = async () => {
      if (slug) {
        setIsLoading(true);
        const data = await getBookLandingPageData(slug);
        setPageData(data);
        setIsLoading(false);
      }
    };
    fetchPageData();
  }, [slug, getBookLandingPageData]);

  useEffect(() => {
    // Prevent scrolling when the modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);


  if (isLoading) {
    return <div className="text-center py-20">Carregando informações do livro...</div>;
  }

  if (!pageData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Livro não encontrado.</h1>
        <Link to="/livros" className="mt-4 inline-block text-amber-400 hover:underline">Voltar para todos os livros</Link>
      </div>
    );
  }

  const handleCtaClick = () => {
    window.open(pageData.amazonLink, '_blank');
  };

  const openVideoModal = () => {
    if (pageData.youtubeVideoId) {
        setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-black text-slate-200">
      {/* 1. Hero Section */}
      <section className="py-20 md:py-32 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="mb-4">
                <span className="bg-amber-400 text-black text-sm font-bold inline-block px-4 py-1 rounded-full uppercase tracking-wider">
                  <i className="fas fa-star mr-2"></i>Autor Best-Seller na Amazon
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-100 leading-tight">
                {pageData.heroHeadline}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-300">
                {pageData.heroSubheadline}
              </p>
              <div className="mt-10">
                <Button onClick={handleCtaClick} variant="primary" className="w-full sm:w-auto">
                  {pageData.heroCtaText}
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div
                role={pageData.youtubeVideoId ? "button" : undefined}
                tabIndex={pageData.youtubeVideoId ? 0 : -1}
                aria-label={pageData.youtubeVideoId ? "Assistir vídeo de apresentação" : undefined}
                className={`relative group ${pageData.youtubeVideoId ? 'cursor-pointer' : ''}`}
                onClick={openVideoModal}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openVideoModal();
                  }
                }}
              >
                <img
                  src={pageData.coverImageUrl}
                  alt={`Capa do livro ${pageData.pageTitle}`}
                  className="w-64 md:w-80 rounded-lg shadow-2xl shadow-amber-500/10 transform transition-transform duration-500 group-hover:scale-105"
                />
                {pageData.youtubeVideoId && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center rounded-lg">
                    <div className="w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white text-4xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <i className="fas fa-play"></i>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Storytelling / Identification */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-slate-100 italic leading-relaxed">
            "{pageData.problemStatement}"
          </p>
          <p className="mt-6 text-lg text-slate-300">
            {pageData.empathyStatement}
          </p>
        </div>
      </section>

      {/* 3. Author Introduction */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={pageData.authorImageUrl}
                alt={pageData.authorName}
                className="w-56 h-56 object-cover rounded-full border-4 border-amber-400 tech-glow"
              />
            </div>
            <div className="md:col-span-2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-100">Sobre o Autor: {pageData.authorName}</h2>
              <ul className="mt-4 space-y-2 text-slate-300 text-lg">
                {pageData.authorBio.map((item, index) => (
                  <li key={index}><i className="fas fa-check-circle text-amber-400 mr-2"></i>{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-slate-300 text-lg border-l-4 border-amber-500 pl-4 italic">
                "{pageData.authorQuote}"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. What you'll find */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">{pageData.benefitsTitle}</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Não apenas tópicos técnicos, mas transformações reais para sua carreira.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-amber-400 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <i className={`${benefit.icon} text-amber-400 text-3xl`}></i>
                  <h3 className="ml-4 text-xl font-bold text-slate-100">{benefit.title}</h3>
                </div>
                <p className="text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">{pageData.testimonialsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pageData.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black p-8 rounded-lg border border-gray-800 flex flex-col">
                <p className="text-slate-300 italic flex-grow">"{testimonial.quote}"</p>
                <div className="mt-6">
                  <p className="font-bold text-amber-400">{testimonial.author}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Offer + Bonus */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-500/10 to-gray-900/0 border-2 border-amber-500 rounded-2xl p-8 md:p-12 text-center tech-glow">
            <p className="text-4xl font-bold text-slate-100">{pageData.offerPrice}</p>
            {pageData.bonus && (
              <div className="mt-6 bg-amber-500/10 border border-amber-400 rounded-lg p-4">
                <h3 className="font-bold text-amber-300 text-lg">{pageData.bonus.title}</h3>
                <p className="text-slate-200 mt-2">{pageData.bonus.description}</p>
              </div>
            )}
            <div className="mt-8">
              <Button onClick={handleCtaClick} variant="primary" className="w-full sm:w-auto text-lg py-4 px-10">
                {pageData.offerCtaText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-amber-500 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            {pageData.finalCtaTitle}
          </h2>
          <div className="mt-8">
            <Button onClick={handleCtaClick} variant="secondary" className="bg-black text-amber-400 border-black hover:bg-gray-800 text-lg py-4 px-10">
              {pageData.finalCtaButtonText}
            </Button>
          </div>
          <p className="mt-6 text-black font-semibold">
            <i className="fas fa-shield-alt mr-2"></i>{pageData.guaranteeText}
          </p>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && pageData.youtubeVideoId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl shadow-amber-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-white text-4xl hover:text-amber-400 transition-colors z-10"
              aria-label="Fechar vídeo"
            >
              &times;
            </button>
            <YouTubeEmbed videoId={pageData.youtubeVideoId} title={`Vídeo de apresentação do livro ${pageData.pageTitle}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookLandingPage;