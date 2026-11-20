import React, { useState, useEffect } from 'react';
import { X, Star, ShieldCheck, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { formatPKR, getWhatsAppLink, PAKWOOD_PHONE } from '../utils/whatsapp';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, isInWishlist, toggleWishlist } = useWishlist();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState('');

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedSwatch(quickViewProduct.swatches?.[0]?.name || '');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);
  const images = quickViewProduct.images || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-modal border border-[#E8E2D9] overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#1E1B18] hover:bg-white hover:text-[#B08D57] flex items-center justify-center shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery */}
        <div className="md:w-1/2 bg-[#F5F2EC] p-4 flex flex-col justify-between">
          <div className="aspect-square rounded-xl overflow-hidden bg-white border border-[#E8E2D9]">
            <img
              src={images[activeImageIndex] || images[0]}
              alt={quickViewProduct.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex space-x-2 pt-3 overflow-x-auto no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-[#B08D57]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          
          <div className="space-y-4">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#8B5A2B]">
                {quickViewProduct.subcategory || quickViewProduct.category} • SKU: {quickViewProduct.id}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B18] mt-1 leading-snug">
                {quickViewProduct.title}
              </h3>

              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B08D57] text-[#B08D57]" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#1E1B18]">{quickViewProduct.rating}</span>
                <span className="text-xs text-[#7A7570]">({quickViewProduct.reviewCount} Multan verified reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B18] tabular-nums">
                {formatPKR(quickViewProduct.price)}
              </span>
              {quickViewProduct.compareAtPrice && quickViewProduct.compareAtPrice > quickViewProduct.price && (
                <span className="text-sm text-[#A8A39D] line-through tabular-nums">
                  {formatPKR(quickViewProduct.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs md:text-sm text-[#7A7570] font-light leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Swatch Selector */}
            {quickViewProduct.swatches && quickViewProduct.swatches.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-2">
                  Select Finish / Upholstery: <span className="font-normal text-[#8B5A2B]">{selectedSwatch}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.swatches.map((swatch, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSwatch(swatch.name)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                        selectedSwatch === swatch.name
                          ? 'border-[#B08D57] bg-[#FAF8F5] font-semibold text-[#1E1B18]'
                          : 'border-[#E8E2D9] text-[#7A7570] hover:border-[#B08D57]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span>{swatch.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Dimensions Specs */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E2D9] text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#7A7570]">Dimensions:</span>
                <span className="font-semibold text-[#1E1B18]">
                  {quickViewProduct.dimensions?.length}"L × {quickViewProduct.dimensions?.depth}"D × {quickViewProduct.dimensions?.height}"H
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7570]">Wood Skeleton:</span>
                <span className="font-semibold text-[#1E1B18] text-right truncate max-w-[200px]">
                  {quickViewProduct.materials?.woodFrame?.split('&')[0]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7570]">Warranty:</span>
                <span className="font-semibold text-[#B08D57]">10-Year Timber Warranty</span>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-4 border-t border-[#E8E2D9] space-y-3">
            <a
              href={getWhatsAppLink({
                type: 'product',
                product: quickViewProduct,
                selectedSwatch
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-5 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center space-x-2.5 shadow-subtle hover:shadow-elevated transition-all btn-press"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order on WhatsApp ({PAKWOOD_PHONE})</span>
            </a>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-colors ${
                  isSaved
                    ? 'border-[#B08D57] bg-[#B08D57]/10 text-[#8B5A2B]'
                    : 'border-[#E8E2D9] text-[#1E1B18] hover:border-[#B08D57]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#8B5A2B]' : ''}`} />
                <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <a
                href={`/product/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#E8E2D9] text-[#1E1B18] hover:border-[#1E1B18] text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
