import React, { useState } from 'react';
import { INCOTERMS_DATA } from '../data/incotermsData';
import { IncotermCode } from '../types/comex';
import { Shield, Truck, Ship, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

export const IncotermsVisualizer: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<IncotermCode>('FOB');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'E' | 'F' | 'C' | 'D'>('all');

  const filteredTerms = INCOTERMS_DATA.filter(
    (item) => categoryFilter === 'all' || item.category === categoryFilter
  );

  const activeInfo = INCOTERMS_DATA.find((i) => i.code === selectedTerm) || INCOTERMS_DATA[3];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 tracking-wide uppercase mb-1">
          <span>Guia Oficial CCI</span>
          <span>·</span>
          <span>Regras Internacionais Incoterms 2020</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Matriz Interativa dos 11 Incoterms
        </h1>
        <p className="text-sm text-sky-100/90 mt-1 max-w-3xl">
          Os Termos Internacionais de Comércio (Incoterms) publicados pela Câmara de Comércio Internacional (CCI) dividem com exatidão quem paga o frete, quem assume o seguro e onde o risco de perda ou avaria da carga transfere-se do exportador para o importador.
        </p>
      </div>

      {/* Filter Segmented Control */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-700 mr-2">Filtrar por Grupo:</span>
        <button
          type="button"
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            categoryFilter === 'all'
              ? 'bg-sky-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Todos os 11 Termos
        </button>
        <button
          type="button"
          onClick={() => setCategoryFilter('E')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            categoryFilter === 'E'
              ? 'bg-sky-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Grupo E (Partida - EXW)
        </button>
        <button
          type="button"
          onClick={() => setCategoryFilter('F')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            categoryFilter === 'F'
              ? 'bg-sky-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Grupo F (Transporte Principal Não Pago - FCA, FAS, FOB)
        </button>
        <button
          type="button"
          onClick={() => setCategoryFilter('C')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            categoryFilter === 'C'
              ? 'bg-sky-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Grupo C (Transporte Principal Pago - CPT, CIP, CFR, CIF)
        </button>
        <button
          type="button"
          onClick={() => setCategoryFilter('D')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            categoryFilter === 'D'
              ? 'bg-sky-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Grupo D (Chegada / Destino - DAP, DPU, DDP)
        </button>
      </div>

      {/* Grid of Incoterm Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
        {filteredTerms.map((term) => (
          <button
            key={term.code}
            type="button"
            onClick={() => setSelectedTerm(term.code)}
            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
              selectedTerm === term.code
                ? 'bg-sky-900 border-sky-900 text-white shadow-md ring-2 ring-sky-300'
                : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="font-mono text-base font-extrabold tracking-tight">
              {term.code}
            </div>
            <div className="text-[10px] mt-0.5 opacity-80 truncate">
              Grupo {term.category}
            </div>
          </button>
        ))}
      </div>

      {/* Detailed Card for Selected Term */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-extrabold text-slate-900">
                {activeInfo.code}
              </span>
              <span className="text-sm font-semibold text-slate-700">
                — {activeInfo.name}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Categoria: <strong>Grupo {activeInfo.category}</strong> · Modal: <strong>{activeInfo.modalAllowed === 'qualquer' ? 'Multimodal (Qualquer Meio de Transporte)' : 'Exclusivo Aquaviário (Marítimo / Fluvial)'}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${activeInfo.insuranceRequired ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700'}`}>
              Seguro: {activeInfo.insuranceRequired ? `Obrigatório (${activeInfo.insuranceParty})` : 'Não obrigatório pela regra'}
            </span>
          </div>
        </div>

        {/* Step-by-step responsibilities pipeline */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Transferência de Responsabilidade (Origem ➔ Destino)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Obrigação do Exportador (Vendedor)
              </div>
              <p className="text-emerald-900 leading-relaxed">
                {activeInfo.sellerResponsibility}
              </p>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
              <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-700" />
                Obrigação do Importador (Comprador)
              </div>
              <p className="text-indigo-900 leading-relaxed">
                {activeInfo.buyerResponsibility}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-600 block mb-0.5">Ponto Crítico de Transferência do Risco:</span>
              <span className="font-bold text-slate-900">{activeInfo.riskTransferPoint}</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-600 block mb-0.5">Ponto de Divisão dos Custos:</span>
              <span className="font-bold text-slate-900">{activeInfo.costTransferPoint}</span>
            </div>
          </div>
        </div>

        {/* Advice callout */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Conselho Prático do Professor Comex:</span>
            {activeInfo.advice}
          </div>
        </div>
      </div>
    </div>
  );
};
