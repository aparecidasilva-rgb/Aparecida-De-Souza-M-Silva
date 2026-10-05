import React, { useState } from 'react';
import { SimulationState, IncotermCode, OperationType } from '../../types/comex';
import { COMEX_SCENARIOS } from '../../data/scenarios';
import { INCOTERMS_DATA } from '../../data/incotermsData';
import { 
  Building2, 
  Globe2, 
  HelpCircle, 
  Check, 
  ArrowRight, 
  Info, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface Step1Props {
  state: SimulationState;
  updateState: (updates: Partial<SimulationState>) => void;
  onNext: () => void;
}

const COMMON_NCMS = [
  { code: '0901.11.10', name: 'Café não torrado, não descafeinado, em grãos (Especiais)' },
  { code: '8541.43.00', name: 'Células fotovoltaicas em módulos ou painéis solares' },
  { code: '6403.59.90', name: 'Calçados masculinos/femininos com sola e parte superior de couro' },
  { code: '1201.90.00', name: 'Soja em grãos, mesmo triturada, exceto para semeadura' },
  { code: '8471.30.12', name: 'Máquinas automáticas para processamento de dados (Notebooks)' },
  { code: '8708.29.99', name: 'Outras partes e acessórios de carroçarias para veículos automóveis' },
];

export const Step1NegotiationNcm: React.FC<Step1Props> = ({
  state,
  updateState,
  onNext,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState(state.scenarioId);
  const [showIncotermModal, setShowIncotermModal] = useState(false);

  const currentIncotermInfo = INCOTERMS_DATA.find((i) => i.code === state.incoterm);

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    const scenario = COMEX_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    updateState({
      scenarioId: scenario.id,
      operationType: scenario.type,
      productName: scenario.productName,
      productDescription: scenario.productDescription,
      ncm: scenario.ncm,
      quantity: scenario.defaultQuantity,
      unit: scenario.unit,
      unitPrice: scenario.unitCostOrigin,
      currency: scenario.unitCostCurrency,
      originCountry: scenario.originCountry,
      originCityPort: scenario.originPort,
      destinationCountry: scenario.destinationCountry,
      destinationCityPort: scenario.destinationPort,
      incoterm: scenario.recommendedIncoterm,
      transportModal: scenario.recommendedModal,
      paymentMethod: scenario.suggestedPayment,
      declarationType: scenario.type === 'exportacao' ? 'DU-E' : 'DUIMP',
    });
  };

  const handleTypeChange = (type: OperationType) => {
    updateState({
      operationType: type,
      declarationType: type === 'exportacao' ? 'DU-E' : 'DUIMP',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Classroom Context */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-200 tracking-wide uppercase mb-1">
              <span>Etapa 01</span>
              <span>·</span>
              <span>Negociação Internacional & Classificação Fiscal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Definindo a Operação de Comércio Exterior
            </h1>
            <p className="text-sm text-sky-100/90 mt-1 max-w-2xl">
              Escolha um cenário real de aula ou personalize seu produto. Toda transação internacional começa com a negociação do produto, NCM (código fiscal) e o Incoterm 2020.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-3 border border-white/15 text-xs text-sky-100 flex items-start gap-2.5 max-w-xs">
            <Sparkles className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">Dica Pedagógica:</span>
              A NCM errada no Brasil pode acarretar retenção na alfândega e multa de 1% do valor aduaneiro!
            </div>
          </div>
        </div>
      </div>

      {/* Case Presets for Class */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-700" />
            Casos Práticos da Aula (Selecione para Carregar Dados)
          </label>
          <span className="text-xs text-slate-500">
            3 missões didáticas disponíveis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {COMEX_SCENARIOS.map((sc) => {
            const isSelected = selectedScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleScenarioChange(sc.id)}
                className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50/70 ring-1 ring-sky-500'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      sc.type === 'exportacao'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {sc.type === 'exportacao' ? 'Exportação Brasileira' : 'Importação para o Brasil'}
                  </span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-sky-700 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  )}
                </div>

                <div className="text-sm font-semibold text-slate-900 mt-1">
                  {sc.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {sc.tagline}
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                  <span>NCM: {sc.ncm}</span>
                  <span className="font-semibold text-sky-900">Incoterm {sc.recommendedIncoterm}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Operation Configuration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form details */}
        <div className="lg:col-span-2 space-y-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-sky-700" />
            Parâmetros da Operação Internacional
          </h2>

          {/* Operation Type Switch */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Modalidade de Comércio Exterior
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange('exportacao')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  state.operationType === 'exportacao'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="font-semibold text-xs text-emerald-900">
                  Exportação (Brasil ➔ Mundo)
                </div>
                <div className="text-[11px] text-emerald-700/80 mt-0.5">
                  Saída de mercadorias nacionais com registro de DU-E e desoneração fiscal.
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('importacao')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  state.operationType === 'importacao'
                    ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="font-semibold text-xs text-indigo-900">
                  Importação (Mundo ➔ Brasil)
                </div>
                <div className="text-[11px] text-indigo-700/80 mt-0.5">
                  Entrada de mercadorias estrangeiras com tributos (II, IPI, PIS, COFINS, ICMS).
                </div>
              </button>
            </div>
          </div>

          {/* Product description & NCM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome Comercial da Mercadoria
              </label>
              <input
                type="text"
                value={state.productName}
                onChange={(e) => updateState({ productName: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Classificação Fiscal NCM (8 Dígitos)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={state.ncm}
                  onChange={(e) => updateState({ ncm: e.target.value })}
                  placeholder="0000.00.00"
                  className="w-full text-xs font-mono font-medium px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Quick NCM selector pills */}
          <div>
            <span className="text-[11px] text-slate-500 block mb-1.5">
              Sugestões rápidas de NCM para estudantes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_NCMS.map((n) => (
                <button
                  key={n.code}
                  type="button"
                  onClick={() => updateState({ ncm: n.code, productDescription: n.name })}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                    state.ncm === n.code
                      ? 'bg-sky-100 border-sky-300 text-sky-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono font-bold">{n.code}</span> - {n.name.substring(0, 28)}...
                </button>
              ))}
            </div>
          </div>

          {/* Quantity, Unit & Unit Value */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quantidade
              </label>
              <input
                type="number"
                min="1"
                value={state.quantity}
                onChange={(e) => updateState({ quantity: Math.max(1, Number(e.target.value)) })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Unidade de Medida
              </label>
              <input
                type="text"
                value={state.unit}
                onChange={(e) => updateState({ unit: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preço Unitário ({state.currency})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-semibold text-slate-500">
                  $
                </span>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={state.unitPrice}
                  onChange={(e) => updateState({ unitPrice: Math.max(0.1, Number(e.target.value)) })}
                  className="w-full text-xs px-3 pl-7 py-2 border border-slate-300 rounded-lg font-mono font-medium"
                />
              </div>
            </div>
          </div>

          {/* Origin & Destination Ports */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                País e Local/Porto de Origem
              </label>
              <input
                type="text"
                value={`${state.originCountry} - ${state.originCityPort}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  updateState({
                    originCountry: parts[0]?.trim() || state.originCountry,
                    originCityPort: parts[1]?.trim() || state.originCityPort,
                  });
                }}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                País e Local/Porto de Destino
              </label>
              <input
                type="text"
                value={`${state.destinationCountry} - ${state.destinationCityPort}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  updateState({
                    destinationCountry: parts[0]?.trim() || state.destinationCountry,
                    destinationCityPort: parts[1]?.trim() || state.destinationCityPort,
                  });
                }}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Incoterm 2020 Decision Hub */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Incoterms 2020 Selecionado
              </span>
              <span className="text-xs bg-sky-800 text-sky-200 px-2 py-0.5 rounded font-mono font-bold">
                Grupo {currentIncotermInfo?.category}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
                {state.incoterm}
              </span>
              <span className="text-xs text-slate-300">
                {currentIncotermInfo?.name}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {currentIncotermInfo?.sellerResponsibility}
            </p>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Modal Permitido:</span>
                <span className="font-semibold text-slate-200 capitalize">
                  {currentIncotermInfo?.modalAllowed === 'qualquer' ? 'Multimodal (Qualquer)' : 'Aquaviário / Marítimo'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seguro Obrigatório:</span>
                <span className={`font-semibold ${currentIncotermInfo?.insuranceRequired ? 'text-amber-300' : 'text-slate-300'}`}>
                  {currentIncotermInfo?.insuranceRequired ? `Sim (${currentIncotermInfo.insuranceParty})` : 'Não obrigatório'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transferência de Risco:</span>
                <span className="font-semibold text-sky-300 text-right max-w-[160px] truncate">
                  {currentIncotermInfo?.riskTransferPoint}
                </span>
              </div>
            </div>

            {/* Quick Incoterm grid buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                Trocar Incoterm para testar impacto:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(['EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DDP'] as IncotermCode[]).map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => updateState({ incoterm: term })}
                    className={`py-1 text-xs font-mono font-bold rounded cursor-pointer transition-colors ${
                      state.incoterm === term
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pedagogy Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-1">Atenção na Negociação Internacional:</span>
              O Incoterm <strong>não define transferência de propriedade</strong> nem forma de pagamento, apenas a divisão exata de fretes, riscos de perda/dano e desembaraço aduaneiro entre comprador e vendedor.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Valor bruto da carga negociada:{' '}
          <span className="font-bold text-slate-800 font-mono">
            {state.currency} {(state.quantity * state.unitPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Avançar para Etapa 2: Câmbio & Finanças</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
