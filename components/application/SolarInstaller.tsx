import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Sun, Shield, Users, Award, ClipboardCheck, Battery, Zap, LineChart } from 'lucide-react';

const SolarInstaller = () => {
  const features = [
    {
      icon: <Sun className="w-12 h-12" />,
      title: "Professional Solar Installation",
      description: "Specialized in Solar PV installation and battery storage solutions. We handle everything from design to commissioning, ensuring maximum energy output for your property.",
      link: "/solar-installation",
      color: "bg-gradient-to-br from-yellow-100 to-orange-100",
      iconColor: "text-yellow-500",
      className: "md:col-span-2 lg:col-span-2"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Local Independent Team",
      description: "As a small local team of three, we provide dedicated personal attention to every project. We believe in doing everything in-house to ensure the highest quality service.",
      link: "/about-us",
      color: "bg-gradient-to-br from-blue-50 to-indigo-100",
      iconColor: "text-blue-500"
    },
    {
      icon: <Battery className="w-10 h-10" />,
      title: "Battery Storage Solutions",
      description: "Maximize your solar investment with our battery storage solutions, allowing you to store excess energy for use when you need it most.",
      link: "/battery-storage",
      color: "bg-gradient-to-br from-green-50 to-emerald-100",
      iconColor: "text-green-500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Quality Assured",
      description: "MCS approved installers and RECC members, ensuring the highest standards. Fully insured with £5,000,000 public liability coverage through AXA Marsh Commercial.",
      link: "/certifications",
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-500",
      className: "md:col-span-2 lg:col-span-1"
    },
    {
      icon: <LineChart className="w-12 h-12" />,
      title: "Save Money & Energy",
      description: "Reduce both your carbon footprint and electricity bills. Every system comes with a minimum two-year insurance guarantee after commissioning.",
      link: "/benefits",
      color: "bg-gradient-to-br from-teal-50 to-teal-100",
      iconColor: "text-teal-500",
      className: "lg:col-span-2"
    },
    {
      icon: <ClipboardCheck className="w-10 h-10" />,
      title: "Expert System Design",
      description: "We conduct personal site visits and use advanced software systems to design your Solar PV system thoughtfully, providing free written estimates for 25-year energy yield.",
      link: "/design-process",
      color: "bg-gradient-to-br from-red-50 to-red-100",
      iconColor: "text-red-500"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Premium Equipment",
      description: "We choose only the best equipment for your installation, ensuring long-term reliability and optimal performance of your solar power system.",
      link: "/equipment",
      color: "bg-gradient-to-br from-pink-50 to-rose-100",
      iconColor: "text-pink-500"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Complete Solar Solutions",
      description: "From initial consultation to final handover, we provide end-to-end service with optional roofing and scaffolding arrangements when needed.",
      link: "/services",
      color: "bg-gradient-to-br from-amber-50 to-amber-100",
      iconColor: "text-amber-500",
      className: "md:col-span-2 lg:col-span-2"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Solar Power Solutions</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sun className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-semibold text-gray-600">APN Elec Solar</span>
          </div>
          <p className="text-xl text-gray-600">
            Your local, independent solar installation experts. Reduce your carbon footprint and save money with APN Elec&apos;s professional solar PV installation services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-all duration-300 ${feature.className || ''}`}
            >
              <CardBody className={`text-center p-8 ${feature.color}`}>
                <div className={`mb-6 ${feature.iconColor} flex justify-center transform hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
              </CardBody>
              <CardFooter className="justify-center pb-6">
                <Button 
                  color="primary"
                  variant="ghost"
                  href={feature.link}
                  className="font-semibold"
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolarInstaller;
