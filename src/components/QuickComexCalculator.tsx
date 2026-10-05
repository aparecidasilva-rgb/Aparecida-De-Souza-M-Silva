import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, HelpCircle, Coins } from 'lucide-react';

export const QuickComexCalculator: React.FC = () => {
  const [fobValueUsd, setFobValueUsd] = useState(10000);
  const [freightUsd, setFreightUsd] = useState(1800);
  const [insuranceUsd, setInsuranceUsd] = useState(120);
  const [ptaxRate, setPtaxRate] = useState(5.65);

  const [iiRate, setIiRate] = useState(12);
  const [ipiRate, setIpiRate] = useState(6.5);
  const [pisRate, setPisRate] = useState(2.1);
  const [cofinsRate, setCofinsRate] = useState(9.65);
  const [icmsRate, setIcmsRate] = useState(18);
  const [isMaritime, setIsMaritime] = useState(true);

  // Conversões
  const cifUsd = fobValueUsd + freightUsd + insuranceUsd;
  const valorAduaneiroBrl = cifUsd * ptaxRate;
  const freightBrl = freightUsd * ptaxRate;

  // Impostos em cascata
  const iiVal = valorAduaneiroBrl * (iiRate / 100);
  const ipiBase = valorAduaneiroBrl + iiVal;
  const ipiVal = ipiBase * (ipiRate / 100);
  const pisVal = valorAduaneiroBrl * (pisRate / 100);
  const cofinsVal = valorAduaneiroBrl * (cofinsRate / 100);

  const afrmmVal = isMaritime ? freightBrl * 0.08 : 0;
  const taxaSiscomex = 214.50;

  // ICMS Cálculo por dentro
  const icmsDec = icmsRate / 100;
  const icmsBase = (valorAduaneiroBrl + iiVal + ipiVal + pisVal + cofinsVal + afrmmVal + taxaSiscomex) / (1 - icmsDec);
  const icmsVal = icmsBase * icmsDec;

  const totalImpostos = iiVal + ipiVal + pisVal + cofinsVal + icmsVal + afrmmVal + taxaSiscomex;
  const totalNacionalizado = valorAduaneiroBrl + totalImpostos;
  const multiplicador = totalNacionalizado / (fobValueUsd * ptaxRate);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 tracking-wide uppercase mb-1">
          <span>Ferramenta Prática</span>
          <span>·</span>
          <span>Cálculo em Cascata da Tributação Aduaneira</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Simulador de Custo de Importação (Landed Cost)
        </h1>
        <p className="text-sm text-sky-100/90 mt-1 max-w-3xl">
          No Brasil, a importação é tributada "em cascata": a base de cálculo de cada imposto engloba tributos anteriores, e o ICMS estadual possui o famoso cálculo "por dentro". Calcule o impacto fiscal em tempo real!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-sky-700" />
            1. Valores de Entrada (USD & Câmbio)
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Valor FOB da Mercadoria (USD)
              </label>
              <input
                type="number"
                value={fobValueUsd}
                onChange={(e) => setFobValueUsd(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Frete Internacional (USD)
                </label>
                <input
                  type="number"
                  value={freightUsd}
                  onChange={(e) => setFreightUsd(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Seguro Internacional (USD)
                </label>
                <input
                  type="number"
                  value={insuranceUsd}
                  onChange={(e) => setInsuranceUsd(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Cotação PTAX Comercial (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={ptaxRate}
                onChange={(e) => setPtaxRate(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMaritime}
                  onChange={(e) => setIsMaritime(e.target.checked)}
                  className="rounded text-sky-700"
                />
                <span className="font-semibold text-slate-800">Transporte Marítimo (Aplica 8% AFRMM)</span>
              </label>
            </div>
          </div>

          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pt-3 border-t border-slate-100">
            2. Alíquotas dos Tributos (%)
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 mb-0.5">II (Imp. Importação):</label>
              <input
                type="number"
                step="0.1"
                value={iiRate}
                onChange={(e) => setIiRate(Number(e.target.value))}
                className="w-full px-2.5 py-1 border border-slate-300 rounded-md font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-0.5">IPI (Industrializados):</label>
              <input
                type="number"
                step="0.1"
                value={ipiRate}
                onChange={(e) => setIpiRate(Number(e.target.value))}
                className="w-full px-2.5 py-1 border border-slate-300 rounded-md font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-0.5">PIS-Importação:</label>
              <input
                type="number"
                step="0.01"
                value={pisRate}
                onChange={(e) => setPisRate(Number(e.target.value))}
                className="w-full px-2.5 py-1 border border-slate-300 rounded-md font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-0.5">COFINS-Importação:</label>
              <input
                type="number"
                step="0.01"
                value={cofinsRate}
                onChange={(e) => setCofinsRate(Number(e.target.value))}
                className="w-full px-2.5 py-1 border border-slate-300 rounded-md font-mono"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-slate-600 mb-0.5">ICMS Estadual (% por dentro):</label>
              <input
                type="number"
                step="0.5"
                value={icmsRate}
                onChange={(e) => setIcmsRate(Number(e.target.value))}
                className="w-full px-2.5 py-1 border border-slate-300 rounded-md font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Right Outputs (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Demonstrativo do Valor Aduaneiro & Impostos</span>
            <span className="text-[11px] font-mono text-sky-900 font-bold">
              Fator Multiplicador: {multiplicador.toFixed(2)}x
            </span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-2 text-left">Tributo / Custo</th>
                  <th className="p-2 text-left">Base de Cálculo (R$)</th>
                  <th className="p-2 text-right">Alíquota</th>
                  <th className="p-2 text-right">Valor Apurado (R$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="bg-sky-50/40">
                  <td className="p-2 font-sans font-bold text-sky-950">Valor Aduaneiro CIF</td>
                  <td className="p-2 font-bold text-sky-950">R$ {valorAduaneiroBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2 text-right text-sky-950">-</td>
                  <td className="p-2 text-right font-bold text-sky-950">R$ {valorAduaneiroBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>

                <tr>
                  <td className="p-2 font-sans text-slate-800">Imposto de Importação (II)</td>
                  <td className="p-2 text-slate-600">R$ {valorAduaneiroBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2 text-right">{iiRate}%</td>
                  <td className="p-2 text-right font-bold text-slate-900">R$ {iiVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>

                <tr>
                  <td className="p-2 font-sans text-slate-800">IPI</td>
                  <td className="p-2 text-slate-600">R$ {ipiBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2 text-right">{ipiRate}%</td>
                  <td className="p-2 text-right font-bold text-slate-900">R$ {ipiVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>

                <tr>
                  <td className="p-2 font-sans text-slate-800">PIS-Importação</td>
                  <td className="p-2 text-slate-600">R$ {valorAduaneiroBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2 text-right">{pisRate}%</td>
                  <td className="p-2 text-right font-bold text-slate-900">R$ {pisVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>

                <tr>
                  <td className="p-2 font-sans text-slate-800">COFINS-Importação</td>
                  <td className="p-2 text-slate-600">R$ {valorAduaneiroBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2 text-right">{cofinsRate}%</td>
                  <td className="p-2 text-right font-bold text-slate-900">R$ {cofinsVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>

                {isMaritime && (
                  <tr>
                    <td className="p-2 font-sans text-slate-800">AFRMM (Marinha Mercante)</td>
                    <td className="p-2 text-slate-600">R$ {freightBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="p-2 text-right">8.0%</td>
                    <td className="p-2 text-right font-bold text-slate-900">R$ {afrmmVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                )}

                <tr className="bg-amber-50/50">
                  <td className="p-2 font-sans font-semibold text-amber-950">ICMS (Cálculo por Dentro)</td>
                  <td className="p-2 text-amber-900 font-bold">R$ {icmsBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2 text-right text-amber-900 font-bold">{icmsRate}%</td>
                  <td className="p-2 text-right font-bold text-amber-950">R$ {icmsVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>

              <tfoot className="bg-slate-900 text-white font-bold border-t border-slate-700">
                <tr>
                  <td colSpan={2} className="p-2.5 font-sans">TOTAL DE IMPOSTOS A RECOLHER</td>
                  <td colSpan={2} className="p-2.5 text-right text-emerald-400 font-mono text-sm">
                    R$ {totalImpostos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="bg-slate-950 text-white">
                  <td colSpan={2} className="p-3 font-sans text-sm">CUSTO TOTAL NACIONALIZADO</td>
                  <td colSpan={2} className="p-3 text-right text-sky-300 font-mono text-base">
                    R$ {totalNacionalizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-800 block mb-0.5">Explicação do Fator Multiplicador ({multiplicador.toFixed(2)}x):</span>
            Significa que para cada R$ 1,00 pago pela mercadoria no exterior (preço FOB), sua empresa precisará desembolsar aproximadamente <strong>R$ {multiplicador.toFixed(2)}</strong> para ter a carga liberada e nacionalizada no Brasil.
          </div>
        </div>
      </div>
    </div>
  );
};
