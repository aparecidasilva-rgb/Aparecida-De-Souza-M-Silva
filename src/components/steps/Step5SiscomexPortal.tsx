import React, { useState } from 'react';
import { SimulationState } from '../../types/comex';
import { 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  FileCheck, 
  ShieldCheck, 
  AlertTriangle,
  Building,
  Hash,
  Clock
} from 'lucide-react';

interface Step5Props {
  state: SimulationState;
  updateState: (updates: Partial<SimulationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step5SiscomexPortal: React.FC<Step5Props> = ({
  state,
  updateState,
  onNext,
  onPrev,
}) => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(state.siscomexSubmitted);

  const isExport = state.operationType === 'exportacao';
  const decType = isExport ? 'DU-E' : 'DUIMP';

  const handleTransmit = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setTransmissionSuccess(true);
      updateState({ siscomexSubmitted: true });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-sky-950 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 tracking-wide uppercase mb-1">
              <span>Etapa 05</span>
              <span>·</span>
              <span>Portal Único Siscomex (Governo Federal)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Simulador do Portal Único do Comércio Exterior
            </h1>
            <p className="text-sm text-sky-100/90 mt-1 max-w-2xl">
              Bem-vindo ao sistema onde todas as empresas brasileiras registram suas operações aduaneiras. Aqui os dados fiscais são cruzados com a Receita Federal, SECEX e órgãos anuentes (Anvisa, MAPA, Inmetro).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-3 border border-white/15 text-xs text-sky-100 flex items-start gap-2 max-w-xs">
            <Building className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">O que é a DU-E / DUIMP?</span>
              A Declaração Única simplificou o Comex brasileiro, integrando mais de 16 documentos antigos em um único registro digital integrado à Nota Fiscal Eletrônica.
            </div>
          </div>
        </div>
      </div>

      {/* Realistic Siscomex Portal UI */}
      <div className="bg-white rounded-xl border-2 border-slate-300 overflow-hidden shadow-xs">
        {/* Siscomex Official Header Bar */}
        <div className="bg-slate-900 text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-sky-600 flex items-center justify-center font-bold text-white text-xs">
              BR
            </div>
            <div>
              <div className="text-[10px] text-slate-300 tracking-wider uppercase font-semibold">
                Portal Único do Comércio Exterior · Siscomex
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Módulo {isExport ? 'Exportação (DU-E)' : 'Importação (DUIMP)'}</span>
                <span className="text-[10px] bg-sky-800 text-sky-200 px-1.5 py-0.5 rounded">
                  Ambiente de Treinamento e Simulação
                </span>
              </div>
            </div>
          </div>

          <div className="text-right text-xs">
            <div className="text-slate-300">
              Operador: <span className="font-semibold text-white">{state.studentName || 'Estudante Comex'}</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Habilitação Radar: <strong className="text-emerald-400">ILIMITADA - ATIVA</strong>
            </div>
          </div>
        </div>

        {/* Declaration Status Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-500 block text-[10px]">Número da Declaração:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {state.declarationNumber}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">RUC (Identificador Único da Carga):</span>
              <span className="font-mono font-medium text-slate-700">
                {state.rucCode}
              </span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] sm:text-right">Situação no Siscomex:</span>
            {transmissionSuccess ? (
              <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Registrada / Aguardando Parametrização
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Em Elaboração (Pendente de Transmissão)
              </span>
            )}
          </div>
        </div>

        {/* Portal Form Fields */}
        <div className="p-6 space-y-6">
          {/* General data section */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Hash className="w-4 h-4 text-sky-700" />
              1. Dados Gerais da Declaração Aduaneira
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Tipo de Operação:</span>
                <span className="font-bold text-slate-900 capitalize">
                  {state.operationType} Direta ({decType})
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Incoterm Negociado:</span>
                <span className="font-bold text-sky-900 font-mono">
                  {state.incoterm} - {state.originCityPort}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Moeda & Valor Negociado:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {state.currency} {(state.quantity * state.unitPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Customs Venue & RFB Unit */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-700" />
              2. Jurisdição Aduaneira & Recinto Alfandegado
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Unidade da Receita Federal de Despacho
                </label>
                <input
                  type="text"
                  value={state.unidadeReceitaFederal}
                  onChange={(e) => updateState({ unidadeReceitaFederal: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Recinto Alfandegado de Armazenagem / Terminal
                </label>
                <input
                  type="text"
                  value={state.recintoAlfandegado}
                  onChange={(e) => updateState({ recintoAlfandegado: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Item details */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              3. Itens e Enquadramento Fiscal
            </h3>

            <div className="border border-slate-200 rounded-lg overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5">NCM</th>
                    <th className="p-2.5">Descrição Comercial</th>
                    <th className="p-2.5 text-right">Qtd Comercial</th>
                    <th className="p-2.5 text-right">Peso Líquido (kg)</th>
                    <th className="p-2.5">Tratamento Adm. / LPCO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-2.5">001</td>
                    <td className="p-2.5 font-bold text-sky-900">{state.ncm}</td>
                    <td className="p-2.5 font-sans font-medium text-slate-800">{state.productName}</td>
                    <td className="p-2.5 text-right">{state.quantity} {state.unit}</td>
                    <td className="p-2.5 text-right">{state.documents.netWeightKg.toLocaleString('pt-BR')} kg</td>
                    <td className="p-2.5 font-sans">
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                        Dispensado / Anuência Automática
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Transmission Action */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Certificação Digital ICP-Brasil: <strong className="text-slate-700">e-CNPJ Validado e Conectado</strong>
            </div>

            <button
              type="button"
              disabled={isTransmitting || transmissionSuccess}
              onClick={handleTransmit}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                transmissionSuccess
                  ? 'bg-emerald-600 text-white opacity-90 cursor-default'
                  : isTransmitting
                  ? 'bg-slate-400 text-white cursor-wait'
                  : 'bg-sky-900 hover:bg-sky-800 text-white'
              }`}
            >
              {isTransmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Validando e Transmitindo ao Siscomex...</span>
                </>
              ) : transmissionSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Declaração Transmitida com Sucesso!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmitir e Registrar Declaração no Siscomex</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar: Dossiê Documental</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!transmissionSuccess) updateState({ siscomexSubmitted: true });
            onNext();
          }}
          className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Avançar para Etapa 6: Desembaraço & Parametrização</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
