import React from 'react';
import { Ship, Award, BookOpen, Calculator, HelpCircle, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentTab: 'simulador' | 'incoterms' | 'calculadora' | 'glossario' | 'quiz';
  onSelectTab: (tab: 'simulador' | 'incoterms' | 'calculadora' | 'glossario' | 'quiz') => void;
  onResetSimulation: () => void;
  onOpenCertificate: () => void;
  simulationCompleted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onResetSimulation,
  onOpenCertificate,
  simulationCompleted,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sky-900 text-white flex items-center justify-center shadow-sm">
              <Ship className="w-5 h-5 text-sky-300" />
            </div>
            <button
              onClick={() => onSelectTab('simulador')}
              className="text-left group cursor-pointer"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-sky-900 transition-colors">
                ComexEdu
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                Simulador de Comércio Exterior
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('simulador')}
              className={`transition-colors cursor-pointer py-1 border-b-2 ${
                currentTab === 'simulador'
                  ? 'text-sky-900 border-sky-700 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Simulador 7 Etapas
            </button>

            <button
              onClick={() => onSelectTab('incoterms')}
              className={`transition-colors cursor-pointer py-1 border-b-2 ${
                currentTab === 'incoterms'
                  ? 'text-sky-900 border-sky-700 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Guia Incoterms 2020
            </button>

            <button
              onClick={() => onSelectTab('calculadora')}
              className={`transition-colors cursor-pointer py-1 border-b-2 ${
                currentTab === 'calculadora'
                  ? 'text-sky-900 border-sky-700 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Calculadora de Impostos
            </button>

            <button
              onClick={() => onSelectTab('glossario')}
              className={`transition-colors cursor-pointer py-1 border-b-2 ${
                currentTab === 'glossario'
                  ? 'text-sky-900 border-sky-700 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Glossário do Jovem Comex
            </button>

            <button
              onClick={() => onSelectTab('quiz')}
              className={`transition-colors cursor-pointer py-1 border-b-2 ${
                currentTab === 'quiz'
                  ? 'text-sky-900 border-sky-700 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Desafio & Quiz
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onResetSimulation}
              title="Reiniciar simulador com novo caso"
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>

            {simulationCompleted ? (
              <button
                onClick={onOpenCertificate}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Award className="w-4 h-4 text-emerald-200" />
                <span>Meu Certificado</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectTab('simulador')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Operação em Curso</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile secondary navigation */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-slate-100 text-xs overflow-x-auto gap-2">
          <button
            onClick={() => onSelectTab('simulador')}
            className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'simulador' ? 'bg-sky-100 text-sky-900 font-semibold' : 'text-slate-600'}`}
          >
            Simulador
          </button>
          <button
            onClick={() => onSelectTab('incoterms')}
            className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'incoterms' ? 'bg-sky-100 text-sky-900 font-semibold' : 'text-slate-600'}`}
          >
            Incoterms
          </button>
          <button
            onClick={() => onSelectTab('calculadora')}
            className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'calculadora' ? 'bg-sky-100 text-sky-900 font-semibold' : 'text-slate-600'}`}
          >
            Calculadora
          </button>
          <button
            onClick={() => onSelectTab('glossario')}
            className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'glossario' ? 'bg-sky-100 text-sky-900 font-semibold' : 'text-slate-600'}`}
          >
            Glossário
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'quiz' ? 'bg-sky-100 text-sky-900 font-semibold' : 'text-slate-600'}`}
          >
            Quiz
          </button>
        </div>
      </div>
    </header>
  );
};
