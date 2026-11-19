import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Star, ShieldCheck, Truck, Clock, Ruler, Sparkles, Check, Share2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import productsData from '../data/products.json';
import { formatPKR, getWhatsAppLink, PAKWOOD_PHONE } from '../utils/whatsapp';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage({ slug }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  // Find product by slug
  const product = productsData.find((p) => p.slug === slug) || productsData[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    if (product.swatches && product.swatches.length > 0) {
      setSelectedSwatch(product.swatches[0].name);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, product]);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const images = product.images || [];

  // 70% advance, 30% on dispatch breakdown
  const advanceDeposit = Math.round(product.price * 0.70);
  const finalDispatchBalance = product.price - advanceDeposit;

  // Related products from same category
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} at Pakwood Furniture Multan`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.images?.map(img => `https://pakwoodfurniture.store/${img}`),
    "description": product.shortDescription,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Pakwood Furniture"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://pakwoodfurniture.store/#/product/${product.slug}`,
      "priceCurrency": "PKR",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Pakwood Furniture"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 md:py-14">
      {/* Product JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Breadcrumb & Back Link */}
        <div className="flex items-center justify-between text-xs text-[#7A7570] mb-6">
          <div className="flex items-center space-x-2">
            <a href="#/" className="hover:text-[#B08D57] transition-colors">Home</a>
            <span>/</span>
            <a href={`#/collections?category=${product.category}`} className="hover:text-[#B08D57] transition-colors capitalize">
              {product.category}
            </a>
            <span>/</span>
            <span className="text-[#1E1B18] font-medium truncate max-w-[200px] md:max-w-none">
              {product.title}
            </span>
          </div>

          <a
            href="#/collections"
            className="inline-flex items-center space-x-1 text-[#8B5A2B] hover:text-[#5C4033] font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </a>
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 border border-[#E8E2D9] shadow-subtle mb-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Gallery Column (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Primary Large Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F2EC] border border-[#E8E2D9] group">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={product.title}
                  width="700"
                  height="700"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
                  {product.isBestSeller && (
                    <span className="bg-[#181513] text-[#E5C383] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                      Bestseller
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#B08D57] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                      New Release
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#B08D57] shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Angle ${idx + 1}`} width="80" height="80" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Multan Workshop Guarantee Box */}
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E2D9] space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
                  <Sparkles className="w-4 h-4 text-[#B08D57]" />
                  <span>Multan Workshop Authenticity</span>
                </div>
                <p className="text-xs text-[#7A7570] leading-relaxed">
                  Every structural angle is precision mortise-and-tenon interlocked in our Multan workshop. Kiln-dried seasoned timber eliminates seasonal warping and Pakistani summer cracking.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#1E1B18] pt-1">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span className="font-medium">10-Yr Wood Warranty</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span className="font-medium">10-14 Day Lead Time</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Product Info Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-widest font-bold text-[#8B5A2B]">
                    {product.subcategory || product.category}
                  </span>
                  <span className="text-[#A8A39D] font-mono">
                    SKU: {product.id}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B18] tracking-tight leading-tight">
                  {product.title}
                </h1>

                {/* Ratings */}
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B08D57] text-[#B08D57]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1E1B18]">{product.rating}</span>
                  <span className="text-[#7A7570]">({product.reviewCount} verified Pakistani reviews)</span>
                </div>

                {/* Price */}
                <div className="py-2 border-y border-[#E8E2D9] flex items-baseline space-x-4">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-[#1E1B18] tabular-nums">
                    {formatPKR(product.price)}
                  </span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <>
                      <span className="text-base text-[#A8A39D] line-through tabular-nums">
                        {formatPKR(product.compareAtPrice)}
                      </span>
                      <span className="bg-[#8B5A2B]/10 text-[#8B5A2B] text-xs font-bold px-2 py-0.5 rounded">
                        Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Full Description */}
                <p className="text-xs md:text-sm text-[#7A7570] font-light leading-relaxed">
                  {product.fullDescription}
                </p>

                {/* Swatches / Finishes */}
                {product.swatches && product.swatches.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-wider text-[#1E1B18]">
                        Selected Finish:
                      </span>
                      <span className="font-semibold text-[#8B5A2B]">{selectedSwatch}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {product.swatches.map((swatch, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSwatch(swatch.name)}
                          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs transition-all ${
                            selectedSwatch === swatch.name
                              ? 'border-[#B08D57] bg-[#FAF8F5] font-bold text-[#1E1B18] ring-1 ring-[#B08D57]'
                              : 'border-[#E8E2D9] text-[#7A7570] hover:border-[#B08D57] bg-white'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span>{swatch.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Dimensions & Specifications Table */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-2 flex items-center space-x-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>Exact Dimensions & Craftsmanship</span>
                  </h4>
                  <div className="bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] overflow-hidden text-xs">
                    <div className="grid grid-cols-2 p-3 border-b border-[#E8E2D9]">
                      <span className="text-[#7A7570]">Dimensions:</span>
                      <span className="font-semibold text-[#1E1B18]">
                        {product.dimensions?.length}" L × {product.dimensions?.depth}" D × {product.dimensions?.height}" H
                      </span>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b border-[#E8E2D9]">
                      <span className="text-[#7A7570]">Timber Frame:</span>
                      <span className="font-semibold text-[#1E1B18]">{product.materials?.woodFrame}</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b border-[#E8E2D9]">
                      <span className="text-[#7A7570]">Upholstery Grade:</span>
                      <span className="font-semibold text-[#1E1B18]">{product.materials?.upholstery}</span>
                    </div>
                    <div className="grid grid-cols-2 p-3">
                      <span className="text-[#7A7570]">Cushion Foam:</span>
                      <span className="font-semibold text-[#1E1B18]">{product.materials?.cushioning}</span>
                    </div>
                  </div>
                </div>

                {/* Advance Deposit Breakdown Box */}
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#B08D57]/30 text-xs space-y-1.5">
                  <span className="font-bold text-[#8B5A2B] uppercase tracking-wider text-[11px] block">
                    Transparent Payment Schedule
                  </span>
                  <div className="flex justify-between text-[#1E1B18]">
                    <span>70% Advance Production Deposit:</span>
                    <strong className="tabular-nums font-serif text-sm">{formatPKR(advanceDeposit)}</strong>
                  </div>
                  <div className="flex justify-between text-[#7A7570]">
                    <span>30% Balance Prior to Dispatch (Video Inspection):</span>
                    <span className="tabular-nums">{formatPKR(finalDispatchBalance)}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <a
                  href={getWhatsAppLink({
                    type: 'product',
                    product,
                    selectedSwatch
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center space-x-2.5 shadow-subtle hover:shadow-elevated transition-all btn-press"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Inquire / Order on WhatsApp ({PAKWOOD_PHONE})</span>
                </a>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`flex-1 py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      isSaved
                        ? 'border-[#B08D57] bg-[#B08D57]/10 text-[#8B5A2B]'
                        : 'border-[#E8E2D9] bg-white text-[#1E1B18] hover:border-[#B08D57]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#8B5A2B]' : ''}`} />
                    <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex-1 py-3 px-4 rounded-xl border border-[#E8E2D9] bg-white text-[#1E1B18] hover:border-[#1E1B18] text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedLink ? 'Link Copied!' : 'Share Piece'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#E8E2D9] mb-16 shadow-subtle">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B18] mb-6">
            Distinctive Craftsmanship Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features?.map((feat, i) => (
              <div key={i} className="flex items-start space-x-3 text-xs md:text-sm text-[#1E1B18]/85">
                <Check className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B18]">
                Complementary Pieces in {product.category}
              </h3>
              <a
                href={`#/collections?category=${product.category}`}
                className="text-xs font-semibold text-[#8B5A2B] hover:underline"
              >
                View all {product.category} →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
