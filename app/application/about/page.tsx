import React from 'react';
import { Card, CardBody } from "@nextui-org/react";

export default function AboutPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
        
        <Card className="mb-8">
          <CardBody>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, we&apos;ve been at the forefront of digital innovation,
              helping businesses transform their ideas into reality.
            </p>
            <p className="text-gray-600">
              Our team of experts brings together years of experience in technology,
              design, and business strategy to deliver exceptional results for our clients.
            </p>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { number: "100+", label: "Clients Served" },
            { number: "500+", label: "Projects Completed" },
            { number: "50+", label: "Team Members" }
          ].map((stat, index) => (
            <Card key={index}>
              <CardBody className="text-center">
                <h3 className="text-3xl font-bold text-primary">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
