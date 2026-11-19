import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import productsData from '../data/products.json';
import { formatPKR } from '../utils/whatsapp';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'sofas', label: 'Sofas' },
    { id: 'beds', label: 'Bedroom' },
    { id: 'chairs', label: 'Chairs' },
    { id: 'dining', label: 'Dining' },
    { id: 'office', label: 'Office' },
  ];

  const results = productsData.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchTerm.toLowerCase().trim();
    if (!query) return matchesCat;
    const matchText = (
      p.title.toLowerCase() +
      ' ' +
      p.shortDescription.toLowerCase() +
      ' ' +
      (p.materials?.woodFrame || '').toLowerCase() +
      ' ' +
      (p.materials?.upholstery || '').toLowerCase() +
      ' ' +
      (p.subcategory || '').toLowerCase()
    );
    return matchesCat && matchText.includes(query);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 md:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden z-10 flex flex-col max-h-[85vh]">
        
        {/* Search Header Input */}
        <div className="p-4 md:p-6 border-b border-[#E8E2D9] bg-white flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#B08D57] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, wood (Sheesham, Kikar), fabric (velvet, bouclé), or category..."
            className="w-full text-base md:text-lg font-medium text-[#1E1B18] placeholder-[#A8A39D] bg-transparent focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#7A7570] hover:text-[#1E1B18]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-xs font-semibold text-[#7A7570] hover:text-[#1E1B18] border border-[#E8E2D9] rounded-lg bg-[#FAF8F5]"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 md:px-6 py-3 bg-[#FAF8F5] border-b border-[#E8E2D9] flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-[#181513] text-white shadow-xs'
                  : 'bg-white text-[#7A7570] hover:text-[#1E1B18] border border-[#E8E2D9]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#7A7570] pb-2">
            <span>
              {results.length} piece{results.length === 1 ? '' : 's'} found
            </span>
            {searchTerm && <span>Search results for "{searchTerm}"</span>}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-[#7A7570] space-y-2">
              <p className="text-base font-serif font-bold text-[#1E1B18]">No pieces matched your search</p>
              <p className="text-xs">
                Try searching "velvet", "Sheesham", "bed", "cane", or "desk"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.slice(0, 12).map((item) => (
                <a
                  key={item.id}
                  href={`#/product/${item.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#E8E2D9] hover:border-[#B08D57] hover:shadow-subtle transition-all group"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg bg-[#EAE5DC] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase font-bold text-[#8B5A2B] tracking-wider truncate">
                      {item.subcategory || item.category}
                    </p>
                    <h4 className="text-xs md:text-sm font-bold text-[#1E1B18] group-hover:text-[#B08D57] transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs font-bold text-[#1E1B18] tabular-nums mt-0.5">
                      {formatPKR(item.price)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A8A39D] group-hover:text-[#B08D57] flex-shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
