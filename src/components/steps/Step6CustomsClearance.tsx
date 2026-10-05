import React, { useState } from 'react';
import { SimulationState, CustomsChannel } from '../../types/comex';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Eye, 
  HelpCircle,
  FileSearch,
  Sparkles,
  Award
} from 'lucide-react';

interface Step6Props {
  state: SimulationState;
  updateState: (updates: Partial<SimulationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CHANNELS_INFO: Record<CustomsChannel, {
  name: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  cardBg: string;
  description: string;
  actionRequired: string;
  timeEstimate: string;
}> = {
  verde: {
    name: 'Canal Verde (Desembaraço Automático)',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    border: 'border-emerald-500',
    cardBg: 'bg-emerald-50/50',
    description: 'A declaração foi liberada automaticamente pelo sistema eletrônico da Receita Federal sem necessidade de exame documental nem verificação física da mercadoria.',
    actionRequired: 'Emissão imediata do Comprovante de Desembaraço (CI ou CE). A carga já pode ser carregada para entrega ao cliente!',
    timeEstimate: 'Instantâneo (~1 a 4 horas)'
  },
  amarelo: {
    name: 'Canal Amarelo (Exame Documental)',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-slate-950',
    border: 'border-amber-400',
    cardBg: 'bg-amber-50/50',
    description: 'O Auditor-Fiscal da Receita Federal fará a conferência detalhada dos documentos: Commercial Invoice, Packing List, Conhecimento de Transporte e classificação NCM.',
    actionRequired: 'Análise de conformidade documental: confirmar que não há discrepâncias entre a fatura e o B/L.',
    timeEstimate: '2 a 5 dias úteis'
  },
  vermelho: {
    name: 'Canal Vermelho (Conferência Física + Documental)',
    badgeBg: 'bg-rose-600',
    badgeText: 'text-white',
    border: 'border-rose-400',
    cardBg: 'bg-rose-50/50',
    description: 'Além da análise de todos os documentos, o contêiner será aberto no recinto alfandegado para inspeção física das caixas, contagem e conferência de etiquetas.',
    actionRequired: 'Agendamento de posicionamento no porto, abertura de lacre na presença do despachante e fiscal da Receita Federal.',
    timeEstimate: '4 a 10 dias úteis'
  },
  cinza: {
    name: 'Canal Cinza (Procedimento Especial de Fraude / Valoração)',
    badgeBg: 'bg-slate-700',
    badgeText: 'text-white',
    border: 'border-slate-500',
    cardBg: 'bg-slate-100',
    description: 'Abertura de procedimento especial de fiscalização com suspeita fundamentada de subfaturamento, fraude aduaneira ou falsificação de origem.',
    actionRequired: 'Apresentação de extratos bancários de fechamento de câmbio, contratos originais e custos de produção para comprovar o valor real da transação.',
    timeEstimate: '30 a 90 dias úteis'
  }
};

export const Step6CustomsClearance: React.FC<Step6Props> = ({
  state,
  updateState,
  onNext,
  onPrev,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [checklist, setChecklist] = useState({
    invoiceNcmMatch: false,
    blWeightsMatch: false,
    sealIntact: false,
    taxesPaid: false,
  });

  const handleDrawChannel = (forcedChannel?: CustomsChannel) => {
    setIsSpinning(true);
    setTimeout(() => {
      let chosen: CustomsChannel;
      if (forcedChannel) {
        chosen = forcedChannel;
      } else {
        // Probabilidade realista: 75% Verde, 15% Amarelo, 8% Vermelho, 2% Cinza
        const rand = Math.random();
        if (rand < 0.75) chosen = 'verde';
        else if (rand < 0.90) chosen = 'amarelo';
        else if (rand < 0.98) chosen = 'vermelho';
        else chosen = 'cinza';
      }

      setIsSpinning(false);
      updateState({
        drawnChannel: chosen,
        channelRevealed: true,
        inspectionPassed: chosen === 'verde',
        clearanceCompleted: chosen === 'verde',
      });
    }, 1000);
  };

  const channel = state.drawnChannel;
  const channelInfo = channel ? CHANNELS_INFO[channel] : null;

  const handleResolveInspection = () => {
    updateState({
      inspectionPassed: true,
      clearanceCompleted: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 tracking-wide uppercase mb-1">
              <span>Etapa 06</span>
              <span>·</span>
              <span>Despacho Aduaneiro & Fiscalização RFB</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Parametrização da Receita Federal & Desembaraço
            </h1>
            <p className="text-sm text-rose-100/90 mt-1 max-w-2xl">
              O momento mais aguardado de toda operação de Comex. O sistema de inteligência de risco da Receita Federal avalia o histórico da empresa, tipo de mercadoria e país de origem para sortear o canal de conferência.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-3 border border-white/15 text-xs text-rose-100 flex items-start gap-2 max-w-xs">
            <ShieldCheck className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">O que é Desembaraço?</span>
              É o ato formal pelo qual a autoridade aduaneira declara concluída a conferência aduaneira e autoriza a entrega da mercadoria ao comprador ou seu embarque para o exterior!
            </div>
          </div>
        </div>
      </div>

      {/* Visual Terminal Image */}
      <div className="relative rounded-xl overflow-hidden h-40 sm:h-48 bg-slate-800 border border-slate-200 shadow-xs">
        <img
          src="/src/assets/images/customs_inspection_terminal_1791219134960.jpg"
          alt="Terminal Alfandegado da Receita Federal"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
          <div className="text-xs font-semibold text-rose-300">
            Recinto Alfandegado: <span className="text-white font-bold">{state.recintoAlfandegado}</span>
          </div>
          <div className="text-xs text-slate-200 mt-1">
            Unidade Fiscal: {state.unidadeReceitaFederal} · Controle de Risco Aduaneiro (Receita Federal do Brasil)
          </div>
        </div>
      </div>

      {/* Parametrization Drawer Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            Sorteio dos Canais de Parametrização da Receita Federal
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Clique no botão abaixo para simular a parametrização oficial do Siscomex. Você também pode forçar um canal específico para fins pedagógicos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              disabled={isSpinning}
              onClick={() => handleDrawChannel()}
              className="px-6 py-3 bg-sky-900 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2"
            >
              {isSpinning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processando Algoritmo de Risco da RFB...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-sky-300" />
                  <span>Realizar Sorteio Aleatório da Receita</span>
                </>
              )}
            </button>
          </div>

          {/* Educational Force Buttons */}
          <div className="pt-2 text-xs text-slate-500">
            <span className="block mb-1.5 text-[11px] font-semibold text-slate-600">
              Ou teste um canal específico em aula:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => handleDrawChannel('verde')}
                className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-md font-bold text-xs cursor-pointer border border-emerald-300"
              >
                Testar Canal Verde
              </button>
              <button
                type="button"
                onClick={() => handleDrawChannel('amarelo')}
                className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md font-bold text-xs cursor-pointer border border-amber-300"
              >
                Testar Canal Amarelo
              </button>
              <button
                type="button"
                onClick={() => handleDrawChannel('vermelho')}
                className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-md font-bold text-xs cursor-pointer border border-rose-300"
              >
                Testar Canal Vermelho
              </button>
              <button
                type="button"
                onClick={() => handleDrawChannel('cinza')}
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-md font-bold text-xs cursor-pointer border border-slate-400"
              >
                Testar Canal Cinza
              </button>
            </div>
          </div>
        </div>

        {/* Channel Result Card */}
        {channelInfo && state.channelRevealed && (
          <div className={`p-5 rounded-xl border-2 ${channelInfo.border} ${channelInfo.cardBg} transition-all space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${channelInfo.badgeBg} ${channelInfo.badgeText}`}>
                  {channelInfo.name}
                </span>
                <span className="text-xs text-slate-600">
                  Tempo previsto: <strong>{channelInfo.timeEstimate}</strong>
                </span>
              </div>

              {state.clearanceCompleted ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Carga Oficialmente Desembaraçada!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100 px-3 py-1 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Pendência de Fiscalização
                </span>
              )}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {channelInfo.description}
            </p>

            {/* Interactive Inspection Activity for Students if not Verde */}
            {channel !== 'verde' && !state.clearanceCompleted && (
              <div className="bg-white p-4 rounded-lg border border-slate-300 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileSearch className="w-4 h-4 text-sky-700" />
                  Atividade Prática: Resolução de Exigência do Auditor-Fiscal
                </h4>

                <p className="text-xs text-slate-600">
                  Para liberar a carga do {channelInfo.name}, valide os itens fiscais obrigatórios:
                </p>

                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checklist.invoiceNcmMatch}
                      onChange={(e) => setChecklist({ ...checklist, invoiceNcmMatch: e.target.checked })}
                      className="rounded text-sky-700"
                    />
                    <span>Conferência de NCM ({state.ncm}) e descrição da fatura conferem com a amostra</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checklist.blWeightsMatch}
                      onChange={(e) => setChecklist({ ...checklist, blWeightsMatch: e.target.checked })}
                      className="rounded text-sky-700"
                    />
                    <span>Pesagem no gate do porto: Peso bruto ({state.documents.grossWeightKg} kg) sem divergência</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checklist.sealIntact}
                      onChange={(e) => setChecklist({ ...checklist, sealIntact: e.target.checked })}
                      className="rounded text-sky-700"
                    />
                    <span>Lacre da Receita Federal ({state.documents.sealNumber}) intacto sem indícios de violação</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checklist.taxesPaid}
                      onChange={(e) => setChecklist({ ...checklist, taxesPaid: e.target.checked })}
                      className="rounded text-sky-700"
                    />
                    <span>Comprovante de pagamento de impostos / desoneração tributária autenticado</span>
                  </label>
                </div>

                <button
                  type="button"
                  disabled={!checklist.invoiceNcmMatch || !checklist.blWeightsMatch || !checklist.sealIntact || !checklist.taxesPaid}
                  onClick={handleResolveInspection}
                  className={`mt-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    checklist.invoiceNcmMatch && checklist.blWeightsMatch && checklist.sealIntact && checklist.taxesPaid
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Concluir Conferência & Desembaraçar Carga</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar: Siscomex</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!state.clearanceCompleted) {
              updateState({ clearanceCompleted: true, inspectionPassed: true });
            }
            onNext();
          }}
          className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Avançar para Etapa 7: Fechamento & Desempenho</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
