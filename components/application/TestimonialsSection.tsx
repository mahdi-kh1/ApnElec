import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "John Smith",
      role: "Homeowner",
      content: "Excellent service from start to finish. The solar panel installation was professional and efficient.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      content: "APN Elec helped us transition to solar power, significantly reducing our energy costs. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Brown",
      role: "Property Manager",
      content: "Their inspection and testing service is thorough and professional. Great communication throughout.",
      rating: 5
    }
  ];

  const renderStars = (rating: number): JSX.Element[] => {
    return [...Array(rating)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardBody className="p-6">
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  &quot;{testimonial.content}&quot; {/* Escape the quotes */}
                </p>
                <div className="mt-auto">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
