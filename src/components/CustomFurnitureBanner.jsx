import React, { useState } from 'react';
import { Ruler, Sparkles, MessageCircle, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import { PAKWOOD_PHONE, getWhatsAppLink } from '../utils/whatsapp';

export default function CustomFurnitureBanner() {
  const [roomType, setRoomType] = useState('Living Room');
  const [lengthFt, setLengthFt] = useState('16');
  const [widthFt, setWidthFt] = useState('14');
  const [woodType, setWoodType] = useState('Seasoned Multani Sheesham (Rosewood)');
  const [upholstery, setUpholstery] = useState('Turkish Stain-Resistant Velvet');
  const [customNotes, setCustomNotes] = useState('');

  const handleCustomQuote = (e) => {
    e.preventDefault();
    const dimensions = `${lengthFt} ft x ${widthFt} ft`;
    const waUrl = getWhatsAppLink({
      type: 'custom',
      roomType,
      dimensions,
      woodType,
      upholstery,
      customNotes
    });
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 md:py-24 bg-[#181513] text-white relative overflow-hidden">
      
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/images/banners/banner-custom-workshop.webp"
          alt="Pakwood Multan Furniture Workshop"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181513] via-[#181513]/90 to-[#181513]/80" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E5C383] text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Tailored Architectural Proportions</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Custom Furniture Starts With Your Space
            </h2>

            <p className="text-[#ECE7DD]/80 text-sm md:text-base font-light leading-relaxed">
              Standard showroom dimensions rarely fit real Pakistani homes perfectly. Our Multan master craftsmen tailor every inch — from sectional L-corners aligned with your bay window to bed heights customized for senior family comfort.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs md:text-sm text-[#FAF8F5]/90">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <span>Complimentary 2D/3D layout sizing assistance via WhatsApp</span>
              </div>
              <div className="flex items-start space-x-3 text-xs md:text-sm text-[#FAF8F5]/90">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <span>Physical fabric swatch parcels courier-delivered to your door</span>
              </div>
              <div className="flex items-start space-x-3 text-xs md:text-sm text-[#FAF8F5]/90">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <span>Live WhatsApp video progress updates directly from our Multan workshop</span>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4 text-xs text-[#E5C383]">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                <span className="font-medium">10-Year Timber Warranty</span>
              </div>
              <span className="text-white/30">•</span>
              <span>Direct Multan Workshop Pricing</span>
            </div>

          </div>

          {/* Right Column: Interactive Room Dimension & Finish Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] text-[#1E1B18] rounded-2xl p-6 sm:p-8 md:p-10 shadow-modal border border-[#E8E2D9]">
              
              <div className="mb-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B18]">
                  Configure Your Bespoke Quote
                </h3>
                <p className="text-xs md:text-sm text-[#7A7570] mt-1">
                  Input your room dimensions and preferred materials for an instant WhatsApp estimate.
                </p>
              </div>

              <form onSubmit={handleCustomQuote} className="space-y-5">
                
                {/* Space Type Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-2">
                    1. Select Room / Space
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Living Room', 'Master Bedroom', 'Dining Hall', 'Executive Office', 'Drawing Room', 'Other / Outdoor'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setRoomType(type)}
                        className={`text-xs py-2 px-3 rounded-lg border text-center transition-all font-medium ${
                          roomType === type
                            ? 'bg-[#181513] text-white border-[#181513] shadow-sm'
                            : 'bg-white text-[#1E1B18] border-[#E8E2D9] hover:border-[#B08D57]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimensions (Length x Width) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-2 flex items-center justify-between">
                    <span>2. Approximate Room Dimensions</span>
                    <span className="text-[11px] text-[#8B5A2B] font-normal lowercase">feet (ft)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-[#7A7570] block mb-1">Length</span>
                      <input
                        type="number"
                        min="8"
                        max="60"
                        value={lengthFt}
                        onChange={(e) => setLengthFt(e.target.value)}
                        className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3.5 py-2.5 text-sm font-semibold text-[#1E1B18] focus:outline-none focus:border-[#B08D57]"
                        placeholder="16"
                        required
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#7A7570] block mb-1">Width</span>
                      <input
                        type="number"
                        min="8"
                        max="60"
                        value={widthFt}
                        onChange={(e) => setWidthFt(e.target.value)}
                        className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3.5 py-2.5 text-sm font-semibold text-[#1E1B18] focus:outline-none focus:border-[#B08D57]"
                        placeholder="14"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Timber & Finish Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                      3. Preferred Timber
                    </label>
                    <select
                      value={woodType}
                      onChange={(e) => setWoodType(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#1E1B18] focus:outline-none focus:border-[#B08D57]"
                    >
                      <option value="Seasoned Multani Sheesham (Rosewood)">Seasoned Multani Sheesham (Rosewood)</option>
                      <option value="Kiln-Dried Solid Kikar Hardwood">Kiln-Dried Solid Kikar Hardwood</option>
                      <option value="Imported Ash Wood & Veneer">Imported Ash Wood & Veneer</option>
                      <option value="Solid Walnut Polish on Hardwood">Solid Walnut Polish on Hardwood</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                      4. Fabric / Upholstery
                    </label>
                    <select
                      value={upholstery}
                      onChange={(e) => setUpholstery(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D9] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#1E1B18] focus:outline-none focus:border-[#B08D57]"
                    >
                      <option value="Turkish Stain-Resistant Velvet">Turkish Stain-Resistant Velvet</option>
                      <option value="Heavyweight Belgian Bouclé">Heavyweight Belgian Bouclé</option>
                      <option value="Italian Saddle Waxed Leatherite">Italian Saddle Waxed Leatherite</option>
                      <option value="Textured Linen-Cotton Weave">Textured Linen-Cotton Weave</option>
                      <option value="Pure Wood (No Upholstery)">Pure Wood (No Upholstery)</option>
                    </select>
                  </div>
                </div>

                {/* Custom Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                    5. Special Requirements / Desired Pieces (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g. Need L-shaped sectional facing left with 2 matching velvet armchairs and low-profile coffee table."
                    className="w-full bg-white border border-[#E8E2D9] rounded-lg p-3 text-xs text-[#1E1B18] focus:outline-none focus:border-[#B08D57] resize-none"
                  />
                </div>

                {/* Submit to WhatsApp */}
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center space-x-2.5 shadow-subtle hover:shadow-elevated transition-all btn-press"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send Configuration to WhatsApp ({PAKWOOD_PHONE})</span>
                </button>

                <p className="text-[11px] text-center text-[#7A7570]">
                  Immediate artisan consultation • No commitment required • Nationwide delivery
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
