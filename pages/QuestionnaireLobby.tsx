import React from 'react';
import { Link } from 'react-router-dom';
import { questionnaires } from '../data/questionnaireData';
import { useAuth } from '../contexts/AuthContext';

const QuestionnaireLobby: React.FC = () => {
  const { user } = useAuth();
  const results = user?.questionnaireResults || {};

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">
            Checklist de Carreira: As 7 Portas da TI
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            Cada porta representa uma área fundamental da tecnologia. Responda aos questionários para descobrir qual delas tem mais a ver com seu perfil e construa um plano de carreira com mais clareza e propósito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {questionnaires.map((quiz) => (
            <Link 
              key={quiz.slug}
              to={`/area-exclusiva/questionario/${quiz.slug}`}
              className="block bg-gray-900 rounded-lg shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 group"
            >
              <div className="text-6xl text-amber-400 mb-4 transition-transform duration-300 group-hover:scale-110">
                <i className={quiz.icon}></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-100">{quiz.title}</h2>
              <p className="text-slate-400 mt-2 mb-6">{quiz.description}</p>
              <span className="font-semibold text-amber-500 group-hover:text-amber-400 transition-colors">
                Começar Questionário <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Career Scorecard Section */}
        <section className="mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-slate-100">Seu Placar de Carreira</h2>
                <p className="mt-3 text-lg text-slate-400 max-w-3xl mx-auto">
                    Acompanhe seu progresso e veja seu perfil em cada uma das 7 Portas.
                </p>
            </div>
            <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-xl p-8">
                <div className="space-y-6">
                    {questionnaires.map((quiz) => {
                        const userScore = results[quiz.slug];
                        const maxScore = quiz.sections.reduce((acc, section) => acc + section.questions.length, 0);
                        const scorePercentage = (userScore / maxScore) * 100 || 0;
                        const hasResult = userScore !== undefined;

                        return (
                            <div key={quiz.slug} className={`transition-opacity ${hasResult ? 'opacity-100' : 'opacity-60'}`}>
                                <div className="flex items-center gap-4 mb-2">
                                    <i className={`${quiz.icon} text-amber-400 text-2xl w-8 text-center`}></i>
                                    <h3 className="text-xl font-semibold text-slate-100 flex-grow">{quiz.title}</h3>
                                    <span className="text-slate-300 font-mono text-lg">
                                        {hasResult ? `${userScore}/${maxScore}` : '--/--'}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-4">
                                    <div 
                                        className="bg-gradient-to-r from-amber-500 to-yellow-500 h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${scorePercentage}%` }}
                                        role="progressbar"
                                        aria-valuenow={scorePercentage}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`Pontuação para ${quiz.title}: ${userScore} de ${maxScore}`}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default QuestionnaireLobby;