import React from 'react';
import { SimulationState, TransportModal } from '../../types/comex';
import { 
  Ship, 
  Plane, 
  Truck, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Box, 
  ShieldAlert, 
  Anchor,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface Step3Props {
  state: SimulationState;
  updateState: (updates: Partial<SimulationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3LogisticsFreight: React.FC<Step3Props> = ({
  state,
  updateState,
  onNext,
  onPrev,
}) => {
  const handleModalChange = (modal: TransportModal) => {
    if (modal === 'maritimo') {
      updateState({
        transportModal: 'maritimo',
        freightCost: 2400,
        transitTimeDays: 22,
        insuranceCost: 450,
      });
    } else if (modal === 'aereo') {
      updateState({
        transportModal: 'aereo',
        freightCost: 6800,
        transitTimeDays: 3,
        insuranceCost: 320,
      });
    } else {
      updateState({
        transportModal: 'rodoviario',
        freightCost: 1900,
        transitTimeDays: 5,
        insuranceCost: 250,
      });
    }
  };

  const totalValueForeign = state.quantity * state.unitPrice;
  // Sugestão de seguro padrão: 0.35% de 110% do valor FOB + Frete
  const calculatedSuggestedInsurance = Math.round((totalValueForeign * 1.1 + state.freightCost) * 0.0035);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 tracking-wide uppercase mb-1">
              <span>Etapa 03</span>
              <span>·</span>
              <span>Logística Internacional & Fretes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Engenharia de Transporte & Seguro de Carga
            </h1>
            <p className="text-sm text-sky-100/90 mt-1 max-w-2xl">
              Mais de 90% das cargas brasileiras viajam pelos mares. Escolha o modal de transporte, dimensione os contêineres e proteja a expedição com seguro internacional contra avarias e acidentes.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-3 border border-white/15 text-xs text-sky-100 flex items-start gap-2 max-w-xs">
            <Anchor className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">O que é Demurrage?</span>
              Se o contêiner não for devolvido vazio no prazo acordado (free time), o armador cobra multas diárias que podem ultrapassar o valor da mercadoria!
            </div>
          </div>
        </div>
      </div>

      {/* Visual Port Banner with Generated Asset */}
      <div className="relative rounded-xl overflow-hidden h-44 sm:h-52 bg-slate-800 border border-slate-200 shadow-xs">
        <img
          src="/src/assets/images/hero_comex_logistics_1791219123900.jpg"
          alt="Terminal de Contêineres no Porto Internacional"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Graceful fallback container
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
            <span>Rota Programada:</span>
            <span className="text-white font-bold">{state.originCityPort}</span>
            <span>➔</span>
            <span className="text-white font-bold">{state.destinationCityPort}</span>
          </div>
          <div className="text-xs text-slate-200 mt-1">
            Tempo estimado de navegação / trânsito ({state.transitTimeDays} dias) · Operação alfandegada sob supervisão da Receita Federal
          </div>
        </div>
      </div>

      {/* Modal Selection */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>1. Modal de Transporte Internacional</span>
          <span className="text-xs text-slate-500 font-normal">
            Selecione para calcular frete e tempo de trânsito
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Marítimo */}
          <button
            type="button"
            onClick={() => handleModalChange('maritimo')}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
              state.transportModal === 'maritimo'
                ? 'border-sky-600 bg-sky-50/60 ring-1 ring-sky-500 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                  <Ship className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Marítimo (Longo Curso)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Contêiner FCL ou Carga Solta LCL
                  </span>
                </div>
              </div>
              {state.transportModal === 'maritimo' && (
                <span className="w-4 h-4 rounded-full bg-sky-700 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Maior capacidade de volume e menor custo por tonelada. Ideal para commodities, maquinários e cargas industriais.
            </p>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> ~21 a 35 dias
              </span>
              <span className="font-bold text-sky-900 font-mono">Frete: USD $2,400</span>
            </div>
          </button>

          {/* Aéreo */}
          <button
            type="button"
            onClick={() => handleModalChange('aereo')}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
              state.transportModal === 'aereo'
                ? 'border-sky-600 bg-sky-50/60 ring-1 ring-sky-500 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Aéreo Internacional
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Carga expressa via AWB
                  </span>
                </div>
              </div>
              {state.transportModal === 'aereo' && (
                <span className="w-4 h-4 rounded-full bg-sky-700 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Altíssima velocidade e máxima segurança contra extravios. Ideal para eletrônicos, medicamentos e amostras perecíveis.
            </p>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> ~2 a 5 dias
              </span>
              <span className="font-bold text-indigo-900 font-mono">Frete: USD $6,800</span>
            </div>
          </button>

          {/* Rodoviário */}
          <button
            type="button"
            onClick={() => handleModalChange('rodoviario')}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
              state.transportModal === 'rodoviario'
                ? 'border-sky-600 bg-sky-50/60 ring-1 ring-sky-500 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Rodoviário Internacional
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Acordo Mercosul (CRT / MIC-DTA)
                  </span>
                </div>
              </div>
              {state.transportModal === 'rodoviario' && (
                <span className="w-4 h-4 rounded-full bg-sky-700 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Transporte porta a porta pelas fronteiras terrestres (Uruguaiana, Foz do Iguaçu, Chuí). Ideal para Argentina, Chile e Uruguai.
            </p>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> ~4 a 8 dias
              </span>
              <span className="font-bold text-emerald-900 font-mono">Frete: USD $1,900</span>
            </div>
          </button>
        </div>
      </div>

      {/* Equipment and Freight Detail Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Container / Unitization */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Box className="w-4 h-4 text-sky-700" />
            Unitização da Carga & Embalagem
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tipo de Equipamento de Transporte
            </label>
            <select
              value={state.containerType}
              onChange={(e) => updateState({ containerType: e.target.value as any })}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="20ft">Contêiner Dry Standard 20 pés (33 m³ / até 28 ton)</option>
              <option value="40ft">Contêiner Dry Standard 40 pés High Cube (76 m³)</option>
              <option value="carga_solta">Carga Fracionada LCL / Paletizada</option>
              <option value="palete">Unitização em Paletes PBR com filme stretch</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Frete Internacional (USD)
              </label>
              <input
                type="number"
                value={state.freightCost}
                onChange={(e) => updateState({ freightCost: Math.max(0, Number(e.target.value)) })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Seguro Internacional (USD)
              </label>
              <input
                type="number"
                value={state.insuranceCost}
                onChange={(e) => updateState({ insuranceCost: Math.max(0, Number(e.target.value)) })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600">
            Sugestão de prêmio de seguro baseado no valor da carga:{' '}
            <strong className="text-slate-800 font-mono">USD ${calculatedSuggestedInsurance}</strong>
            <button
              type="button"
              onClick={() => updateState({ insuranceCost: calculatedSuggestedInsurance })}
              className="ml-2 text-sky-700 underline font-semibold cursor-pointer hover:text-sky-900"
            >
              Aplicar Sugestão
            </button>
          </div>
        </div>

        {/* Local Logistics & Terminal fees */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Anchor className="w-4 h-4 text-sky-700" />
            Custos Logísticos Locais no Brasil (Origem ou Destino)
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Frete Rodoviário Interno (R$)
              </label>
              <input
                type="number"
                value={state.internalFreightOriginBrl}
                onChange={(e) => updateState({ internalFreightOriginBrl: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Fábrica / Armazém até o Porto
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                THC & Taxas de Terminal (R$)
              </label>
              <input
                type="number"
                value={state.portTerminalFeesBrl}
                onChange={(e) => updateState({ portTerminalFeesBrl: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Movimentação portuária de cais
              </span>
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 text-xs text-sky-950">
            <div className="font-semibold mb-0.5">Resumo Logístico:</div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-sky-900">
              <li>Modal selecionado: <strong className="capitalize">{state.transportModal}</strong></li>
              <li>Tempo de Trânsito estimado: <strong>{state.transitTimeDays} dias</strong></li>
              <li>
                Frete marítimo + Seguro em BRL:{' '}
                <strong className="font-mono">
                  R$ {((state.freightCost + state.insuranceCost) * state.exchangeRateBrl).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
              </li>
            </ul>
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
          <span>Voltar: Câmbio</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Avançar para Etapa 4: Emissão Documental</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
