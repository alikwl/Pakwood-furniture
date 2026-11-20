import React, { useState } from 'react';
import { Compass, Ruler, Sparkles, MessageCircle, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { PAKWOOD_PHONE, getWhatsAppLink } from '../utils/whatsapp';
import CustomFurnitureBanner from '../components/CustomFurnitureBanner';
import ThreeStepProcess from '../components/ThreeStepProcess';

export default function CustomOrderPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 md:py-14 space-y-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-[#7A7570] mb-6">
          <a href="/" className="hover:text-[#B08D57] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#1E1B18] font-medium">Custom Furniture Studio</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#181513] text-white rounded-3xl p-8 md:p-14 border border-[#2C2623] relative overflow-hidden shadow-elevated mb-12">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block text-xs uppercase font-bold tracking-widest text-[#E5C383] bg-white/10 px-3 py-1 rounded-full">
              Bespoke Multan Workshop
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Custom Furniture Tailored to Your Floor Plan
            </h1>
            <p className="text-xs md:text-sm text-[#ECE7DD]/80 font-light leading-relaxed">
              Whether you need an oversized 8-seater dining table made from a single Sheesham log or a modular curved sectional built for an asymmetric drawing room, our Multan master carpenters bring your vision to life.
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Builder */}
      <CustomFurnitureBanner />

      {/* Process Walkthrough */}
      <ThreeStepProcess />

      {/* WhatsApp Direct Help Box */}
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="bg-white rounded-2xl p-8 border border-[#E8E2D9] text-center max-w-2xl mx-auto space-y-4 shadow-subtle">
          <h3 className="font-serif text-2xl font-bold text-[#1E1B18]">
            Have an Architect Blueprint or Pinterest Inspiration?
          </h3>
          <p className="text-xs md:text-sm text-[#7A7570]">
            Send your floor plan, reference photos, or room video directly to our Multan workshop master on WhatsApp. We provide estimated wood requirements and pricing within 2 hours.
          </p>
          <a
            href={getWhatsAppLink({ type: 'custom' })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#25D366] text-white font-bold text-xs md:text-sm px-6 py-3 rounded-full shadow-subtle hover:bg-[#1EBE5D] transition-all btn-press"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send Floor Plan on WhatsApp ({PAKWOOD_PHONE})</span>
          </a>
        </div>
      </div>

    </div>
  );
}
