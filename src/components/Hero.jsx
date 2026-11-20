import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Truck, Sparkles, Award } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#181513] text-white">
      {/* Background Hero Image with Deep Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/banners/hero-living-room.webp"
          alt="Pakwood Luxury Living Room in Pakistan"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        {/* Editorial Vignette & Warm Tint Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181513] via-[#181513]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181513]/90 via-[#181513]/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-28 lg:py-36 flex flex-col justify-center min-h-[560px] md:min-h-[660px]">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          
          {/* Heritage Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E5C383] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Multan's Premier Furniture Atelier • Est. 1988</span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Premium Furniture In Pakistan For Homes & Offices
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#ECE7DD]/90 font-light leading-relaxed max-w-2xl">
            Bespoke living suites, master bedroom sets, and executive workstations handcrafted from seasoned Multani Sheesham and solid kiln-dried timbers. Delivered nationwide with lifetime structural integrity.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            
            {/* Explore Collection Button */}
            <a
              href="/collections"
              className="inline-flex items-center justify-center space-x-2.5 bg-[#FAF8F5] text-[#181513] hover:bg-[#E5C383] px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all shadow-elevated btn-press"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* WhatsApp Custom Quote Button */}
            <a
              href={getWhatsAppLink({ type: 'custom' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all shadow-elevated btn-press"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Custom Quote</span>
            </a>
          </div>

          {/* Trust Value Badges Grid */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#FAF8F5]/85">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
              <span>10-Year Timber Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
              <span>Nationwide Safe Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
              <span>Seasoned Multani Sheesham</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
              <span>Custom Proportions & Fabrics</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
