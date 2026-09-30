import React, { useMemo, useState } from 'react';

const LOGO = "data:image/webp;base64,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";

type Status = 'idle' | 'sending' | 'success' | 'error';

const styles = [
  { id: 'realeza', name: 'Realeza', pet: '🐕', tag: 'Clássico e imponente', bg: 'from-amber-900 via-amber-700 to-yellow-600' },
  { id: 'aquarela', name: 'Aquarela', pet: '🐈', tag: 'Leve e delicado', bg: 'from-sky-100 via-rose-100 to-amber-100' },
  { id: 'estudio', name: 'Estúdio', pet: '🐕', tag: 'Elegante e moderno', bg: 'from-stone-700 via-stone-500 to-stone-300' },
  { id: 'divertido', name: 'Divertido', pet: '🐈', tag: 'Criativo e cheio de personalidade', bg: 'from-teal-500 via-cyan-400 to-amber-300' },
];

const compressImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler a imagem.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Imagem inválida.'));
      img.onload = () => {
        const max = 1600;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Falha ao processar a imagem.'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });

const Petframe: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState('realeza');
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', petName: '', cep: '', notes: '' });

  const preview = useMemo(() => (photo ? URL.createObjectURL(photo) : ''), [photo]);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!photo) {
      setError('Envie uma foto do seu pet para iniciar o pedido.');
      return;
    }
    setStatus('sending');
    try {
      const photoDataUrl = await compressImage(photo);
      const response = await fetch('/api/petframe-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, style: selectedStyle, photoDataUrl, photoName: photo.name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Não foi possível enviar seu pedido.');
      setStatus('success');
    } catch (err: any) {
      setError(err?.message || 'Não foi possível enviar seu pedido.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f2ea] text-[#422e25]">
      <header className="sticky top-0 z-20 border-b border-[#e7d7c6] bg-[#f8f2ea]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <img src={LOGO} alt="Petframe" className="h-14 w-auto" />
          <a href="#pedido" className="rounded-full bg-[#8b5a3c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#71452d]">Quero meu quadro</a>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <span className="inline-flex rounded-full bg-[#efe0d1] px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#8b5a3c]">Seu pet. Sua história. Sua arte.</span>
            <h1 className="mt-5 text-5xl font-black leading-[.95] md:text-7xl">Transforme seu pet em uma obra de arte.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#74594b]">Você envia a foto. A Petframe cria duas propostas exclusivas, você aprova a favorita e só então seguimos para impressão e envio.</p>
            <div className="mt-8 flex flex-wrap items-end gap-4">
              <div>
                <p className="text-sm font-semibold text-[#8b5a3c]">Lançamento 30×40</p>
                <p className="text-5xl font-black">R$ 199</p>
                <p className="text-sm text-[#80695d]">+ frete calculado pelo CEP</p>
              </div>
              <a href="#pedido" className="rounded-2xl bg-[#8b5a3c] px-7 py-4 font-bold text-white shadow-lg shadow-[#8b5a3c]/20 transition hover:-translate-y-0.5 hover:bg-[#71452d]">Criar meu Petframe</a>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {['2 artes para escolher', 'Aprovação antes de imprimir', 'Pagamento Mercado Pago', 'Entrega em todo o Brasil'].map((x) => (
                <div key={x} className="rounded-2xl border border-[#e4d5c5] bg-white/70 p-3 font-semibold">{x}</div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[#dca86f]/20 blur-2xl" />
            <div className="relative rotate-2 rounded-[2rem] bg-[#70462f] p-5 shadow-2xl">
              <div className="rounded-[1.4rem] bg-[#f3e2ce] p-8 text-center">
                <div className="mx-auto grid h-64 place-items-center rounded-2xl bg-gradient-to-br from-[#213a31] to-[#8b5a3c] shadow-inner">
                  <div>
                    <div className="text-8xl">🐕</div>
                    <div className="mt-2 text-4xl">👑</div>
                  </div>
                </div>
                <p className="mt-5 font-serif text-2xl font-bold">Realeza</p>
                <p className="text-sm text-[#7b6558]">Exemplo de direção artística</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white/60 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[.2em] text-[#a06b48]">Escolha seu estilo</p>
              <h2 className="mt-2 text-4xl font-black">Quatro jeitos de eternizar a personalidade dele.</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {styles.map((s) => (
                <button key={s.id} type="button" onClick={() => setSelectedStyle(s.id)} className={`rounded-[1.7rem] border p-4 text-left transition ${selectedStyle === s.id ? 'border-[#8b5a3c] ring-4 ring-[#8b5a3c]/10' : 'border-[#e4d5c5] hover:-translate-y-1'} bg-white`}>
                  <div className="rounded-xl bg-[#6f4b35] p-2 shadow-lg">
                    <div className={`grid h-48 place-items-center rounded-lg bg-gradient-to-br ${s.bg}`}>
                      <span className="text-7xl drop-shadow-lg">{s.pet}</span>
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-black">{s.name}</h3>
                  <p className="mt-1 text-sm text-[#7b6558]">{s.tag}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['1', 'Envie a melhor foto', 'Uma foto nítida do rosto do seu cachorro ou gato já é suficiente.'],
              ['2', 'Receba duas propostas', 'Criamos duas versões e você escolhe a que mais combina com seu pet.'],
              ['3', 'Aprove e receba em casa', 'Depois da aprovação, seguimos para produção e despacho.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="rounded-3xl border border-[#e6d8ca] bg-white p-7">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#8b5a3c] font-black text-white">{n}</div>
                <h3 className="mt-5 text-2xl font-black">{title}</h3>
                <p className="mt-2 leading-7 text-[#765e52]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pedido" className="bg-[#3c2a22] py-16 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-[#e3b584]">Primeiro passo</p>
              <h2 className="mt-3 text-4xl font-black">Envie a foto do seu pet.</h2>
              <p className="mt-4 max-w-md leading-7 text-[#dfd0c7]">Não cobramos antes de saber o frete. Recebemos sua foto e CEP, calculamos o valor total e enviamos o pagamento pelo Mercado Pago.</p>
              <div className="mt-7 rounded-2xl bg-white/10 p-5 text-sm leading-6 text-[#eadfd8]">A foto é usada para preparar o seu pedido. Qualquer uso em publicidade exige autorização separada.</div>
            </div>

            {status === 'success' ? (
              <div className="rounded-3xl bg-white p-8 text-[#422e25]">
                <div className="text-5xl">✓</div>
                <h3 className="mt-4 text-3xl font-black">Pedido recebido.</h3>
                <p className="mt-3 leading-7 text-[#765e52]">Vamos calcular o frete pelo seu CEP e retornar com o valor total e o link seguro do Mercado Pago. Depois do pagamento, começamos as duas propostas de arte.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl bg-white p-6 text-[#422e25] md:p-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <input name="name" value={form.name} onChange={change} required placeholder="Seu nome" className="rounded-xl border border-[#ddcdbf] px-4 py-3 outline-none focus:border-[#8b5a3c]" />
                  <input name="email" value={form.email} onChange={change} required type="email" placeholder="Seu e-mail" className="rounded-xl border border-[#ddcdbf] px-4 py-3 outline-none focus:border-[#8b5a3c]" />
                  <input name="phone" value={form.phone} onChange={change} required placeholder="WhatsApp" className="rounded-xl border border-[#ddcdbf] px-4 py-3 outline-none focus:border-[#8b5a3c]" />
                  <input name="petName" value={form.petName} onChange={change} required placeholder="Nome do pet" className="rounded-xl border border-[#ddcdbf] px-4 py-3 outline-none focus:border-[#8b5a3c]" />
                  <input name="cep" value={form.cep} onChange={change} required placeholder="CEP para calcular o frete" className="rounded-xl border border-[#ddcdbf] px-4 py-3 outline-none focus:border-[#8b5a3c] md:col-span-2" />
                </div>
                <div className="mt-4 rounded-2xl border border-dashed border-[#c8ad97] bg-[#fbf6f0] p-5">
                  <label className="block font-bold">Foto do pet</label>
                  <input type="file" accept="image/*" required onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="mt-3 block w-full text-sm" />
                  {preview && <img src={preview} alt="Prévia da foto" className="mt-4 h-36 w-36 rounded-2xl object-cover" />}
                </div>
                <label className="mt-5 block text-sm font-bold">Estilo escolhido: <span className="capitalize text-[#8b5a3c]">{selectedStyle}</span></label>
                <textarea name="notes" value={form.notes} onChange={change} rows={3} placeholder="Algo que precisamos saber sobre seu pet?" className="mt-2 w-full rounded-xl border border-[#ddcdbf] px-4 py-3 outline-none focus:border-[#8b5a3c]" />
                {error && <p className="mt-4 text-sm font-bold text-red-700">{error}</p>}
                <button disabled={status === 'sending'} className="mt-5 w-full rounded-2xl bg-[#8b5a3c] px-6 py-4 text-lg font-black text-white transition hover:bg-[#71452d] disabled:opacity-60">{status === 'sending' ? 'Enviando...' : 'Quero meu Petframe'}</button>
                <p className="mt-3 text-center text-xs text-[#80695d]">Preço do quadro 30×40: R$ 199. Frete informado antes do pagamento.</p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#2d201b] px-5 py-8 text-center text-sm text-[#cdbcb1]">Petframe · Quadros personalizados de pets · Brasil</footer>
    </div>
  );
};

export default Petframe;
