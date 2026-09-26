import React, { useMemo, useState } from 'react';

const PIX_KEY = '05640665750';

const Recupere10Horas: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const benefits = useMemo(() => [
    'Um método simples para localizar onde suas horas estão vazando',
    'Matriz prática para cortar, delegar, automatizar ou adiar tarefas',
    'Roteiro de 7 dias para reorganizar sua agenda sem virar escravo de aplicativo',
    'Prompts de IA para transformar tarefas repetitivas em fluxos mais rápidos',
    'Checklist semanal de 15 minutos para manter o ganho de tempo'
  ], []);

  const copyPix = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sendIntent = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: 'Compra — Recupere 10 Horas por Semana',
          message: 'Cliente iniciou a compra do ebook Recupere 10 Horas por Semana por R$ 27,00. Aguardar confirmação do Pix e liberar o material.'
        })
      });
      if (!resp.ok) throw new Error('Falha');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <section className="px-6 py-16 md:py-24 border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.2),_transparent_35%),radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_35%)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 mb-6">
              Ebook prático • leitura rápida • aplicação imediata
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Recupere <span className="text-cyan-300">10 horas por semana</span> sem trabalhar mais rápido.
            </h1>
            <p className="mt-6 text-xl text-slate-300 leading-relaxed">
              Um sistema enxuto para identificar desperdícios de tempo, automatizar tarefas repetitivas e proteger suas horas de maior valor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">Sem rotina impossível</span>
              <span className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">Sem papo motivacional</span>
              <span className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">Feito para gente ocupada</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl">
            <p className="text-slate-400 line-through">R$ 47,00</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-5xl font-black">R$ 27</span>
              <span className="text-slate-400 mb-1">pagamento único</span>
            </div>
            <p className="mt-4 text-sm text-slate-300">Oferta inicial de lançamento.</p>

            <button onClick={copyPix} className="mt-6 w-full rounded-xl bg-cyan-300 hover:bg-cyan-200 text-slate-950 font-black px-5 py-4 transition">
              {copied ? 'Chave Pix copiada ✓' : 'Copiar chave Pix e comprar'}
            </button>
            <div className="mt-3 rounded-xl bg-black/20 border border-white/10 p-4 text-center">
              <p className="text-xs uppercase tracking-widest text-slate-500">Chave Pix</p>
              <p className="mt-1 font-mono text-lg">{PIX_KEY}</p>
            </div>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              Após o pagamento, preencha seus dados abaixo. A confirmação será usada para liberar o material.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-black">O problema não é falta de tempo. É vazamento de tempo.</h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Reuniões mal definidas, notificações, tarefas pequenas, retrabalho e decisões que se repetem todos os dias podem consumir horas sem parecer importantes isoladamente.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Este ebook foi desenhado para transformar esse caos em um sistema claro de decisões: o que eliminar, o que proteger, o que delegar e o que automatizar.
            </p>
          </div>
          <div className="space-y-3">
            {benefits.map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-300 text-slate-950 font-black flex items-center justify-center shrink-0">✓</div>
                <p className="text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-8 md:p-10">
          <h2 className="text-3xl font-black">Já fez o Pix?</h2>
          <p className="mt-3 text-slate-300">Preencha abaixo para registrar sua compra e receber a liberação.</p>

          <form onSubmit={sendIntent} className="mt-7 grid gap-4">
            <input required placeholder="Seu nome" value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-cyan-300" />
            <input required type="email" placeholder="Seu melhor e-mail" value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-cyan-300" />
            <input placeholder="WhatsApp (opcional)" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} className="rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-cyan-300" />
            <button disabled={status==='sending'} className="rounded-xl bg-white text-slate-950 font-black px-5 py-4 disabled:opacity-60">
              {status==='sending' ? 'Registrando...' : 'Registrar minha compra'}
            </button>
            {status==='sent' && <p className="text-emerald-300 text-sm">Compra registrada. Verifique seu e-mail após a confirmação do pagamento.</p>}
            {status==='error' && <p className="text-rose-300 text-sm">Não conseguimos registrar agora. Guarde o comprovante e tente novamente em alguns minutos.</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Recupere10Horas;
