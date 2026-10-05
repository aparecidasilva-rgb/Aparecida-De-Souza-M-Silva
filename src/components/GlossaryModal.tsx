import React, { useState } from 'react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { BookOpen, Search, Tag, Sparkles } from 'lucide-react';

export const GlossaryModal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Aduana & Fiscal', 'Logística & Transporte', 'Câmbio & Financeiro', 'Documentos & Órgãos'];

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.practicalExample.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 tracking-wide uppercase mb-1">
          <span>Dicionário Prático</span>
          <span>·</span>
          <span>Vocabulário Técnico & Jargões do Comex</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Glossário do Jovem Profissional de Comércio Exterior
        </h1>
        <p className="text-sm text-sky-100/90 mt-1 max-w-3xl">
          Do Siscomex ao B/L, do Drawback ao Demurrage: entenda com clareza a linguagem falada nas aduanas, portos, aeroportos e tradings de todo o Brasil.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar termo, sigla ou conceito (ex: NCM, DU-E, B/L, Drawback, PTAX)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-600 mr-1">Categorias:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todos os Termos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {item.term}
              </h3>
              <span className="text-[10px] font-semibold bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-100 shrink-0">
                {item.category}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {item.definition}
            </p>

            <div className="pt-2 border-t border-slate-100 bg-slate-50/70 p-2.5 rounded-lg text-xs text-slate-700">
              <span className="font-bold text-sky-900 block text-[11px] mb-0.5">
                Exemplo Prático na Rotina:
              </span>
              {item.practicalExample}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
