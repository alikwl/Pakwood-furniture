import React from 'react';
import { Star, ShieldCheck, MapPin, Quote } from 'lucide-react';
import reviewsData from '../data/reviews.json';

export default function ReviewsMarquee() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E8E2D9]">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Patron Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1B18] tracking-tight">
            Trusted by Homes Across Pakistan
          </h2>
          <p className="text-sm md:text-base text-[#7A7570] font-light">
            Read authentic reviews from homeowners, doctors, lawyers, and interior architects across Pakistan.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 md:p-7 border border-[#E8E2D9] shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Stars and City */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B08D57] text-[#B08D57]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#8B5A2B] bg-white px-2.5 py-1 rounded-full border border-[#E8E2D9]">
                    <MapPin className="w-3 h-3 text-[#B08D57]" />
                    <span>{review.city}</span>
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs md:text-sm text-[#1E1B18]/85 font-light leading-relaxed italic">
                  "{review.comment}"
                </p>

              </div>

              {/* Author & Product */}
              <div className="mt-6 pt-4 border-t border-[#E8E2D9]/70 flex items-center justify-between">
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-[#1E1B18]">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-[#7A7570] truncate max-w-[200px]">
                    {review.product}
                  </p>
                </div>
                <span className="text-[10px] text-[#A8A39D]">
                  {review.date}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
