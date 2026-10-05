import React, { useState } from 'react';
import { SimulationState, DocumentData } from '../../types/comex';
import { 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileCheck, 
  Printer, 
  AlertCircle,
  PenTool,
  Stamp
} from 'lucide-react';

interface Step4Props {
  state: SimulationState;
  updateState: (updates: Partial<SimulationState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step4Documentation: React.FC<Step4Props> = ({
  state,
  updateState,
  onNext,
  onPrev,
}) => {
  const [activeDocTab, setActiveDocTab] = useState<'invoice' | 'packing' | 'bl' | 'origem'>('invoice');

  const docs = state.documents;

  const updateDocs = (field: keyof DocumentData, val: any) => {
    updateState({
      documents: {
        ...state.documents,
        [field]: val,
      },
    });
  };

  const handleSignDocuments = () => {
    updateState({ documentsSigned: true });
  };

  const totalValueForeign = state.quantity * state.unitPrice;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 tracking-wide uppercase mb-1">
              <span>Etapa 04</span>
              <span>·</span>
              <span>Dossiê Documental do Comércio Exterior</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Emissão de Documentos Aduaneiros Internacionais
            </h1>
            <p className="text-sm text-sky-100/90 mt-1 max-w-2xl">
              "No Comex, a carga viaja no mar, mas a operação vive nos documentos." Uma vírgula errada na Fatura Comercial ou divergência de 1kg no B/L trava o contêiner na alfândega.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-3 border border-white/15 text-xs text-sky-100 flex items-start gap-2 max-w-xs">
            <Stamp className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">Regra de Ouro:</span>
              A Fatura Comercial (Invoice) e o Packing List devem ter valores, pesos e NCM rigorosamente idênticos ao Conhecimento de Embarque (B/L)!
            </div>
          </div>
        </div>
      </div>

      {/* Document Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="flex items-center justify-between p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveDocTab('invoice')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeDocTab === 'invoice'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              1. Commercial Invoice (Fatura Comercial)
            </button>

            <button
              type="button"
              onClick={() => setActiveDocTab('packing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeDocTab === 'packing'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              2. Packing List (Romaneio de Carga)
            </button>

            <button
              type="button"
              onClick={() => setActiveDocTab('bl')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeDocTab === 'bl'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              3. Bill of Lading (B/L) / Conhecimento
            </button>

            <button
              type="button"
              onClick={() => setActiveDocTab('origem')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeDocTab === 'origem'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              4. Certificado de Origem
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {state.documentsSigned ? (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Dossiê Autenticado
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSignDocuments}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Assinar Dossiê</span>
              </button>
            )}
          </div>
        </div>

        {/* Document Body Simulation */}
        <div className="p-6 bg-slate-50/50">
          {/* 1. Commercial Invoice */}
          {activeDocTab === 'invoice' && (
            <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 font-mono">
                    COMMERCIAL INVOICE
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Fatura Comercial Internacional nº <span className="font-mono font-bold text-slate-800">{docs.invoiceNumber}</span>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-semibold text-slate-700">Data de Emissão:</div>
                  <input
                    type="date"
                    value={docs.invoiceDate}
                    onChange={(e) => updateDocs('invoiceDate', e.target.value)}
                    className="font-mono text-xs border border-slate-300 rounded px-2 py-0.5 mt-0.5"
                  />
                </div>
              </div>

              {/* Shipper & Consignee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px] mb-1.5">
                    Shipper / Exporter (Exportador)
                  </span>
                  <input
                    type="text"
                    value={docs.exporterName}
                    onChange={(e) => updateDocs('exporterName', e.target.value)}
                    className="w-full font-semibold text-slate-900 border border-slate-300 rounded px-2 py-1 mb-1"
                  />
                  <div className="text-[11px] text-slate-500">CNPJ / Tax ID: {docs.exporterCnpj}</div>
                  <div className="text-[11px] text-slate-500">{docs.exporterAddress}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px] mb-1.5">
                    Consignee / Importer (Importador)
                  </span>
                  <input
                    type="text"
                    value={docs.importerName}
                    onChange={(e) => updateDocs('importerName', e.target.value)}
                    className="w-full font-semibold text-slate-900 border border-slate-300 rounded px-2 py-1 mb-1"
                  />
                  <div className="text-[11px] text-slate-500">VAT / Tax ID: {docs.importerTaxId}</div>
                  <div className="text-[11px] text-slate-500">{docs.importerAddress}</div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Item</th>
                      <th className="p-2.5">Descrição da Mercadoria</th>
                      <th className="p-2.5">NCM / HS Code</th>
                      <th className="p-2.5 text-right">Qtd</th>
                      <th className="p-2.5 text-right">Preço Unit. ({state.currency})</th>
                      <th className="p-2.5 text-right">Total ({state.currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr>
                      <td className="p-2.5">01</td>
                      <td className="p-2.5 font-sans font-medium text-slate-900">{state.productName}</td>
                      <td className="p-2.5 font-bold text-sky-800">{state.ncm}</td>
                      <td className="p-2.5 text-right">{state.quantity.toLocaleString('pt-BR')} {state.unit}</td>
                      <td className="p-2.5 text-right">${state.unitPrice.toFixed(2)}</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">${totalValueForeign.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 font-semibold text-slate-900 border-t border-slate-200">
                    <tr>
                      <td colSpan={4} className="p-2.5 font-sans text-xs text-slate-600">
                        Termo de Venda: <strong>Incoterm 2020 {state.incoterm} - {state.originCityPort}</strong>
                      </td>
                      <td className="p-2.5 text-right">Total Fatura:</td>
                      <td className="p-2.5 text-right font-mono text-sm text-sky-900">
                        {state.currency} ${totalValueForeign.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment & Sign */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-200 text-xs text-slate-500 gap-4">
                <div>
                  Modalidade de Pagamento: <strong className="text-slate-800 uppercase">{state.paymentMethod.replace('_', ' ')}</strong> (Prazo: {state.paymentTermDays} dias)
                </div>
                <div className="text-center sm:text-right">
                  <div className="font-serif italic text-slate-700 text-sm">
                    {state.documentsSigned ? 'Assinado Digitalmente por Certificado ICP-Brasil' : 'Aguardando Assinatura do Exportador'}
                  </div>
                  <div className="text-[10px] text-slate-400">Responsável pelo Comércio Exterior</div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Packing List */}
          {activeDocTab === 'packing' && (
            <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 font-mono">
                    PACKING LIST (ROMANEIO DE CARGA)
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Ref. Invoice: <span className="font-mono font-bold text-slate-800">{docs.invoiceNumber}</span>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <span className="font-bold text-slate-700">Contêiner nº: </span>
                  <input
                    type="text"
                    value={docs.containerNumber}
                    onChange={(e) => updateDocs('containerNumber', e.target.value)}
                    className="font-mono text-xs border border-slate-300 rounded px-2 py-0.5"
                  />
                  <div className="mt-1">
                    <span className="font-bold text-slate-700">Lacre RFB: </span>
                    <input
                      type="text"
                      value={docs.sealNumber}
                      onChange={(e) => updateDocs('sealNumber', e.target.value)}
                      className="font-mono text-xs border border-slate-300 rounded px-2 py-0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Weights and measurements */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans">Total de Volumes:</span>
                  <input
                    type="number"
                    value={docs.packagesCount}
                    onChange={(e) => updateDocs('packagesCount', Number(e.target.value))}
                    className="w-full font-bold text-slate-800 text-sm mt-0.5 bg-transparent"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans">Peso Bruto (Gross W.):</span>
                  <input
                    type="number"
                    value={docs.grossWeightKg}
                    onChange={(e) => updateDocs('grossWeightKg', Number(e.target.value))}
                    className="w-full font-bold text-slate-800 text-sm mt-0.5 bg-transparent"
                  />
                  <span className="text-[10px] text-slate-400">kg</span>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans">Peso Líquido (Net W.):</span>
                  <input
                    type="number"
                    value={docs.netWeightKg}
                    onChange={(e) => updateDocs('netWeightKg', Number(e.target.value))}
                    className="w-full font-bold text-slate-800 text-sm mt-0.5 bg-transparent"
                  />
                  <span className="text-[10px] text-slate-400">kg</span>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans">Cubagem (CBM):</span>
                  <input
                    type="number"
                    step="0.1"
                    value={docs.measurementM3}
                    onChange={(e) => updateDocs('measurementM3', Number(e.target.value))}
                    className="w-full font-bold text-slate-800 text-sm mt-0.5 bg-transparent"
                  />
                  <span className="text-[10px] text-slate-400">m³</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900">
                <span className="font-bold block mb-1">Aviso da Fiscalização Aduaneira:</span>
                O peso líquido informado aqui no Romaneio será cruzado com a pesagem na balança do recinto alfandegado (Gate do Porto/Aeroporto). Divergências acima de 5% provocam retenção em Canal Vermelho!
              </div>
            </div>
          )}

          {/* 3. Bill of Lading (B/L) */}
          {activeDocTab === 'bl' && (
            <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans">
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 font-mono">
                    BILL OF LADING (OCEAN CARRIER B/L)
                  </h3>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Conhecimento de Transporte Internacional Multimodal
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">B/L Number</span>
                  <input
                    type="text"
                    value={docs.blAwbNumber}
                    onChange={(e) => updateDocs('blAwbNumber', e.target.value)}
                    className="font-mono text-sm font-bold border border-slate-300 rounded px-2 py-0.5 text-sky-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Vessel & Voyage (Navio / Viagem)</span>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={docs.vesselName}
                      onChange={(e) => updateDocs('vesselName', e.target.value)}
                      className="font-bold text-slate-800 border border-slate-300 rounded px-2 py-1 w-2/3"
                    />
                    <input
                      type="text"
                      value={docs.voyageNumber}
                      onChange={(e) => updateDocs('voyageNumber', e.target.value)}
                      className="font-mono text-slate-800 border border-slate-300 rounded px-2 py-1 w-1/3"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Porto de Embarque e Descarga</span>
                  <div className="mt-1 font-semibold text-slate-800">
                    Origem: {state.originCityPort} ➔ Destino: {state.destinationCityPort}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded text-xs text-slate-700">
                <span className="font-bold block mb-1">Freight Clause (Condição de Frete):</span>
                {state.incoterm === 'CIF' || state.incoterm === 'CFR' || state.incoterm === 'CIP' || state.incoterm === 'CPT' || state.incoterm === 'DDP' ? (
                  <span className="text-emerald-700 font-bold font-mono">FREIGHT PREPAID (Pago na Origem pelo Vendedor)</span>
                ) : (
                  <span className="text-sky-700 font-bold font-mono">FREIGHT COLLECT (A Pagar no Destino pelo Comprador)</span>
                )}
              </div>
            </div>
          )}

          {/* 4. Certificado de Origem */}
          {activeDocTab === 'origem' && (
            <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans">
              <div className="text-center border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  CERTIFICADO DE ORIGEM INTERNACIONAL
                </h3>
                <div className="text-xs text-slate-500 mt-1">
                  Documento probatório de nacionalidade da mercadoria para obtenção de preferências tarifárias
                </div>
              </div>

              <div className="p-4 bg-sky-50 rounded-lg border border-sky-200 text-xs space-y-2">
                <div>
                  <span className="font-bold text-sky-950">Tipo de Certificado:</span>{' '}
                  <span className="text-sky-900">{docs.certificateOfOriginType}</span>
                </div>
                <div>
                  <span className="font-bold text-sky-950">Critério de Origem:</span>{' '}
                  <span className="text-sky-900">Totalmente Obtido / Transformação Substancial no Território Nacional</span>
                </div>
                <div>
                  <span className="font-bold text-sky-950">Entidade Emissora Credenciada:</span>{' '}
                  <span className="text-sky-900">Federação das Indústrias / Associação Comercial / SECEX</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Signing bar if not yet signed */}
      {!state.documentsSigned && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Verificou todos os dados? Assine digitalmente o dossiê para habilitar o envio ao <strong>Portal Único Siscomex</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={handleSignDocuments}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer transition-colors shrink-0 shadow-xs"
          >
            Assinar e Autenticar Agora
          </button>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar: Logística</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!state.documentsSigned) handleSignDocuments();
            onNext();
          }}
          className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Avançar para Etapa 5: Portal Siscomex</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
