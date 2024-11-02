"use client"
import HeroSlider from '@/components/application/HeroSlider';
import ServicesSection from '@/components/application/ServicesSection';
import TestimonialsSection from '@/components/application/TestimonialsSection';

export default function Home() {
  return (
  <>
    <div className='relative -mt-24'>
      <HeroSlider />
      <ServicesSection />
      <TestimonialsSection />
    </div>
  </>
  );
}