import React, { useState } from 'react';
import { SimulationState } from './types/comex';
import { INITIAL_SIMULATION_STATE, COMEX_SCENARIOS } from './data/scenarios';
import { Header } from './components/Header';
import { StepNavigation } from './components/StepNavigation';
import { Step1NegotiationNcm } from './components/steps/Step1NegotiationNcm';
import { Step2CurrencyPayment } from './components/steps/Step2CurrencyPayment';
import { Step3LogisticsFreight } from './components/steps/Step3LogisticsFreight';
import { Step4Documentation } from './components/steps/Step4Documentation';
import { Step5SiscomexPortal } from './components/steps/Step5SiscomexPortal';
import { Step6CustomsClearance } from './components/steps/Step6CustomsClearance';
import { Step7FinancialSummary } from './components/steps/Step7FinancialSummary';
import { IncotermsVisualizer } from './components/IncotermsVisualizer';
import { QuickComexCalculator } from './components/QuickComexCalculator';
import { GlossaryModal } from './components/GlossaryModal';
import { ComexQuiz } from './components/ComexQuiz';
import { CompletionCertificateModal } from './components/CompletionCertificateModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'simulador' | 'incoterms' | 'calculadora' | 'glossario' | 'quiz'>('simulador');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [simulationState, setSimulationState] = useState<SimulationState>(INITIAL_SIMULATION_STATE);
  const [showCertificate, setShowCertificate] = useState(false);

  const updateState = (updates: Partial<SimulationState>) => {
    setSimulationState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleStepNext = (targetStep: number) => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetSimulation = () => {
    const defaultScenario = COMEX_SCENARIOS[0];
    setSimulationState({
      ...INITIAL_SIMULATION_STATE,
      scenarioId: defaultScenario.id,
      productName: defaultScenario.productName,
      productDescription: defaultScenario.productDescription,
      ncm: defaultScenario.ncm,
      quantity: defaultScenario.defaultQuantity,
      unit: defaultScenario.unit,
      unitPrice: defaultScenario.unitCostOrigin,
      drawnChannel: null,
      channelRevealed: false,
      clearanceCompleted: false,
      documentsSigned: false,
      siscomexSubmitted: false,
    });
    setCurrentStep(1);
    setCompletedSteps([1]);
    setCurrentTab('simulador');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* 3-Zone Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onResetSimulation={handleResetSimulation}
        onOpenCertificate={() => setShowCertificate(true)}
        simulationCompleted={simulationState.clearanceCompleted}
      />

      {/* Stepper only visible when in 7-Step Simulator mode */}
      {currentTab === 'simulador' && (
        <StepNavigation
          currentStep={currentStep}
          onSelectStep={handleSelectStep}
          completedSteps={completedSteps}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'simulador' && (
          <div>
            {currentStep === 1 && (
              <Step1NegotiationNcm
                state={simulationState}
                updateState={updateState}
                onNext={() => handleStepNext(2)}
              />
            )}

            {currentStep === 2 && (
              <Step2CurrencyPayment
                state={simulationState}
                updateState={updateState}
                onPrev={() => setCurrentStep(1)}
                onNext={() => handleStepNext(3)}
              />
            )}

            {currentStep === 3 && (
              <Step3LogisticsFreight
                state={simulationState}
                updateState={updateState}
                onPrev={() => setCurrentStep(2)}
                onNext={() => handleStepNext(4)}
              />
            )}

            {currentStep === 4 && (
              <Step4Documentation
                state={simulationState}
                updateState={updateState}
                onPrev={() => setCurrentStep(3)}
                onNext={() => handleStepNext(5)}
              />
            )}

            {currentStep === 5 && (
              <Step5SiscomexPortal
                state={simulationState}
                updateState={updateState}
                onPrev={() => setCurrentStep(4)}
                onNext={() => handleStepNext(6)}
              />
            )}

            {currentStep === 6 && (
              <Step6CustomsClearance
                state={simulationState}
                updateState={updateState}
                onPrev={() => setCurrentStep(5)}
                onNext={() => handleStepNext(7)}
              />
            )}

            {currentStep === 7 && (
              <Step7FinancialSummary
                state={simulationState}
                updateState={updateState}
                onOpenCertificate={() => setShowCertificate(true)}
                onResetSimulation={handleResetSimulation}
                onPrev={() => setCurrentStep(6)}
              />
            )}
          </div>
        )}

        {currentTab === 'incoterms' && <IncotermsVisualizer />}

        {currentTab === 'calculadora' && <QuickComexCalculator />}

        {currentTab === 'glossario' && <GlossaryModal />}

        {currentTab === 'quiz' && <ComexQuiz />}
      </main>

      {/* Printable Certificate Modal */}
      {showCertificate && (
        <CompletionCertificateModal
          state={simulationState}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">ComexEdu Simulator</span>
            <span>·</span>
            <span>Plataforma Pedagógica para Aulas de Comércio Exterior</span>
          </div>

          <div className="text-slate-400">
            Regras Incoterms 2020 (CCI) · Portal Único Siscomex · Receita Federal do Brasil
          </div>
        </div>
      </footer>
    </div>
  );
}
