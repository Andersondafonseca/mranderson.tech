import React, { useEffect, useMemo, useState } from 'react';
import FadeIn from '../components/FadeIn';

const GROUPS_TXT_URL = '/groups.txt';

function normalizeLink(line: string) {
  const v = line.trim();
  if (!v) return null;
  if (v.startsWith('#')) return null;
  return v;
}

const Obrigado: React.FC = () => {
  const [groupLink, setGroupLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(GROUPS_TXT_URL, { cache: 'no-store' });
        const txt = await res.text();
        const first = txt
          .split('\n')
          .map(normalizeLink)
          .find((x) => Boolean(x));

        setGroupLink((first as string) || null);
      } catch {
        setGroupLink(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const ctaLabel = useMemo(() => {
    if (loading) return 'Carregando…';
    if (!groupLink) return 'Link do grupo indisponível';
    return 'Entrar no Grupo VIP (WhatsApp)';
  }, [groupLink, loading]);

  return (
    <div className="bg-black text-slate-200">
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-950" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Inscrição confirmada
              <span className="text-amber-400">.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300">
              Falta só um passo.
              <br />
              Para receber links, avisos e materiais, entre no Grupo VIP.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
              <a
                href={groupLink || '#'}
                target="_blank"
                rel="noreferrer"
                className={`block w-full text-center px-6 py-4 rounded-xl font-bold transition-colors ${
                  groupLink
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                    : 'bg-gray-800 text-slate-400 cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if (!groupLink) e.preventDefault();
                }}
              >
                {ctaLabel}
              </a>

              <p className="mt-4 text-sm text-slate-300">
                O grupo é silencioso.
                <br />
                Apenas eu e minha equipe enviaremos informações importantes.
              </p>

              <div className="mt-6 rounded-xl border border-gray-800 bg-black/30 p-4">
                <h2 className="text-base font-semibold text-white">Por que entrar?</h2>
                <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-300">
                  <li>Links das aulas.</li>
                  <li>Materiais em PDF e o mapa gratuito.</li>
                  <li>Avisos exclusivos e bônus de abertura.</li>
                </ul>
              </div>

              {!groupLink && !loading && (
                <p className="mt-4 text-xs text-amber-300">
                  Dica: atualize o arquivo <strong>public/groups.txt</strong> com ao menos um link
                  válido.
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Obrigado;
