"use client"
import HeroSlider from '@/components/application/HeroSlider';
import Navbar from '@/components/application/Navbar';
import ServicesSection from '@/components/application/ServicesSection';
import TestimonialsSection from '@/components/application/TestimonialsSection';

export default function Home() {
  return (
  <>
  <Navbar />
    <div className='relative -mt-24'>
      <HeroSlider />
      <ServicesSection />
      <TestimonialsSection />
    </div>
  </>
  );
}