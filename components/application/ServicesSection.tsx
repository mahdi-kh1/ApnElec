import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Building2, Home, ClipboardCheck, Sun, Car } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Commercial",
      description: "As we introduce more technology and electrical appliances to the work place we need to make sure that they are safe and properly installed.",
      link: "/commercial"
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: "Domestic",
      description: "APN Elec can make sure your home is safe for yourself and your loved ones.",
      link: "/domestic"
    },
    {
      icon: <ClipboardCheck className="w-10 h-10" />,
      title: "Inspection & Testing",
      description: "APN Elec offers Inspection and Testing for all business, domestic and commercial accommodation. We prepare EICR Certificates for all qualifying properties.",
      link: "/inspection"
    },
    {
      icon: <Sun className="w-10 h-10" />,
      title: "Solar Power Solutions",
      description: "Coming soon! Watch this space!...",
      link: "/solar"
    },
    {
      icon: <Car className="w-10 h-10" />,
      title: "EV Charging Points",
      description: "For All Your Electric Vehicle Chargepoint Needs. APN Elec is approved by OZEV to install charge points under the Electric Vehicle Homecharge Scheme (EVHS), and under the Workplace Charging Scheme (WCS).",
      link: "/ev-charging"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardBody className="text-center p-6">
                <div className="mb-6 text-blue-600 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
              </CardBody>
              <CardFooter className="justify-center pb-6">
                <Button 
                  color="primary"
                  variant="ghost"
                  href={service.link}
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

export default ServicesSection;