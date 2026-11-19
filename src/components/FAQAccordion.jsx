import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import faqsData from '../data/faqs.json';
import { PAKWOOD_PHONE, getWhatsAppLink } from '../utils/whatsapp';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <div className="text-center space-y-3 mb-10 md:mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Answered Questions</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1B18] tracking-tight">
            Clear Answers & Order Confidence
          </h2>
          <p className="text-sm md:text-base text-[#7A7570] font-light">
            Everything you need to know about our Multani workshop, payment schedules, and nationwide delivery.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#E8E2D9] overflow-hidden transition-all shadow-subtle"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between text-base md:text-lg font-semibold text-[#1E1B18] hover:text-[#B08D57] transition-colors focus:outline-none"
                >
                  <span className="font-serif pr-4 leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B08D57] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 md:px-6 md:pb-6 text-xs md:text-sm text-[#7A7570] font-light leading-relaxed border-t border-[#FAF8F5]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra question helper CTA */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#1E1B18]">
              Have a specific floor plan or question?
            </h4>
            <p className="text-xs text-[#7A7570] mt-0.5">
              Speak directly with our Multan workshop master on WhatsApp.
            </p>
          </div>
          <a
            href={getWhatsAppLink({ type: 'inquiry' })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full shadow-subtle btn-press flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Us ({PAKWOOD_PHONE})</span>
          </a>
        </div>

      </div>
    </section>
  );
}
