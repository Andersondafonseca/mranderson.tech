import React, { useState } from 'react';
import Button from './Button';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
    setMessage('');

    // Simulate API call
    console.log('Subscribing email:', email);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would handle success/error from your API
    // For this demo, we'll just simulate success
    setStatus('success');
    setMessage('Obrigado por se inscrever! Fique de olho na sua caixa de entrada.');
    setEmail('');
    
    // Reset form after a few seconds
    setTimeout(() => {
        setStatus('idle');
        setMessage('');
    }, 5000);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-slate-100 mb-2">Fique por Dentro</h3>
      <p className="text-slate-400 mb-6">
        Receba em primeira mão os novos artigos, notícias sobre livros e eventos. Sem spam, prometo.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Seu melhor e-mail"
          aria-label="Seu melhor e-mail"
          className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-slate-400 disabled:opacity-50"
          disabled={status === 'submitting'}
        />
        <Button type="submit" variant="primary" disabled={status === 'submitting'} className="px-6 py-3">
          {status === 'submitting' ? 'Enviando...' : 'Inscrever-se'}
        </Button>
      </form>
      {status === 'success' && <p className="text-green-400 mt-4 text-sm">{message}</p>}
      {status === 'error' && <p className="text-red-400 mt-4 text-sm">{message || 'Ocorreu um erro. Tente novamente.'}</p>}
    </div>
  );
};

export default NewsletterSignup;
