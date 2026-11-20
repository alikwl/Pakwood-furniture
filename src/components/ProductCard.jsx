import React, { useState } from 'react';
import { Heart, Eye, MessageCircle, Star, ShieldCheck, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { formatPKR, getWhatsAppLink } from '../utils/whatsapp';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist, setQuickViewProduct } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const images = product.images || [];
  const primaryImg = images[0] || './images/banners/banner-sofas.webp';
  const secondaryImg = images[1] || primaryImg;

  // Calculate discount percentage
  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-[#E8E2D9] shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Box */}
      <div
        className="relative aspect-square overflow-hidden bg-[#F5F2EC] cursor-pointer"
        onMouseEnter={() => {
          if (images.length > 1) setCurrentImageIndex(1);
        }}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <a href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={currentImageIndex === 1 ? secondaryImg : primaryImg}
            alt={product.title}
            width="400"
            height="400"
            className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </a>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#181513] text-[#E5C383] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#B08D57] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
              New Arrival
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#8B5A2B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Action Icons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
          
          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
              isSaved
                ? 'bg-[#B08D57] text-white'
                : 'bg-white/90 backdrop-blur-sm text-[#1E1B18] hover:text-[#B08D57] hover:bg-white'
            }`}
            title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#1E1B18] hover:text-[#B08D57] hover:bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Subtle Material Badge at bottom of image */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="bg-white/85 backdrop-blur-md text-[10px] text-[#5C4033] font-medium px-2 py-0.5 rounded shadow-xs truncate max-w-[85%]">
            {product.materials?.woodFrame?.split('&')[0] || "Solid Seasoned Sheesham"}
          </span>
          {images.length > 1 && (
            <span className="text-[10px] text-white bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-xs">
              +{images.length}
            </span>
          )}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#7A7570]">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-[#8B5A2B]">
              {product.subcategory || product.category}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-[#B08D57] text-[#B08D57]" />
              <span className="font-semibold text-[#1E1B18]">{product.rating}</span>
              <span className="text-[#A8A39D]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <a
            href={`/product/${product.slug}`}
            className="block font-serif text-lg md:text-xl font-bold text-[#1E1B18] hover:text-[#B08D57] transition-colors leading-snug line-clamp-2"
          >
            {product.title}
          </a>

          {/* Pricing Row */}
          <div className="pt-1 flex items-baseline space-x-2">
            <span className="text-base md:text-lg font-bold text-[#1E1B18] tabular-nums">
              {formatPKR(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#A8A39D] line-through tabular-nums">
                {formatPKR(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Swatch Previews */}
          {product.swatches && product.swatches.length > 0 && (
            <div className="pt-1 flex items-center space-x-1.5">
              <span className="text-[11px] text-[#7A7570] mr-1">Finishes:</span>
              {product.swatches.slice(0, 4).map((swatch, i) => (
                <span
                  key={i}
                  className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-xs inline-block"
                  style={{ backgroundColor: swatch.hex }}
                  title={swatch.name}
                />
              ))}
              {product.swatches.length > 4 && (
                <span className="text-[10px] text-[#7A7570]">+{product.swatches.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* WhatsApp Direct Order Button */}
        <div className="pt-4 mt-3 border-t border-[#E8E2D9]/70 flex items-center space-x-2">
          <a
            href={getWhatsAppLink({ type: 'product', product })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-xs hover:shadow-subtle transition-all btn-press"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Order on WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  );
}
