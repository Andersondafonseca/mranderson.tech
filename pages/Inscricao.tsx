import React from 'react';
import FadeIn from '../components/FadeIn';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc9CWuF2QAMlqdQHY3hdkkcgh2jN-nIHo91jr2GoNeq2NgRlg/viewform?usp=header';

const Inscricao: React.FC = () => {
  return (
    <div className="bg-black text-slate-200">
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-950" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Descubra como atravessar a porta certa da TI e conquistar sua vaga tech em 2026,
              mesmo começando do zero.
              <span className="text-amber-400">.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-3xl">
              Participe de um evento online e gratuito.
              <br />
              Você vai conhecer o Mapa das 7 Portas.
              <br />
              Um método prático para quem deseja migrar para a tecnologia sem depender apenas de
              programação ou matemática.
            </p>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeIn>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
                <h2 className="text-xl font-bold text-white">Para quem é este evento</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li>Você está perdido e não sabe por onde começar.</li>
                  <li>Você trava ao pensar em código e quer outras rotas.</li>
                  <li>Você quer transição com segurança e medo não pode decidir por você.</li>
                  <li>Você quer um plano real de quem vive o mercado há 26 anos.</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="lg:col-span-2 rounded-2xl border border-gray-800 bg-gray-900/30 p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-white">Inscrição</h2>
                  <a
                    href={FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-amber-400 hover:text-amber-300"
                  >
                    Abrir em nova aba
                  </a>
                </div>

                <div className="mt-4 rounded-xl overflow-hidden border border-gray-800 bg-black">
                  <iframe
                    title="Inscrição - Google Form"
                    src={FORM_URL}
                    className="w-full"
                    style={{ height: '920px' }}
                  />
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Após enviar, você será direcionado para a página de confirmação.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
              <h2 className="text-xl font-bold text-white">Quem é o mentor</h2>
              <p className="mt-3 text-slate-300">
                Mr. Anderson é Executivo de Tecnologia, autor do livro “As 7 Portas da TI” e mentor
                de carreira.
                <br />
                Com mais de 26 anos de experiência no topo do mercado tech, ele criou o framework
                das 7 Portas para ajudar iniciantes a encontrarem o caminho mais rápido para a
                empregabilidade.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Inscricao;
