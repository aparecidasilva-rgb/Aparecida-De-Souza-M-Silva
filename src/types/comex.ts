export type OperationType = 'exportacao' | 'importacao';

export type IncotermCode =
  | 'EXW'
  | 'FCA'
  | 'FAS'
  | 'FOB'
  | 'CPT'
  | 'CIP'
  | 'CFR'
  | 'CIF'
  | 'DAP'
  | 'DPU'
  | 'DDP';

export interface IncotermInfo {
  code: IncotermCode;
  name: string;
  category: 'E' | 'F' | 'C' | 'D';
  modalAllowed: 'qualquer' | 'aquaviario';
  sellerResponsibility: string;
  buyerResponsibility: string;
  riskTransferPoint: string;
  costTransferPoint: string;
  insuranceRequired: boolean;
  insuranceParty?: 'Vendedor' | 'Comprador' | 'Não obrigatório';
  suitableForNovices: boolean;
  advice: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'BRL';

export type PaymentMethod =
  | 'carta_credito'
  | 'cobranca_documentaria'
  | 'antecipado'
  | 'remessa_sem_saque';

export type TransportModal = 'maritimo' | 'aereo' | 'rodoviario';

export type CustomsChannel = 'verde' | 'amarelo' | 'vermelho' | 'cinza';

export interface ProductScenario {
  id: string;
  title: string;
  tagline: string;
  type: OperationType;
  productName: string;
  productDescription: string;
  ncm: string;
  ncmDescription: string;
  defaultQuantity: number;
  unit: string;
  unitCostCurrency: CurrencyCode;
  unitCostOrigin: number;
  originCountry: string;
  originPort: string;
  destinationCountry: string;
  destinationPort: string;
  recommendedIncoterm: IncotermCode;
  recommendedModal: TransportModal;
  suggestedPayment: PaymentMethod;
  weightPerUnitKg: number;
  volumeM3: number;
  iiTax: number; // Imposto de Importação (%)
  ipiTax: number;
  pisTax: number;
  cofinsTax: number;
  icmsTax: number;
  story: string;
}

export interface DocumentData {
  invoiceNumber: string;
  invoiceDate: string;
  exporterName: string;
  exporterCnpj: string;
  exporterAddress: string;
  importerName: string;
  importerTaxId: string;
  importerAddress: string;
  blAwbNumber: string;
  vesselName: string;
  voyageNumber: string;
  containerNumber: string;
  sealNumber: string;
  packagesCount: number;
  grossWeightKg: number;
  netWeightKg: number;
  measurementM3: number;
  certificateOfOriginType: string;
  insurancePolicyNumber: string;
}

export interface SimulationState {
  scenarioId: string;
  operationType: OperationType;
  productName: string;
  productDescription: string;
  ncm: string;
  quantity: number;
  unit: string;
  unitPrice: number; // in transaction currency
  currency: CurrencyCode;
  exchangeRateBrl: number; // 1 USD or EUR = X BRL
  incoterm: IncotermCode;
  originCountry: string;
  originCityPort: string;
  destinationCountry: string;
  destinationCityPort: string;
  
  // Payment
  paymentMethod: PaymentMethod;
  paymentTermDays: number;

  // Logistics
  transportModal: TransportModal;
  containerType: '20ft' | '40ft' | 'carga_solta' | 'palete';
  freightCost: number; // in USD
  insuranceCost: number; // in USD
  transitTimeDays: number;
  internalFreightOriginBrl: number;
  portTerminalFeesBrl: number;

  // Taxes (for Import)
  iiRate: number;
  ipiRate: number;
  pisRate: number;
  cofinsRate: number;
  icmsRate: number;
  afrmmRate: number; // Marinha Mercante 8% do frete marítimo

  // Documents
  documents: DocumentData;
  documentsSigned: boolean;

  // Siscomex
  declarationType: 'DU-E' | 'DUIMP';
  declarationNumber: string;
  recintoAlfandegado: string;
  unidadeReceitaFederal: string;
  rucCode: string;
  siscomexSubmitted: boolean;

  // Clearance
  drawnChannel: CustomsChannel | null;
  channelRevealed: boolean;
  discrepancyIdentified: boolean;
  inspectionPassed: boolean;
  customsDutyPaid: boolean;
  clearanceCompleted: boolean;

  // Student Tracking
  studentName: string;
  classGroup: string;
}
