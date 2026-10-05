import React from 'react';
import { SimulationState } from '../types/comex';
import { X, Printer, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  state: SimulationState;
  onClose: () => void;
}

export const CompletionCertificateModal: React.FC<CertificateModalProps> = ({
  state,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const studentName = state.studentName?.trim() || 'Estudante de Comércio Exterior';
  const classGroup = state.classGroup?.trim() || 'Turma de Formação Profissional';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8">
        {/* Top Action bar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Certificado de Operação Aduaneira Concluída</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 border-8 border-slate-100 relative print:border-none print:p-4">
          {/* Subtle watermark border */}
          <div className="border-2 border-sky-900/30 p-6 sm:p-8 rounded-xl relative space-y-6 text-center">
            {/* Header Stamp */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-sky-900 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-8 h-8 text-sky-300" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-sky-800 uppercase tracking-widest block">
                  ComexEdu · Simulação de Comércio Exterior do Brasil
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-1">
                  CERTIFICADO DE DESPACHO ADUANEIRO
                </h1>
              </div>
            </div>

            {/* Certificate Body Text */}
            <div className="space-y-4 max-w-xl mx-auto text-sm leading-relaxed text-slate-700 pt-2">
              <p>
                Certificamos que o(a) aluno(a) e futuro(a) operador(a) de Comércio Exterior
              </p>

              <div className="text-2xl font-bold text-sky-950 border-b-2 border-slate-300 pb-1 font-serif">
                {studentName}
              </div>

              <div className="text-xs text-slate-500 font-semibold">
                {classGroup}
              </div>

              <p className="text-xs text-slate-600 text-justify pt-2">
                Concluiu com êxito todas as <strong>7 etapas da operação de {state.operationType.toUpperCase()}</strong> envolvendo a mercadoria <strong>{state.productName}</strong> (NCM {state.ncm}), negociada sob as regras <strong>Incoterms 2020 {state.incoterm}</strong> entre {state.originCityPort} e {state.destinationCityPort}.
              </p>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-left grid grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Protocolo Siscomex ({state.declarationType}):</span>
                  <span className="font-mono font-bold text-slate-900">{state.declarationNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Canal de Desembaraço RFB:</span>
                  <span className="font-bold text-emerald-800 capitalize">
                    Canal {state.drawnChannel || 'Verde'} - Desembaraçado
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Modal de Transporte:</span>
                  <span className="font-bold text-slate-800 capitalize">{state.transportModal}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Valor da Operação:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {state.currency} {(state.quantity * state.unitPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-8 grid grid-cols-2 gap-8 text-xs text-slate-600">
              <div className="border-t border-slate-400 pt-2 text-center">
                <div className="font-serif italic font-bold text-slate-900 text-sm">
                  Coordenação Pedagógica
                </div>
                <div className="text-[10px] text-slate-500">
                  Professor(a) Orientador(a) de Comex
                </div>
              </div>

              <div className="border-t border-slate-400 pt-2 text-center">
                <div className="font-mono font-bold text-slate-900 text-sm">
                  {currentDate}
                </div>
                <div className="text-[10px] text-slate-500">
                  Data de Homologação Aduaneira
                </div>
              </div>
            </div>

            {/* Seal / Verification code */}
            <div className="pt-2 text-[10px] text-slate-400 font-mono">
              Código de Autenticação Digital: BR-COMEX-{Math.random().toString(36).substring(2, 10).toUpperCase()}-2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
