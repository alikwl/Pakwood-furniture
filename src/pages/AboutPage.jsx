import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { PAKWOOD_PHONE, getWhatsAppLink } from '../utils/whatsapp';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 md:py-14 space-y-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-[#7A7570] mb-6">
          <a href="#/" className="hover:text-[#B08D57] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#1E1B18] font-medium">Our Multan Heritage</span>
        </div>

        {/* Editorial Hero */}
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-[#E8E2D9] shadow-subtle mb-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B08D57]">
              The City of Saints & Timeless Woodcraft
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B18] tracking-tight leading-tight">
              Three Decades of Multani Joinery Excellence
            </h1>
            <p className="text-xs md:text-sm text-[#7A7570] font-light leading-relaxed">
              Founded in 1988 near the historical Hussain Agahi timber markets of Multan, Pakwood Furniture was born from a fundamental belief: furniture is not disposable decor, but an architectural heirloom passed down through generations.
            </p>
            <p className="text-xs md:text-sm text-[#7A7570] font-light leading-relaxed">
              While mass-market retailers shifted to hollow MDF and laminated particleboards that swell and disintegrate in Pakistani humidity, Pakwood remains fiercely dedicated to 100% seasoned solid timber, traditional mortise-and-tenon craftsmanship, and hand-rubbed organic finishes.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-square bg-[#EAE5DC] border border-[#E8E2D9]">
            <img
              src="./images/banners/banner-custom-workshop.webp"
              alt="Pakwood Multan Craftsman"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* 3 Pillars of Quality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-7 border border-[#E8E2D9] shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#B08D57]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E1B18]">
              Seasoned Multani Sheesham
            </h3>
            <p className="text-xs text-[#7A7570] font-light leading-relaxed">
              We hand-select mature Dalbergia sissoo rosewood timbers. Kiln-dried to an exact 8-10% moisture content in scientific dry-chambers, eliminating warping, cracks, and moisture decay.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-[#E8E2D9] shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#B08D57]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E1B18]">
              Master MoltyFoam 10-Yr Cores
            </h3>
            <p className="text-xs text-[#7A7570] font-light leading-relaxed">
              We exclusively use high-resilience 32-density Master MoltyFoam and Supreme Ortho cores wrapped in Dacron down-blend fiber for zero seat sagging over 10+ years of daily use.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-[#E8E2D9] shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#B08D57]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E1B18]">
              Direct Workshop Pricing
            </h3>
            <p className="text-xs text-[#7A7570] font-light leading-relaxed">
              By crafting directly in Multan and shipping straight to your residence, you avoid expensive high-street mall markups while gaining total customization over dimensions and fabrics.
            </p>
          </div>
        </div>

        {/* Visit Showroom Box */}
        <div className="bg-[#181513] text-white rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto space-y-4">
          <MapPin className="w-8 h-8 text-[#B08D57] mx-auto" />
          <h3 className="font-serif text-2xl md:text-3xl font-bold">
            Visit Our Multan Workshop & Gallery
          </h3>
          <p className="text-xs md:text-sm text-[#ECE7DD]/80 max-w-lg mx-auto">
            Hussain Agahi Market, Multan, Punjab, Pakistan. Open Monday through Saturday, 10:00 AM – 8:00 PM. We invite you to inspect our timbers in person.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${PAKWOOD_PHONE}`}
              className="inline-block bg-[#FAF8F5] text-[#1E1B18] hover:bg-[#E5C383] px-6 py-3 rounded-full text-xs font-bold transition-all shadow-subtle"
            >
              Call for Workshop Direction: {PAKWOOD_PHONE}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
