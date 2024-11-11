// pages/about/page.tsx

import React from 'react';
import { User, Award, Users, Home, Shield, Clock, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">About APN Elec</h1>

        {/* About APN Elec Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-lg mb-4 text-gray-600">
            APN Elec is certified by NAPIT to provide Electrical and Solar PV installation, and we hold Part P certification for Building Regulations.
            With qualifications in the latest 18th Edition Regulations for Electrical work and EV Charging, we ensure top-notch service for both residential and commercial clients.
          </p>
          <p className="text-lg mb-4 text-gray-600">
            As proud members of Trustmark, we are committed to delivering high standards in customer service and technical competence. Our mission is to make energy solutions sustainable, cost-effective, and accessible to everyone.
          </p>
          <p className="text-lg mb-4 text-gray-600">
            We are MCS approved, a mark of quality assurance in the renewable energy industry. Additionally, we are members of RECC (Renewable Energy Consumer Code), ensuring transparent services and a positive customer experience.
          </p>
          <p className="text-lg text-gray-600">
            To provide peace of mind, every installation is covered by IWA Deposit and Guarantee Protection, ensuring a minimum of two years coverage after commissioning.
          </p>
        </div>

        {/* Image with Text */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="w-full md:w-1/2 p-2">
            <Image src="/about/about-apnelec.jpg" alt="APN Elec Team" width={1024} height={256} className="rounded-lg shadow-sm" />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <p className="text-lg mb-4 text-gray-600">
              APN Elec is not just about installations—it&apos;s about making a difference. We are committed to offering the highest quality electrical and solar solutions, while continuously innovating to meet the challenges of a changing world.
            </p>
            <p className="text-lg mb-4 text-gray-600">
              Our experts are certified and always updated with the latest regulations and technologies. By focusing on both energy efficiency and environmental sustainability, we aim to contribute to a greener, more energy-efficient future.
            </p>
          </div>
        </div>

        {/* About Amir */}
        <div className="mb-8 bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Amir</h2>
          <p className="text-lg text-gray-600">
            Amir started his career as an electronics engineer, designing circuit boards before realizing that his true passion lay in hands-on work with renewable energy. Over 12 years ago, Amir retrained as an electrician, gaining specialized knowledge and certification in solar panel and EV charging point installations.
          </p>
          <p className="text-lg mb-4 text-gray-600">
            A passionate advocate for green energy solutions, Amir is focused on reducing reliance on fossil fuels and promoting zero-emission technologies. His belief in sustainable energy drives his work at APN Elec, where he continues to innovate and improve systems to make them more efficient and environmentally friendly.
          </p>
        </div>

        {/* Stats Section with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-lg shadow-sm text-center">
            <Users className="mx-auto mb-4 text-teal-600" size={48} />
            <h3 className="text-3xl font-semibold text-gray-800">100+</h3>
            <p className="text-gray-600">Clients Served</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm text-center">
            <Award className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-3xl font-semibold text-gray-800">500+</h3>
            <p className="text-gray-600">Projects Completed</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm text-center">
            <Home className="mx-auto mb-4 text-purple-600" size={48} />
            <h3 className="text-3xl font-semibold text-gray-800">50+</h3>
            <p className="text-gray-600">Team Members</p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-sm text-center">
            <Shield className="mx-auto mb-4 text-yellow-600" size={48} />
            <h3 className="text-3xl font-semibold text-gray-800">Insured</h3>
            <p className="text-gray-600">Minimum 2 Years Coverage</p>
          </div>

          {/* Additional Stats */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-sm text-center">
            <Clock className="mx-auto mb-4 text-green-600" size={48} />
            <h3 className="text-3xl font-semibold text-gray-800">24/7</h3>
            <p className="text-gray-600">Emergency Support</p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg shadow-sm text-center">
            <CheckCircle className="mx-auto mb-4 text-orange-600" size={48} />
            <h3 className="text-3xl font-semibold text-gray-800">Certified</h3>
            <p className="text-gray-600">Qualified Technicians</p>
          </div>
        </div>
      </div>
    </div>
  );
}
