
import React, { useState } from 'react';
import Button from './Button';

const ContactForm: React.FC<{ subjectDefault?: string }> = ({ subjectDefault = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: subjectDefault,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Use the environment variable for the API URL.
    const WP_API_URL = process.env.REACT_APP_WP_API_URL_NEW;
    if (!WP_API_URL) {
      console.error("Contact form submission failed: REACT_APP_WP_API_URL_NEW is not set.");
      setStatus('error');
      return;
    }
    const apiEndpoint = `${WP_API_URL}/wp-json/mranderson-api/v1/contact`;

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: subjectDefault, message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } else {
            console.error('Submission failed:', await response.json());
            setStatus('error');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        setStatus('error');
    }
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
        <label htmlFor="phone" className="block text-sm font-medium text-slate-300">Telefone/WhatsApp</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 placeholder-slate-400"
        />
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