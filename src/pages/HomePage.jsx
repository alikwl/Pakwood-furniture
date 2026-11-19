import React from 'react';
import Hero from '../components/Hero';
import RoomCarousel from '../components/RoomCarousel';
import CuratedGrids from '../components/CuratedGrids';
import CustomFurnitureBanner from '../components/CustomFurnitureBanner';
import ThreeStepProcess from '../components/ThreeStepProcess';
import ReviewsMarquee from '../components/ReviewsMarquee';
import FAQAccordion from '../components/FAQAccordion';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <RoomCarousel />
      <CuratedGrids />
      <CustomFurnitureBanner />
      <ThreeStepProcess />
      <ReviewsMarquee />
      <FAQAccordion />
    </div>
  );
}
