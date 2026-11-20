import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

export default function CuratedGrids() {
  const [activeTab, setActiveTab] = useState('sofas');

  const tabs = [
    { id: 'sofas', label: 'Signature Sofas', count: productsData.filter(p => p.category === 'sofas').length },
    { id: 'beds', label: 'Luxury Bed Sets', count: productsData.filter(p => p.category === 'beds').length },
    { id: 'chairs', label: 'Accent & Lounge Chairs', count: productsData.filter(p => p.category === 'chairs').length },
    { id: 'dining', label: 'Dining Suites', count: productsData.filter(p => p.category === 'dining').length },
    { id: 'office', label: 'Executive Office', count: productsData.filter(p => p.category === 'office').length },
  ];

  const filteredProducts = productsData.filter(p => p.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-white border-y border-[#E8E2D9]/70">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Title & Section Introduction */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 md:mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Multani Craftsmanship</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1B18] tracking-tight">
            Curated Heirloom Collections
          </h2>
          <p className="text-sm md:text-base text-[#7A7570] font-light">
            Each piece is custom-cut, mortise-joined, and hand-finished in our Multan atelier using sustainably harvested seasoned timber.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 md:mb-12 gap-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all ${
                activeTab === tab.id
                  ? 'bg-[#181513] text-[#FAF8F5] shadow-sm'
                  : 'bg-[#FAF8F5] text-[#1E1B18]/70 hover:text-[#1E1B18] hover:bg-[#EAE5DC] border border-[#E8E2D9]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-2 text-[11px] px-1.5 py-0.2 rounded-full ${
                activeTab === tab.id ? 'bg-[#FAF8F5]/20 text-[#FAF8F5]' : 'bg-[#1E1B18]/10 text-[#7A7570]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Explore Button */}
        <div className="mt-12 text-center">
          <a
            href={`/collections?category=${activeTab}`}
            className="inline-flex items-center space-x-2 bg-[#FAF8F5] hover:bg-[#EAE5DC] text-[#1E1B18] border border-[#E8E2D9] px-8 py-3.5 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all shadow-subtle hover:shadow-elevated btn-press"
          >
            <span>View All {tabs.find(t => t.id === activeTab)?.label}</span>
            <ArrowRight className="w-4 h-4 text-[#8B5A2B]" />
          </a>
        </div>

      </div>
    </section>
  );
}
