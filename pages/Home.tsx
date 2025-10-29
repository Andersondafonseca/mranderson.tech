import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import FadeIn from '../components/FadeIn';

const Home: React.FC = () => {
  return (
    <div className="mb-20">
      {/* Hero Section */}
      <section className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight">
                  Autor, palestrante e criador de negócios que transformam{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    tecnologia em impacto real
                  </span>.
                </h1>
                <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto md:mx-0">
                  Conecto ideias, pessoas e tecnologia para construir o futuro. Conheça meu trabalho e vamos criar algo extraordinário juntos.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button to="/palestras" variant="primary">Contrate para Palestras</Button>
                  <Button to="/sobre" variant="secondary">Conheça minha história</Button>
                </div>
              </div>
            </FadeIn>
            
            {/* Image Column */}
            <FadeIn delay="delay-200">
              <div className="flex items-center justify-center">
                  <img
                      src="https://geniesoftware.com.br/mrandersonwebp.webp"
                      alt="Mr. Anderson em uma montagem gráfica com elementos de tecnologia"
                      className="w-full max-w-md md:max-w-full h-auto rounded-lg shadow-2xl"
                      fetchPriority="high"
                      decoding="async"
                  />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Livros */}
            <Link to="/livros" className="block p-8 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="text-5xl text-amber-400 mb-4"><i className="fas fa-book-open"></i></div>
              <h3 className="text-2xl font-bold text-slate-100 mb-2">Livros</h3>
              <p className="text-slate-300">Explore insights e estratégias no meu livro "As 7 Portas da TI" e futuros lançamentos.</p>
            </Link>

            {/* Palestras */}
            <Link to="/palestras" className="block p-8 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="text-5xl text-amber-400 mb-4"><i className="fas fa-microphone-alt"></i></div>
              <h3 className="text-2xl font-bold text-slate-100 mb-2">Palestras</h3>
              <p className="text-slate-300">Leve para seu evento temas como inovação, vendas em TI e o futuro da tecnologia.</p>
            </Link>

            {/* Blog */}
            <Link to="/blog" className="block p-8 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="text-5xl text-amber-400 mb-4"><i className="fas fa-newspaper"></i></div>
              <h3 className="text-2xl font-bold text-slate-100 mb-2">Blog</h3>
              <p className="text-slate-300">Artigos e reflexões sobre negócios, tecnologia e as tendências que moldam nosso mundo.</p>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Home;