import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

export const ComexQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const userChoice = selectedAnswers[currentQ.id];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: idx,
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setCurrentIdx(0);
    setQuizFinished(false);
  };

  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 tracking-wide uppercase mb-1">
          <span>Desafio em Sala de Aula</span>
          <span>·</span>
          <span>Simulado Rápido de Fixação</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Quiz de Conhecimentos em Comércio Exterior
        </h1>
        <p className="text-sm text-indigo-100/90 mt-1">
          Teste seus conhecimentos práticos sobre Incoterms, NCM, Siscomex, canais de conferência aduaneira e documentação internacional.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
            <span className="font-bold text-slate-800">
              Questão {currentIdx + 1} de {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-slate-500 font-mono">
              Pontuação atual: {correctCount} acertos
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              {currentQ.context}
            </span>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((option, idx) => {
              const isChosen = userChoice === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let buttonStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300';
              if (showExplanation) {
                if (isCorrect) {
                  buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                } else if (isChosen && !isCorrect) {
                  buttonStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400';
                } else {
                  buttonStyle = 'opacity-50 border-slate-200 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[11px] text-slate-700 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {showExplanation && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {showExplanation && isChosen && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout */}
          {showExplanation && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
              userChoice === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {userChoice === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Resposta Correta!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-700" />
                    <span>Ops! Veja a justificativa técnica:</span>
                  </>
                )}
              </div>
              <p>{currentQ.explanation}</p>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Quiz Concluído!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Você acertou <strong className="text-slate-900 font-mono text-base">{correctCount}</strong> de {QUIZ_QUESTIONS.length} questões ({Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)}%).
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl max-w-md mx-auto text-xs text-slate-700">
            {correctCount === 5 ? (
              <p className="font-semibold text-emerald-800">
                🏆 Sensacional! Você acertou todas as questões e já pensa como um despachante aduaneiro e analista sênior de Comex!
              </p>
            ) : correctCount >= 3 ? (
              <p className="text-sky-900">
                👏 Muito bom! Você possui excelente compreensão das etapas de comércio exterior. Revise o Guia de Incoterms e a Calculadora para gabaritar!
              </p>
            ) : (
              <p className="text-slate-700">
                Continue praticando! Use o simulador passo a passo e o glossário para reforçar os conceitos aduaneiros e fiscais.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refazer Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
