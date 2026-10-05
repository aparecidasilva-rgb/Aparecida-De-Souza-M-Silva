import React from 'react';
import { SimulationState, CurrencyCode, PaymentMethod } from '../../types/comex';
import { 
  Coins, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface Step2Props {
  state: SimulationState;
  updateState: (updates: Partial<SimulationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PAYMENT_METHODS_DATA: {
  id: PaymentMethod;
  name: string;
  shortDesc: string;
  exporterRisk: 'Muito Baixo' | 'Baixo' | 'Médio' | 'Alto' | 'Muito Alto';
  importerRisk: 'Muito Baixo' | 'Baixo' | 'Médio' | 'Alto' | 'Muito Alto';
  details: string;
  bestFor: string;
}[] = [
  {
    id: 'carta_credito',
    name: 'Carta de Crédito Irrevogável (L/C - Letter of Credit)',
    shortDesc: 'Compromisso bancário mundial condicionante à apresentação estrita dos documentos.',
    exporterRisk: 'Muito Baixo',
    importerRisk: 'Baixo',
    details: 'O banco do importador emite garantia formal de pagamento ao exportador contra entrega do B/L, Fatura e Romaneio sem discrepâncias (Regras UCP 600 da CCI).',
    bestFor: 'Parceiros comerciais novos, grandes volumes financeiros ou países com instabilidade.'
  },
  {
    id: 'cobranca_documentaria',
    name: 'Cobrança Documentária (D/P ou D/A)',
    shortDesc: 'Intermediação bancária com liberação dos documentos contra pagamento ou aceite.',
    exporterRisk: 'Médio',
    importerRisk: 'Médio',
    details: 'O exportador envia os documentos de embarque através do seu banco para o banco no país de destino. O importador só retira os documentos originais para liberar a carga na alfândega após pagar (D/P) ou dar o aceite na letra de câmbio (D/A).',
    bestFor: 'Empresas com relacionamento comercial estabelecido e confiança mútua.'
  },
  {
    id: 'antecipado',
    name: 'Pagamento Antecipado (Cash in Advance)',
    shortDesc: 'Transferência bancária (Swift/PIX Internacional) realizada antes do embarque da carga.',
    exporterRisk: 'Muito Baixo',
    importerRisk: 'Muito Alto',
    details: 'O exportador recebe 100% do valor antes mesmo de despachar a mercadoria na fábrica. O importador assume o risco total de entrega.',
    bestFor: 'Produtos feitos sob medida (customizados), pequenas amostras ou início de relação.'
  },
  {
    id: 'remessa_sem_saque',
    name: 'Remessa Sem Saque / Conta Aberta (Open Account)',
    shortDesc: 'O exportador embarca a carga e cobra o cliente com prazo de 30 a 90 dias após o recebimento.',
    exporterRisk: 'Muito Alto',
    importerRisk: 'Muito Baixo',
    details: 'A mercadoria é enviada diretamente ao importador junto com os documentos. O pagamento é realizado posteriormente por transferência internacional.',
    bestFor: 'Filiais do mesmo grupo corporativo, multinacionais consolidadas ou clientes de altíssima fidelidade.'
  }
];

export const Step2CurrencyPayment: React.FC<Step2Props> = ({
  state,
  updateState,
  onNext,
  onPrev,
}) => {
  const totalValueForeign = state.quantity * state.unitPrice;
  const totalValueBrl = totalValueForeign * state.exchangeRateBrl;

  const currentPayment = PAYMENT_METHODS_DATA.find((p) => p.id === state.paymentMethod);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 tracking-wide uppercase mb-1">
              <span>Etapa 02</span>
              <span>·</span>
              <span>Câmbio & Pagamentos Internacionais</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Fechamento de Câmbio & Segurança Financeira
            </h1>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-2xl">
              No comércio exterior, as moedas oscilam diariamente. Aprenda como a cotação PTAX afeta sua margem e como escolher a modalidade de pagamento que equilibra os riscos entre exportador e importador.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-3 border border-white/15 text-xs text-emerald-100 flex items-start gap-2 max-w-xs">
            <Coins className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">O que é a Taxa PTAX?</span>
              É a média ponderada das cotações apurada pelo Banco Central do Brasil em 4 janelas diárias, usada como base oficial para contratos e impostos alfandegários!
            </div>
          </div>
        </div>
      </div>

      {/* Currency & Exchange Rate Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <label className="block text-xs font-bold text-slate-800 mb-2">
            1. Moeda da Transação
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['USD', 'EUR', 'BRL'] as CurrencyCode[]).map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => updateState({ currency: cur })}
                className={`py-2 text-xs font-mono font-bold rounded-lg border cursor-pointer transition-all ${
                  state.currency === cur
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cur === 'USD' ? 'USD ($)' : cur === 'EUR' ? 'EUR (€)' : 'BRL (R$)'}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cotação PTAX Comercial (1 {state.currency} em R$)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">R$</span>
              <input
                type="number"
                step="0.01"
                min="1.0"
                max="15.0"
                value={state.exchangeRateBrl}
                onChange={(e) => updateState({ exchangeRateBrl: Number(e.target.value) })}
                className="w-full text-sm font-mono font-bold px-3 py-1.5 border border-slate-300 rounded-lg"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Dica: experimente alterar a cotação para simular volatilidade cambial.
            </span>
          </div>
        </div>

        {/* Foreign Value Display */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
            <span>2. Valor Total do Contrato</span>
            <span className="text-[10px] text-slate-500">Moeda Estrangeira</span>
          </div>

          <div className="mt-2">
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {state.currency} {totalValueForeign.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {state.quantity.toLocaleString('pt-BR')} {state.unit} × {state.currency} {state.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-600 mb-0.5">
              Condição Comercial:
            </div>
            <div className="text-xs font-bold text-slate-800">
              Incoterm {state.incoterm} ({state.originCityPort} ➔ {state.destinationCityPort})
            </div>
          </div>
        </div>

        {/* Converted BRL Value Display */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs">
          <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center justify-between">
            <span>3. Equivalente Nacional (BRL)</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
              Banco Central
            </span>
          </div>

          <div className="mt-2">
            <div className="text-2xl font-extrabold text-white font-mono">
              R$ {totalValueBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {state.operationType === 'exportacao'
                ? 'Receita estimada em reais na liquidação do câmbio'
                : 'Valor FOB/Mercadoria para base de cálculo de impostos'}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span>Prazo acordado:</span>
            <select
              value={state.paymentTermDays}
              onChange={(e) => updateState({ paymentTermDays: Number(e.target.value) })}
              className="bg-slate-800 text-white px-2 py-1 rounded text-xs border border-slate-700 font-semibold"
            >
              <option value={0}>À Vista (Sight)</option>
              <option value={30}>30 Dias</option>
              <option value={60}>60 Dias</option>
              <option value={90}>90 Dias</option>
              <option value={180}>180 Dias</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Methods Comparative Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Modalidades de Pagamento Internacional (Selecione a Estratégia)
            </h2>
            <p className="text-xs text-slate-500">
              A escolha define quem fica mais protegido contra inadimplência ou atraso na entrega.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Baixo Risco
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Médio Risco
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Alto Risco
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PAYMENT_METHODS_DATA.map((method) => {
            const isSelected = state.paymentMethod === method.id;

            return (
              <div
                key={method.id}
                onClick={() => updateState({ paymentMethod: method.id })}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {method.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {method.shortDesc}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0">
                      ✓
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed my-2">
                  {method.details}
                </p>

                {/* Risk Balance Pills */}
                <div className="pt-2 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white/80 p-2 rounded border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Risco do Exportador:</span>
                    <span
                      className={`font-bold ${
                        method.exporterRisk === 'Muito Baixo' || method.exporterRisk === 'Baixo'
                          ? 'text-emerald-700'
                          : method.exporterRisk === 'Médio'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {method.exporterRisk}
                    </span>
                  </div>

                  <div className="bg-white/80 p-2 rounded border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Risco do Importador:</span>
                    <span
                      className={`font-bold ${
                        method.importerRisk === 'Muito Baixo' || method.importerRisk === 'Baixo'
                          ? 'text-emerald-700'
                          : method.importerRisk === 'Médio'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {method.importerRisk}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-500 italic">
                  <strong>Recomendado para:</strong> {method.bestFor}
                </div>
              </div>
            );
          })}
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
          <span>Voltar: Negociação</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Avançar para Etapa 3: Logística Internacional</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
