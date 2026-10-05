import React, { useState } from 'react';
import { SimulationState } from '../../types/comex';
import { 
  TrendingUp, 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Coins, 
  FileText, 
  UserCheck, 
  Sparkles,
  Printer,
  RotateCcw
} from 'lucide-react';

interface Step7Props {
  state: SimulationState;
  updateState: (updates: Partial<SimulationState>) => void;
  onOpenCertificate: () => void;
  onResetSimulation: () => void;
  onPrev: () => void;
}

export const Step7FinancialSummary: React.FC<Step7Props> = ({
  state,
  updateState,
  onOpenCertificate,
  onResetSimulation,
  onPrev,
}) => {
  const isExport = state.operationType === 'exportacao';
  const totalValueForeign = state.quantity * state.unitPrice;
  const totalValueBrl = totalValueForeign * state.exchangeRateBrl;

  // Cálculos de custos e impostos
  const freightBrl = state.freightCost * state.exchangeRateBrl;
  const insuranceBrl = state.insuranceCost * state.exchangeRateBrl;
  const valorAduaneiroCifBrl = totalValueBrl + freightBrl + insuranceBrl;

  // Impostos de Importação (se aplicável)
  const iiValue = isExport ? 0 : valorAduaneiroCifBrl * (state.iiRate / 100);
  const ipiBase = isExport ? 0 : valorAduaneiroCifBrl + iiValue;
  const ipiValue = isExport ? 0 : ipiBase * (state.ipiRate / 100);
  const pisValue = isExport ? 0 : valorAduaneiroCifBrl * (state.pisRate / 100);
  const cofinsValue = isExport ? 0 : valorAduaneiroCifBrl * (state.cofinsRate / 100);

  // ICMS cálculo por dentro (simplificado pedagógico)
  const icmsRateDecimal = state.icmsRate / 100;
  const icmsBase = isExport ? 0 : (valorAduaneiroCifBrl + iiValue + ipiValue + pisValue + cofinsValue) / (1 - icmsRateDecimal);
  const icmsValue = isExport ? 0 : icmsBase * icmsRateDecimal;

  const afrmmValue = (!isExport && state.transportModal === 'maritimo') ? freightBrl * (state.afrmmRate / 100) : 0;
  const taxaSiscomexBrl = 214.50;

  const totalImpostosBrl = iiValue + ipiValue + pisValue + cofinsValue + icmsValue + afrmmValue + (isExport ? 0 : taxaSiscomexBrl);
  const custoTotalNacionalizadoBrl = valorAduaneiroCifBrl + totalImpostosBrl + state.internalFreightOriginBrl + state.portTerminalFeesBrl;
  const custoUnitarioNacionalizadoBrl = custoTotalNacionalizadoBrl / state.quantity;

  // Cálculo da pontuação pedagógica do aluno (0 a 100)
  let score = 50;
  if (state.documentsSigned) score += 15;
  if (state.siscomexSubmitted) score += 15;
  if (state.clearanceCompleted) score += 20;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 tracking-wide uppercase mb-1">
              <span>Etapa 07</span>
              <span>·</span>
              <span>Fechamento Financeiro & Avaliação do Aluno</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Demonstrativo de Custos & Conclusão do Despacho
            </h1>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-2xl">
              Parabéns! Sua operação percorreu com sucesso todas as 7 etapas do Comércio Exterior. Confira abaixo a viabilidade financeira e emita o seu Certificado de Operador Comex.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-3 border border-white/15 text-xs text-emerald-100 flex items-start gap-2 max-w-xs">
            <Award className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">Pontuação Pedagógica:</span>
              Você conquistou <strong className="text-emerald-300 font-mono text-sm">{score}/100 pontos</strong> nesta simulação prática!
            </div>
          </div>
        </div>
      </div>

      {/* Student Profile Input for Certificate */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-sky-700" />
          Dados do Estudante para Emissão do Certificado
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Nome Completo do Aluno / Aprendiz
            </label>
            <input
              type="text"
              placeholder="Ex: Ana Clara Silva Santos"
              value={state.studentName}
              onChange={(e) => updateState({ studentName: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Turma / Curso de Comércio Exterior
            </label>
            <input
              type="text"
              placeholder="Ex: Técnico em Comex - Módulo Logística 2026"
              value={state.classGroup}
              onChange={(e) => updateState({ classGroup: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Financial Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Financial Spreadsheet */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Demonstrativo de Resultado da Operação ({isExport ? 'Exportação' : 'Importação Nacionalizada'})</span>
            <span className="text-xs font-mono font-bold text-sky-900">
              Taxa PTAX: R$ {state.exchangeRateBrl.toFixed(2)}
            </span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-2.5 text-left">Rubrica de Custo / Receita</th>
                  <th className="p-2.5 text-right">Moeda Estrangeira</th>
                  <th className="p-2.5 text-right">Valor em BRL (R$)</th>
                  <th className="p-2.5 text-right">% Custo Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="p-2.5 font-sans font-medium text-slate-900">
                    Mercadoria / Valor da Carga ({state.quantity} {state.unit})
                  </td>
                  <td className="p-2.5 text-right">{state.currency} ${totalValueForeign.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2.5 text-right font-bold text-slate-900">R$ {totalValueBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2.5 text-right text-slate-500">
                    {((totalValueBrl / custoTotalNacionalizadoBrl) * 100).toFixed(1)}%
                  </td>
                </tr>

                <tr>
                  <td className="p-2.5 font-sans text-slate-700">
                    Frete Internacional ({state.transportModal})
                  </td>
                  <td className="p-2.5 text-right">USD ${state.freightCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2.5 text-right">R$ {freightBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2.5 text-right text-slate-500">
                    {((freightBrl / custoTotalNacionalizadoBrl) * 100).toFixed(1)}%
                  </td>
                </tr>

                <tr>
                  <td className="p-2.5 font-sans text-slate-700">
                    Seguro Internacional de Transporte
                  </td>
                  <td className="p-2.5 text-right">USD ${state.insuranceCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2.5 text-right">R$ {insuranceBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2.5 text-right text-slate-500">
                    {((insuranceBrl / custoTotalNacionalizadoBrl) * 100).toFixed(1)}%
                  </td>
                </tr>

                {!isExport && (
                  <>
                    <tr className="bg-sky-50/50">
                      <td className="p-2.5 font-sans font-semibold text-sky-950">
                        = Valor Aduaneiro CIF (Base de Cálculo de Impostos)
                      </td>
                      <td className="p-2.5 text-right font-bold text-sky-950">
                        USD ${(totalValueForeign + state.freightCost + state.insuranceCost).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-2.5 text-right font-bold text-sky-950">
                        R$ {valorAduaneiroCifBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-2.5 text-right font-bold text-sky-950">-</td>
                    </tr>

                    <tr>
                      <td className="p-2.5 font-sans text-slate-700">Imposto de Importação (II - {state.iiRate}%)</td>
                      <td className="p-2.5 text-right">-</td>
                      <td className="p-2.5 text-right">R$ {iiValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td className="p-2.5 text-right text-slate-500">{((iiValue / custoTotalNacionalizadoBrl) * 100).toFixed(1)}%</td>
                    </tr>

                    <tr>
                      <td className="p-2.5 font-sans text-slate-700">PIS/COFINS-Importação ({state.pisRate}% + {state.cofinsRate}%)</td>
                      <td className="p-2.5 text-right">-</td>
                      <td className="p-2.5 text-right">R$ {(pisValue + cofinsValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td className="p-2.5 text-right text-slate-500">{(((pisValue + cofinsValue) / custoTotalNacionalizadoBrl) * 100).toFixed(1)}%</td>
                    </tr>

                    <tr>
                      <td className="p-2.5 font-sans text-slate-700">ICMS Estadual ({state.icmsRate}% cálculo por dentro)</td>
                      <td className="p-2.5 text-right">-</td>
                      <td className="p-2.5 text-right">R$ {icmsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td className="p-2.5 text-right text-slate-500">{((icmsValue / custoTotalNacionalizadoBrl) * 100).toFixed(1)}%</td>
                    </tr>

                    {afrmmValue > 0 && (
                      <tr>
                        <td className="p-2.5 font-sans text-slate-700">AFRMM Marinha Mercante (8% do frete)</td>
                        <td className="p-2.5 text-right">-</td>
                        <td className="p-2.5 text-right">R$ {afrmmValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td className="p-2.5 text-right text-slate-500">{((afrmmValue / custoTotalNacionalizadoBrl) * 100).toFixed(1)}%</td>
                      </tr>
                    )}
                  </>
                )}

                <tr>
                  <td className="p-2.5 font-sans text-slate-700">
                    Logística Interna (Frete Rodoviário + Capatazia/THC)
                  </td>
                  <td className="p-2.5 text-right">-</td>
                  <td className="p-2.5 text-right">
                    R$ {(state.internalFreightOriginBrl + state.portTerminalFeesBrl).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-2.5 text-right text-slate-500">
                    {(((state.internalFreightOriginBrl + state.portTerminalFeesBrl) / custoTotalNacionalizadoBrl) * 100).toFixed(1)}%
                  </td>
                </tr>
              </tbody>

              <tfoot className="bg-slate-900 text-white font-bold border-t border-slate-700">
                <tr>
                  <td className="p-3 font-sans text-xs">
                    {isExport ? 'TOTAL DA OPERAÇÃO / RECEITA LÍQUIDA' : 'CUSTO TOTAL NACIONALIZADO DA CARGA'}
                  </td>
                  <td className="p-3 text-right text-sky-300 font-mono">
                    {state.currency} ${totalValueForeign.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-right text-emerald-400 font-mono text-sm">
                    R$ {custoTotalNacionalizadoBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-right font-mono">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span>Custo Unitário Final por item:</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              R$ {custoUnitarioNacionalizadoBrl.toFixed(2)} / {state.unit}
            </span>
          </div>
        </div>

        {/* Right Col: Performance & Teacher Feedback */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Desempenho da Aula
              </span>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-700">
                {score >= 80 ? 'Excelente' : 'Bom'}
              </span>
            </div>

            <div className="text-center py-2">
              <div className="text-4xl font-extrabold text-white font-mono">
                {score}<span className="text-xl text-slate-400">/100</span>
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Nota Geral de Competências em Comex
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Negociação & Incoterm:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Correto
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Dossiê Documental:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Autenticado
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Transmissão Siscomex:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Registrada
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Desembaraço Aduaneiro:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Concluído
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenCertificate}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Award className="w-4 h-4 text-emerald-200" />
              <span>Visualizar & Imprimir Certificado</span>
            </button>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-xs text-sky-950 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-sky-900">
              <Sparkles className="w-4 h-4 text-sky-600" />
              Parecer Pedagógico do Professor:
            </div>
            <p className="leading-relaxed text-[11px] text-sky-900/90">
              O estudante demonstrou domínio dos conceitos essenciais do Comércio Exterior brasileiro: correlação entre NCM e Incoterm 2020, impacto da taxa PTAX na formação do valor aduaneiro CIF e cumprimento dos procedimentos do Portal Único Siscomex.
            </p>
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
          <span>Voltar: Desembaraço</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onResetSimulation}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Simular Outro Caso</span>
          </button>

          <button
            type="button"
            onClick={onOpenCertificate}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Award className="w-4 h-4 text-emerald-200" />
            <span>Emitir Certificado</span>
          </button>
        </div>
      </div>
    </div>
  );
};
