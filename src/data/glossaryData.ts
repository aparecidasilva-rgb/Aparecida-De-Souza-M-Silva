export interface GlossaryTerm {
  term: string;
  category: 'Aduana & Fiscal' | 'Logística & Transporte' | 'Câmbio & Financeiro' | 'Documentos & Órgãos';
  definition: string;
  practicalExample: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'NCM (Nomenclatura Comum do Mercosul)',
    category: 'Aduana & Fiscal',
    definition: 'Código de 8 dígitos baseado no Sistema Harmonizado (SH) que classifica toda mercadoria que circula no Brasil e no Mercosul. Define quais impostos serão cobrados e se exige licença.',
    practicalExample: 'O café verde não torrado tem a NCM 0901.11.10. Errar a NCM gera multa de 1% do valor aduaneiro pela Receita Federal.'
  },
  {
    term: 'Siscomex (Sistema Integrado de Comércio Exterior)',
    category: 'Aduana & Fiscal',
    definition: 'Plataforma oficial do Governo Brasileiro onde importadores, exportadores e despachantes registram e acompanham todas as operações de Comex perante a Receita Federal e SECEX.',
    practicalExample: 'No Portal Único Siscomex você emite a DU-E (Exportação) ou a DUIMP (Importação).'
  },
  {
    term: 'DU-E (Declaração Única de Exportação)',
    category: 'Documentos & Órgãos',
    definition: 'Documento eletrônico que consolida todas as informações de natureza aduaneira, administrativa, comercial, financeira e logística de uma exportação brasileira.',
    practicalExample: 'A DU-E é gerada no Portal Siscomex puxando automaticamente os dados da Nota Fiscal Eletrônica (NF-e) de exportação.'
  },
  {
    term: 'DUIMP (Declaração Única de Importação)',
    category: 'Documentos & Órgãos',
    definition: 'Documento eletrônico central do Novo Processo de Importação brasileiro, que substituiu a tradicional DI (Declaração de Importação) no Siscomex.',
    practicalExample: 'O importador registra a DUIMP antes mesmo da carga atracar no porto, agilizando o desembaraço.'
  },
  {
    term: 'Bill of Lading (B/L) - Conhecimento de Embarque Marítimo',
    category: 'Documentos & Órgãos',
    definition: 'O documento mais sagrado do transporte marítimo internacional. Tem tríplice função: recibo de entrega da carga, contrato de transporte e título de propriedade da mercadoria.',
    practicalExample: 'Quem tem a posse original do B/L pode retirar o contêiner no porto de destino.'
  },
  {
    term: 'Commercial Invoice (Fatura Comercial)',
    category: 'Documentos & Órgãos',
    definition: 'Documento de natureza contratual emitido pelo exportador, correspondente à nota fiscal internacional. Especifica comprador, vendedor, preço, Incoterm, NCM e moeda.',
    practicalExample: 'A Receita Federal exige assinatura em via original e detalhes idênticos ao físico da carga.'
  },
  {
    term: 'Packing List (Romaneio de Carga)',
    category: 'Documentos & Órgãos',
    definition: 'Lista detalhada das embalagens, volumes, pesos bruto e líquido, dimensões e número de lacres que compõem a expedição.',
    practicalExample: 'Usado pelos fiscais aduaneiros no canal vermelho para inspecionar caixa por caixa.'
  },
  {
    term: 'Canal de Parametrização',
    category: 'Aduana & Fiscal',
    definition: 'Sistema de triagem de risco da Receita Federal que direciona cada declaração para um canal de fiscalização: Verde (automático), Amarelo (análise documental), Vermelho (documentos + conferência física) ou Cinza (suspeita de fraude fiscal).',
    practicalExample: 'No Canal Verde, a carga é liberada em minutos pelo sistema eletrônico sem intervenção manual.'
  },
  {
    term: 'Habilitação Radar (Ambiente de Registro Aduaneiro)',
    category: 'Aduana & Fiscal',
    definition: 'Autorização prévia concedida pela Receita Federal para que uma empresa possa operar no comércio exterior. Subdivide-se em Expresso, Limitado e Ilimitado.',
    practicalExample: 'Sem Radar ativo, nenhuma empresa pode cadastrar operações no Siscomex.'
  },
  {
    term: 'Drawback',
    category: 'Aduana & Fiscal',
    definition: 'Regime aduaneiro especial que suspende ou isenta tributos federais sobre insumos importados ou nacionais destinados à fabricação de produtos que serão exportados.',
    practicalExample: 'Uma fábrica compra aço importado sem imposto para produzir e exportar tratores agrícolas.'
  },
  {
    term: 'Carta de Crédito (Letter of Credit - L/C)',
    category: 'Câmbio & Financeiro',
    definition: 'Instrumento financeiro emitido por um banco a pedido do importador, garantindo o pagamento ao exportador desde que todos os documentos exigidos sejam apresentados sem discrepâncias.',
    practicalExample: 'Garante que o exportador receberá o dinheiro e que o importador só pagará se os documentos de embarque estiverem corretos.'
  },
  {
    term: 'Demurrage (Sobrestadia de Contêiner)',
    category: 'Logística & Transporte',
    definition: 'Taxa cobrada pelo armador (dono do navio/contêiner) pelo tempo excedente que o importador leva para descarregar e devolver o contêiner vazio além do período livre (free time).',
    practicalExample: 'Se o free time for de 14 dias e o importador demorar 20 dias para liberar a carga na alfândega, pagará 6 dias de demurrage em dólares.'
  },
  {
    term: 'THC (Terminal Handling Charge)',
    category: 'Logística & Transporte',
    definition: 'Taxa cobrada pelo terminal portuário pela movimentação do contêiner do navio até a pilha do pátio ou vice-versa.',
    practicalExample: 'No Incoterm FOB, o exportador paga a THC de embarque; no CIF, ela já costuma estar negociada no contrato marítimo.'
  },
  {
    term: 'AFRMM (Adicional ao Frete para Renovação da Marinha Mercante)',
    category: 'Aduana & Fiscal',
    definition: 'Contribuição parafiscal brasileira calculada sobre o frete aquaviário de importação (atualmente 8% para navegação de longo curso).',
    practicalExample: 'Se o frete marítimo custou R$ 10.000, o importador pagará R$ 800 de AFRMM antes de registrar a DUIMP.'
  },
  {
    term: 'LPCO (Licenças, Permissões, Certificados e Outros)',
    category: 'Documentos & Órgãos',
    definition: 'Módulo do Portal Único do Comércio Exterior onde órgãos anuentes (Anvisa, MAPA, Exército, Ibama, Inmetro) emitem autorizações para produtos regulados.',
    practicalExample: 'Medicamentos exigem anuência da ANVISA via módulo LPCO antes da liberação aduaneira.'
  }
];
