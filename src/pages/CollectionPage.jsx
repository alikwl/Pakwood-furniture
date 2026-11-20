import React, { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, ChevronDown, Sparkles, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { formatPKR } from '../utils/whatsapp';

export default function CollectionPage() {
  // Parse clean URL query params (e.g. /collections?category=sofas&room=Living)
  const getInitialParams = () => {
    const searchPart = window.location.search ? window.location.search.slice(1) : '';
    const hashPart = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
    const params = new URLSearchParams(searchPart || hashPart);
    return {
      category: params.get('category') || 'all',
      room: params.get('room') || 'all',
      sort: params.get('sort') || 'featured'
    };
  };

  const initial = getInitialParams();
  const [selectedCategory, setSelectedCategory] = useState(initial.category);
  const [selectedRoom, setSelectedRoom] = useState(initial.room);
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [maxPrice, setMaxPrice] = useState(265000);
  const [sortBy, setSortBy] = useState(initial.sort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with clean URL & popstate changes
  useEffect(() => {
    const handleUrlChange = () => {
      const p = getInitialParams();
      setSelectedCategory(p.category);
      setSelectedRoom(p.room);
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Room filter
      if (selectedRoom !== 'all' && p.room.toLowerCase() !== selectedRoom.toLowerCase()) {
        return false;
      }
      // Material filter
      if (selectedMaterial !== 'all') {
        const mat = (p.materials?.upholstery || '') + ' ' + (p.materials?.woodFrame || '');
        if (!mat.toLowerCase().includes(selectedMaterial.toLowerCase())) {
          return false;
        }
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [selectedCategory, selectedRoom, selectedMaterial, maxPrice, sortBy]);

  const categories = [
    { id: 'all', name: 'All Pieces' },
    { id: 'sofas', name: 'Sofas & Couches' },
    { id: 'beds', name: 'Bedroom Sets' },
    { id: 'chairs', name: 'Accent Chairs' },
    { id: 'dining', name: 'Dining Tables' },
    { id: 'office', name: 'Executive Office' },
  ];

  const rooms = [
    { id: 'all', name: 'All Spaces' },
    { id: 'Living', name: 'Living Room' },
    { id: 'Bedroom', name: 'Master Bedroom' },
    { id: 'Chairs', name: 'Lounge & Accent' },
    { id: 'Dining', name: 'Dining Room' },
    { id: 'Office', name: 'Study & Office' },
    { id: 'Chesterfield', name: 'Chesterfield Suite' },
  ];

  const materials = [
    { id: 'all', name: 'All Materials' },
    { id: 'velvet', name: 'Turkish Velvet' },
    { id: 'boucle', name: 'Belgian Bouclé' },
    { id: 'leather', name: 'Saddle Leatherite' },
    { id: 'sheesham', name: '100% Solid Sheesham' },
    { id: 'cane', name: 'Natural Rattan Cane' },
  ];

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedRoom('all');
    setSelectedMaterial('all');
    setMaxPrice(265000);
    setSortBy('featured');
    if (window.location.search || window.location.hash) {
      window.history.pushState(null, '', '/collections');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedRoom !== 'all' || selectedMaterial !== 'all' || maxPrice < 265000;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[#7A7570] mb-4">
          <a href="/" className="hover:text-[#B08D57] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#1E1B18] font-medium">Collections</span>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-[#8B5A2B] capitalize font-semibold">{selectedCategory}</span>
            </>
          )}
        </div>

        {/* Collection Header Banner */}
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#E8E2D9] mb-8 md:mb-12 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multan Workshop Catalog</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B18] tracking-tight">
              {selectedCategory === 'all'
                ? 'All Handcrafted Collections'
                : categories.find(c => c.id === selectedCategory)?.name || 'Furniture Catalog'}
            </h1>
            <p className="text-xs md:text-sm text-[#7A7570] font-light">
              Explore 40+ signature pieces designed for Pakistan's climate, crafted from seasoned hardwood, and delivered nationwide.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 bg-white border border-[#E8E2D9] px-4 py-2.5 rounded-lg text-xs font-bold text-[#1E1B18] shadow-xs"
            >
              <Filter className="w-4 h-4 text-[#B08D57]" />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center space-x-2">
              <span className="hidden sm:inline text-xs text-[#7A7570]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1E1B18] focus:outline-none focus:border-[#B08D57] shadow-xs cursor-pointer"
              >
                <option value="featured">Featured Pieces</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-subtle space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#B08D57]" />
                <h3 className="font-serif text-lg font-bold text-[#1E1B18]">Filter Catalog</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#8B5A2B] hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                Category
              </h4>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-[#181513] text-white font-semibold'
                        : 'text-[#1E1B18]/80 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-60">
                      {cat.id === 'all'
                        ? productsData.length
                        : productsData.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Room Ambience Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8E2D9]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                Room & Ambience
              </h4>
              <div className="space-y-1">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedRoom === room.id
                        ? 'text-[#8B5A2B] font-bold bg-[#B08D57]/10'
                        : 'text-[#7A7570] hover:text-[#1E1B18]'
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8E2D9]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                Material / Upholstery
              </h4>
              <div className="space-y-1">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedMaterial === mat.id
                        ? 'text-[#8B5A2B] font-bold bg-[#B08D57]/10'
                        : 'text-[#7A7570] hover:text-[#1E1B18]'
                    }`}
                  >
                    {mat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D9]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                  Max Price
                </h4>
                <span className="text-xs font-bold text-[#8B5A2B] tabular-nums">
                  {formatPKR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="35000"
                max="265000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#B08D57] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A8A39D] tabular-nums">
                <span>₨ 35,000</span>
                <span>₨ 265,000</span>
              </div>
            </div>

          </aside>

          {/* Product Grid Area (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Active Filter Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#7A7570]">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center space-x-1 bg-white border border-[#E8E2D9] px-2.5 py-1 rounded-full text-xs text-[#1E1B18]">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3 text-[#A8A39D]" /></button>
                  </span>
                )}
                {selectedRoom !== 'all' && (
                  <span className="inline-flex items-center space-x-1 bg-white border border-[#E8E2D9] px-2.5 py-1 rounded-full text-xs text-[#1E1B18]">
                    <span>Room: {selectedRoom}</span>
                    <button onClick={() => setSelectedRoom('all')}><X className="w-3 h-3 text-[#A8A39D]" /></button>
                  </span>
                )}
                {selectedMaterial !== 'all' && (
                  <span className="inline-flex items-center space-x-1 bg-white border border-[#E8E2D9] px-2.5 py-1 rounded-full text-xs text-[#1E1B18]">
                    <span>Material: {selectedMaterial}</span>
                    <button onClick={() => setSelectedMaterial('all')}><X className="w-3 h-3 text-[#A8A39D]" /></button>
                  </span>
                )}
                {maxPrice < 265000 && (
                  <span className="inline-flex items-center space-x-1 bg-white border border-[#E8E2D9] px-2.5 py-1 rounded-full text-xs text-[#1E1B18]">
                    <span>Under {formatPKR(maxPrice)}</span>
                    <button onClick={() => setMaxPrice(265000)}><X className="w-3 h-3 text-[#A8A39D]" /></button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#8B5A2B] hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Count Notification */}
            <div className="flex items-center justify-between text-xs text-[#7A7570]">
              <span>Showing {filteredProducts.length} handcrafted pieces</span>
              <span>Nationwide White-Glove Shipping</span>
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E8E2D9] space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#1E1B18]">
                  No furniture pieces match your filter
                </h3>
                <p className="text-xs md:text-sm text-[#7A7570] max-w-sm mx-auto">
                  Try widening your price range or resetting materials to see all available pieces.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center space-x-2 bg-[#181513] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-subtle"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 z-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <h3 className="font-serif text-xl font-bold text-[#1E1B18]">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#7A7570]" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-2">Category</h4>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCategory(c.id); setMobileFilterOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                        selectedCategory === c.id ? 'bg-[#181513] text-white font-bold' : 'text-[#7A7570]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-2">
                  Max Price: {formatPKR(maxPrice)}
                </h4>
                <input
                  type="range"
                  min="35000"
                  max="265000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#B08D57]"
                />
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-[#181513] text-white py-3 rounded-lg text-xs font-bold shadow-subtle"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
