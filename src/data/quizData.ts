export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Em uma negociação com Incoterm FOB Santos, em qual momento o risco da carga é transferido do vendedor para o comprador?',
    context: 'Você está exportando soja em grãos pelo Porto de Santos para um importador em Roterdã.',
    options: [
      'Quando o caminhão sai da fazenda no interior',
      'Quando a mercadoria estiver colocada a bordo do navio no Porto de Santos',
      'Quando o navio atracar no porto de Roterdã',
      'Somente após o pagamento bancário'
    ],
    correctIndex: 1,
    explanation: 'Correto! No FOB (Free On Board), a transferência de riscos e custos ocorre no exato momento em que a carga é colocada e estivada a bordo do navio no porto de embarque nomeado.'
  },
  {
    id: 2,
    question: 'Qual é o documento que comprova a propriedade da mercadoria no transporte marítimo internacional e atua como recibo da carga?',
    context: 'Documentação essencial do Comércio Exterior.',
    options: [
      'Nota Fiscal Paulistana',
      'Bill of Lading (B/L) / Conhecimento de Embarque',
      'Proforma Invoice',
      'Certificado Fitossanitário'
    ],
    correctIndex: 1,
    explanation: 'Exato! O Bill of Lading (B/L) possui função tríplice: recibo de entrega da carga ao transportador, contrato de transporte e título de crédito representativo da posse da mercadoria.'
  },
  {
    id: 3,
    question: 'Se sua carga importada for sorteada para o Canal Amarelo de parametrização da Receita Federal, o que acontecerá?',
    context: 'Sua empresa acabou de registrar a declaração aduaneira no Siscomex.',
    options: [
      'A carga é desembaraçada e liberada imediatamente sem qualquer análise',
      'Haverá exame documental (análise de fatura, B/L, licenças), sem conferência física da carga',
      'A carga será confiscada automaticamente por crime de contrabando',
      'O fiscal abrirá todos os contêineres e fará teste laboratorial compulsório'
    ],
    correctIndex: 1,
    explanation: 'Muito bem! No Canal Amarelo é realizado o exame estritamente documental dos papéis do processo. Caso não haja irregularidades, a carga é desembaraçada.'
  },
  {
    id: 4,
    question: 'O que a sigla NCM significa e qual a sua quantidade de dígitos?',
    context: 'Classificação fiscal de mercadorias no Mercosul.',
    options: [
      'Norma Cambial Marítima - 4 dígitos',
      'Nomenclatura Comum do Mercosul - 8 dígitos',
      'Número de Controle Mercantil - 12 dígitos',
      'Novo Cadastro Municipal - 6 dígitos'
    ],
    correctIndex: 1,
    explanation: 'Perfeito! A NCM (Nomenclatura Comum do Mercosul) possui 8 dígitos e é adotada por Brasil, Argentina, Paraguai e Uruguai para identificar tributos e exigências administrativas de cada bem.'
  },
  {
    id: 5,
    question: 'Qual regime aduaneiro especial permite suspender ou isentar impostos na importação de insumos que serão usados na fabricação de produtos exportados?',
    context: 'Incentivos fiscais para a indústria exportadora.',
    options: [
      'Drawback',
      'Simples Nacional',
      'Admissão Temporária',
      'Entreposto Virtual'
    ],
    correctIndex: 0,
    explanation: 'Excelente! O Drawback é o principal mecanismo brasileiro de incentivo às exportações, desonerando os insumos para tornar os produtos nacionais competitivos no mundo.'
  }
];
