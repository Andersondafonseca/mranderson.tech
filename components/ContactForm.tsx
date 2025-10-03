
import React, { useState } from 'react';
import Button from './Button';

const ContactForm: React.FC<{ subjectDefault?: string }> = ({ subjectDefault = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subjectDefault,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    console.log('Form data submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      // Simulate success for demo purposes
      setStatus('success');
      setFormData({ name: '', email: '', subject: subjectDefault, message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 placeholder-slate-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 placeholder-slate-400"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-300">Assunto</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 placeholder-slate-400"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300">Mensagem</label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 placeholder-slate-400"
        ></textarea>
      </div>
      <div>
        <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
      </div>
      {status === 'success' && <p className="text-green-400 mt-4">Obrigado pelo seu contato! Retornarei em breve.</p>}
      {status === 'error' && <p className="text-red-400 mt-4">Ocorreu um erro ao enviar a mensagem. Tente novamente.</p>}
    </form>
  );
};

export default ContactForm;