import React from 'react';
import { Palette, FileCheck2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ThreeStepProcess() {
  const steps = [
    {
      number: "01",
      icon: Palette,
      title: "Choose or Customize Your Piece",
      description: "Select any design from our catalog or share your room floor plan, desired dimensions, and reference Pinterest/Instagram inspirations via WhatsApp."
    },
    {
      number: "02",
      icon: FileCheck2,
      title: "Confirm Specs & Finish in Writing",
      description: "We confirm exact dimensions (L x W x H), timber selection (Solid Sheesham or Kikar), and courier physical fabric swatch cards to your doorstep before taking a 70% advance deposit."
    },
    {
      number: "03",
      icon: Truck,
      title: "Multan Handcrafting & Safe Delivery",
      description: "Our artisans build your piece in 10-14 working days. You receive HD video inspection walk-throughs prior to final dispatch with white-glove assembly across Pakistan."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            Transparent Ordering Process
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1B18] tracking-tight">
            How Custom Ordering Works
          </h2>
          <p className="text-sm md:text-base text-[#7A7570] font-light">
            From initial sketch to your drawing room — every milestone is recorded and verified with full transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-7 md:p-8 border border-[#E8E2D9] shadow-subtle flex flex-col justify-between"
              >
                {/* Large Subtle Step Number in background */}
                <span className="absolute top-4 right-5 text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] select-none pointer-events-none">
                  {step.number}
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#8B5A2B]">
                    <Icon className="w-6 h-6 text-[#B08D57]" />
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1E1B18]">
                    {step.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[#7A7570] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E2D9]/60 flex items-center text-xs font-semibold text-[#8B5A2B]">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
