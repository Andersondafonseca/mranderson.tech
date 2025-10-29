import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { questionnaires } from '../data/questionnaireData';
import { Questionnaire as QuestionnaireType } from '../types';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const Questionnaire: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, saveQuestionnaireResults } = useAuth();
  const [quiz, setQuiz] = useState<QuestionnaireType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const foundQuiz = questionnaires.find(q => q.slug === slug) || null;
    setQuiz(foundQuiz);
  }, [slug]);

  const allQuestions = useMemo(() => {
    return quiz?.sections.flatMap(section => section.questions) || [];
  }, [quiz]);
  
  const score = useMemo(() => {
    return Object.values(answers).filter(Boolean).length;
  }, [answers]);

  // Save result to backend when quiz is completed
  useEffect(() => {
    if (showResult && quiz && user) {
      saveQuestionnaireResults(quiz.slug, score);
    }
  }, [showResult, quiz, score, user, saveQuestionnaireResults]);


  const handleAnswer = (answer: boolean) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
  }

  const result = useMemo(() => {
    if (!quiz) return null;
    return quiz.results.find(r => score >= r.minScore && score <= r.maxScore) || null;
  }, [quiz, score]);

  const progress = allQuestions.length > 0 ? ((currentQuestionIndex) / allQuestions.length) * 100 : 0;
  
  if (!quiz) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Questionário não encontrado.</h1>
        <Link to="/area-exclusiva/questionarios" className="mt-4 inline-block text-amber-400 hover:underline">
          Voltar para a lista
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showResult ? (
          <>
            {/* Header and Progress Bar */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100">{quiz.title}</h1>
              <p className="mt-2 text-lg text-slate-400">{quiz.subtitle}</p>
            </div>
            
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-sm text-slate-300">
                    <span>Progresso</span>
                    <span>Pergunta {currentQuestionIndex + 1} de {allQuestions.length}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div 
                        className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}>
                    </div>
                </div>
            </div>

            {/* Question Area */}
            <div className="bg-gray-900 p-8 md:p-12 rounded-lg shadow-xl text-center min-h-[300px] flex flex-col justify-center">
              <p className="text-2xl md:text-3xl font-semibold text-slate-100">
                {allQuestions[currentQuestionIndex]}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button onClick={handleBack} variant="secondary" className="w-full sm:w-auto" disabled={currentQuestionIndex === 0}>
                    <i className="fas fa-arrow-left mr-2"></i> Voltar
                </Button>
                <div className="flex w-full sm:w-auto gap-4">
                    <Button onClick={() => handleAnswer(true)} variant="primary" className="flex-1">Sim</Button>
                    <Button onClick={() => handleAnswer(false)} variant="primary" className="flex-1">Não</Button>
                </div>
            </div>
          </>
        ) : (
          /* Result Screen */
          <div className="text-center">
             <h2 className="text-3xl font-bold text-slate-100">Identifique seu Perfil</h2>
             <p className="text-slate-400 mt-2">Você marcou <span className="font-bold text-amber-400">{score}</span> de <span className="font-bold text-amber-400">{allQuestions.length}</span> pontos.</p>

            {result && (
                <div className="mt-8 bg-gray-900 p-8 rounded-lg border-t-4 border-amber-500 shadow-2xl">
                    <div className="text-6xl mb-4"><i className={result.icon}></i></div>
                    <h3 className="text-2xl font-bold text-slate-100">{result.title}</h3>
                    <p className="mt-4 text-slate-300 max-w-2xl mx-auto">{result.description}</p>
                </div>
            )}
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleRestart} variant="secondary">Refazer Questionário</Button>
                <Button to="/area-exclusiva/questionarios" variant="primary">Ver Outras Portas</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;