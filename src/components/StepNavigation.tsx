import React from 'react';
import { 
  FileSpreadsheet, 
  Coins, 
  Truck, 
  FileText, 
  Layers, 
  ShieldCheck, 
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  completedSteps: number[];
}

export const STEP_ITEMS = [
  {
    step: 1,
    title: 'Negociação & NCM',
    subtitle: 'Produto, Incoterm e NCM',
    icon: FileSpreadsheet,
  },
  {
    step: 2,
    title: 'Câmbio & Finanças',
    subtitle: 'Moeda, PTAX e Pagamento',
    icon: Coins,
  },
  {
    step: 3,
    title: 'Logística & Frete',
    subtitle: 'Modal, Rota e Seguro',
    icon: Truck,
  },
  {
    step: 4,
    title: 'Dossiê Documental',
    subtitle: 'Invoice, Packing List e B/L',
    icon: FileText,
  },
  {
    step: 5,
    title: 'Portal Siscomex',
    subtitle: 'Registro DU-E / DUIMP',
    icon: Layers,
  },
  {
    step: 6,
    title: 'Parametrização',
    subtitle: 'Canais da Receita Federal',
    icon: ShieldCheck,
  },
  {
    step: 7,
    title: 'Custos & Avaliação',
    subtitle: 'DRE Final e Certificado',
    icon: TrendingUp,
  },
];

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  onSelectStep,
  completedSteps,
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Step progress bar on desktop */}
        <div className="hidden lg:grid grid-cols-7 gap-2">
          {STEP_ITEMS.map((item) => {
            const Icon = item.icon;
            const isCurrent = currentStep === item.step;
            const isCompleted = completedSteps.includes(item.step);

            return (
              <button
                key={item.step}
                onClick={() => onSelectStep(item.step)}
                className={`text-left p-2.5 rounded-lg transition-all border text-xs cursor-pointer ${
                  isCurrent
                    ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-400'
                    : isCompleted
                    ? 'bg-slate-50 border-emerald-200 hover:bg-slate-100'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        isCurrent
                          ? 'bg-sky-900 text-white'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : item.step}
                    </span>
                    <span className="font-semibold text-slate-800 text-[11px] truncate">
                      {item.title}
                    </span>
                  </div>
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isCurrent
                        ? 'text-sky-700'
                        : isCompleted
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                  />
                </div>
                <div className="text-[10px] text-slate-500 truncate pl-6">
                  {item.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile / Tablet scrollable stepper */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {STEP_ITEMS.map((item) => {
            const isCurrent = currentStep === item.step;
            const isCompleted = completedSteps.includes(item.step);

            return (
              <button
                key={item.step}
                onClick={() => onSelectStep(item.step)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'bg-sky-50 border-sky-400 text-sky-950 font-semibold shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent
                      ? 'bg-sky-900 text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? '✓' : item.step}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
