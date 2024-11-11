"use client"
import HeroSlider from '@/components/application/HeroSlider';
import Licences from '@/components/application/Licences';
import ServicesSection from '@/components/application/ServicesSection';
import SolarInstaller from '@/components/application/SolarInstaller';
import TestimonialsSection from '@/components/application/TestimonialsSection';

export default function Home() {
  return (
  <>
    <div className='relative -mt-24'>
      <HeroSlider />
      <SolarInstaller />
      <ServicesSection />
      <TestimonialsSection />
      <Licences />
    </div>
  </>
  );
}