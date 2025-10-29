import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../components/Button';
import YouTubeEmbed from '../../components/YouTubeEmbed';
import { useAuth } from '../../contexts/AuthContext';
import { useCmsData } from '../../hooks/useCmsData';
import { CommunityQuestion } from '../../types';

const ExclusiveEnviarPergunta: React.FC = () => {
    const { user, submitCommunityQuestion } = useAuth();
    const { getCommunityQuestions } = useCmsData();
    const [questionText, setQuestionText] = useState('');
    const [questions, setQuestions] = useState<CommunityQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const fetchQuestions = useCallback(async () => {
        setIsLoading(true);
        const data = await getCommunityQuestions();
        setQuestions(data);
        setIsLoading(false);
    }, [getCommunityQuestions]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleQuestionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!questionText.trim()) return;
        setFormStatus('submitting');
        setErrorMessage('');
        
        const result = await submitCommunityQuestion(questionText);
        
        if (result.success) {
            setFormStatus('success');
            setQuestionText('');
            // Add the new question optimistically to the UI
            const newQuestion: CommunityQuestion = {
                id: Date.now(),
                question: questionText,
                author: user?.name || 'Você',
                date: new Date().toLocaleDateString('pt-BR'),
                status: 'pending'
            };
            setQuestions(prev => [newQuestion, ...prev]);
            setTimeout(() => setFormStatus('idle'), 5000);
        } else {
            setFormStatus('error');
            setErrorMessage(result.error || 'Ocorreu um erro.');
        }
    };

    const toggleAccordion = (id: number) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    return (
        <section className="py-12 md:py-16">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 max-w-4xl mx-auto">
                <div className="text-center">
                    <div className="text-5xl text-amber-400 mb-4"><i className="fas fa-question-circle"></i></div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-3">Perguntas e Respostas</h2>
                    <p className="text-slate-300 mb-6">Tem alguma dúvida? Envie aqui. As melhores serão respondidas em vídeo! Você também pode consultar as respostas de outros membros da comunidade abaixo.</p>
                </div>
                
                {formStatus === 'success' ? (
                    <div className="text-center p-4 bg-green-900/50 border border-green-700 rounded-md mb-6">
                        <p className="font-semibold text-green-300">Obrigado! Sua pergunta foi enviada e já aparece no topo da lista abaixo.</p>
                    </div>
                ) : (
                    <form onSubmit={handleQuestionSubmit} className="space-y-4 mb-12">
                        <textarea
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            rows={4}
                            required
                            placeholder="Digite sua pergunta aqui..."
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 placeholder-slate-400"
                        ></textarea>
                         {formStatus === 'error' && <p className="text-red-400 text-sm text-center">{errorMessage}</p>}
                        <div className="text-center">
                            <Button type="submit" variant="primary" disabled={formStatus === 'submitting'}>
                                {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Pergunta'}
                            </Button>
                        </div>
                    </form>
                )}
                
                {/* Q&A List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-100 border-b border-gray-700 pb-2">Perguntas da Comunidade</h3>
                    {isLoading ? <p className="text-slate-400 text-center">Carregando perguntas...</p> : 
                    questions.map((q) => (
                        <div key={q.id} className="bg-gray-800 rounded-lg">
                            <button 
                                className="w-full flex justify-between items-center text-left p-4"
                                onClick={() => toggleAccordion(q.id)}
                                aria-expanded={activeAccordion === q.id}
                                aria-controls={`answer-${q.id}`}
                            >
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-100">{q.question}</p>
                                    <div className="flex items-center text-xs text-slate-400 mt-2 gap-4">
                                        <span><i className="fas fa-user mr-1"></i> {q.author}</span>
                                        <span><i className="fas fa-calendar-alt mr-1"></i> {q.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 ml-4">
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${q.status === 'answered' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                        {q.status === 'answered' ? 'Respondida' : 'Aguardando'}
                                    </span>
                                    <i className={`fas fa-chevron-down text-slate-400 transition-transform duration-300 ${activeAccordion === q.id ? 'transform rotate-180' : ''}`}></i>
                                </div>
                            </button>
                            <div 
                                id={`answer-${q.id}`}
                                className={`overflow-hidden transition-all duration-500 ${activeAccordion === q.id ? 'max-h-[1000px]' : 'max-h-0'}`}
                            >
                                <div className="border-t border-gray-700 p-4 md:p-6">
                                    {q.status === 'answered' && q.answer ? (
                                        <div>
                                            {q.answer.text && <p className="text-slate-300 mb-4">{q.answer.text}</p>}
                                            {q.answer.youtubeVideoId && (
                                                <div className="rounded-lg overflow-hidden shadow-lg">
                                                    <YouTubeEmbed videoId={q.answer.youtubeVideoId} title={`Resposta para: ${q.question}`} />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-slate-400 italic">Esta pergunta está na fila para ser respondida. Fique de olho na Videoteca para novidades!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExclusiveEnviarPergunta;