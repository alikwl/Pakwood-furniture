import React from 'react';
import { Home, Grid, Search, Heart, MessageCircle } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { getWhatsAppLink, PAKWOOD_PHONE } from '../utils/whatsapp';

export default function MobileBottomBar() {
  const { wishlist, setIsDrawerOpen, setIsSearchOpen } = useWishlist();

  return (
    <aside aria-label="Quick Actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D9] px-3 py-2 flex items-center justify-around shadow-modal">
      <a
        href="#/"
        className="flex flex-col items-center justify-center text-[#7A7570] hover:text-[#B08D57] transition-colors py-1 px-2"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Home</span>
      </a>

      <a
        href="#/collections"
        className="flex flex-col items-center justify-center text-[#7A7570] hover:text-[#B08D57] transition-colors py-1 px-2"
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Catalog</span>
      </a>

      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center justify-center text-[#7A7570] hover:text-[#B08D57] transition-colors py-1 px-2"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Search</span>
      </button>

      <button
        onClick={() => setIsDrawerOpen(true)}
        className="flex flex-col items-center justify-center text-[#7A7570] hover:text-[#B08D57] transition-colors py-1 px-2 relative"
        aria-label="Wishlist"
      >
        <Heart className="w-5 h-5" />
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-[#B08D57] text-white text-[9px] font-bold flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
        <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
      </button>

      <a
        href={getWhatsAppLink({ type: 'inquiry' })}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center text-[#25D366] font-semibold py-1 px-2"
      >
        <MessageCircle className="w-5 h-5 fill-[#25D366]" />
        <span className="text-[10px] mt-0.5">WhatsApp</span>
      </a>
    </aside>
  );
}
