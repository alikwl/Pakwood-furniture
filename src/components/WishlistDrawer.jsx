import React, { useEffect } from 'react';
import { X, Trash2, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { formatPKR, getWhatsAppLink, PAKWOOD_PHONE } from '../utils/whatsapp';

export default function WishlistDrawer() {
  const { wishlist, removeFromWishlist, isDrawerOpen, setIsDrawerOpen, clearWishlist } = useWishlist();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const totalValue = wishlist.reduce((acc, p) => acc + (p.price || 0), 0);

  const waWishlistUrl = getWhatsAppLink({
    type: 'wishlist',
    wishlistItems: wishlist
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8E2D9]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D9] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-[#B08D57] fill-[#B08D57]" />
            <h3 className="font-serif text-xl font-bold text-[#1E1B18]">
              Saved Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 text-[#7A7570] hover:text-[#1E1B18] rounded-md transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EAE5DC] mx-auto flex items-center justify-center text-[#7A7570]">
                <Heart className="w-7 h-7 text-[#A8A39D]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1E1B18]">
                Your wishlist is empty
              </h4>
              <p className="text-xs text-[#7A7570] max-w-xs mx-auto">
                Explore our handcrafted sofas, bed sets, and accent chairs and click the heart icon to save your favorites.
              </p>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="inline-flex items-center space-x-2 bg-[#181513] text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-subtle hover:bg-[#B08D57] transition-all"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3.5 border border-[#E8E2D9] shadow-xs flex items-center space-x-3.5"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg bg-[#EAE5DC] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <a
                    href={`#/product/${item.slug}`}
                    onClick={() => setIsDrawerOpen(false)}
                    className="block text-xs font-bold text-[#1E1B18] hover:text-[#B08D57] transition-colors truncate"
                  >
                    {item.title}
                  </a>
                  <p className="text-[11px] text-[#8B5A2B] font-semibold mt-0.5">
                    {formatPKR(item.price)}
                  </p>
                  <p className="text-[10px] text-[#A8A39D]">
                    SKU: {item.id}
                  </p>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-2 text-[#A8A39D] hover:text-red-600 transition-colors"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Total and WhatsApp Action */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-[#E8E2D9] bg-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7A7570] font-medium">Estimated Catalog Total:</span>
              <span className="text-lg font-serif font-bold text-[#1E1B18] tabular-nums">
                {formatPKR(totalValue)}
              </span>
            </div>

            <a
              href={waWishlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center space-x-2 shadow-subtle hover:shadow-elevated transition-all btn-press"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Inquire All on WhatsApp ({PAKWOOD_PHONE})</span>
            </a>

            <div className="flex items-center justify-between text-[11px] text-[#7A7570] pt-1">
              <span>Saved in your browser</span>
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:underline"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
