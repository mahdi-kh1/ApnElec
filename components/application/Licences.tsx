import Image from 'next/image';
import React from 'react';

const licenses = [
  {
    title: "OZEV Authorized",
    description: "Authorized by the Office for Zero Emission Vehicles.",
    link: "https://www.gov.uk/electric-vehicle-chargepoint-installers",
    imgSrc: "/Licences/OZEV-logo.jpg",
  },
  {
    title: "MCS Accredited",
    description: "MCS-certified installer.",
    link: "#", // Replace with the MCS page link
    imgSrc: "/Licences/mcs-certified.jpg",
  },
  {
    title: "RECC Member",
    description: "Member of the Renewable Energy Consumer Code.",
    link: "https://www.recc.org.uk/scheme/members/00071225-apn-elec",
    imgSrc: "/Licences/recc-certified.jpg",
  },
  {
    title: "NAPIT Member",
    description: "NAPIT-certified for electrical compliance.",
    link: "https://www.napit.org.uk/member/28447/apn-elec.aspx",
    imgSrc: "/Licences/napit.jpg",
  },
  {
    title: "TSI Approved",
    description: "Approved by Trading Standards Institute.",
    link: "#", // Replace with the TSI page link
    imgSrc: "/Licences/tsi-approved.jpg",
  },
  {
    title: "IWA Approved",
    description: "Deposit and Guarantee Insurance from IWA.",
    link: "#", // Replace with the IWA page link
    imgSrc: "/Licences/IWA_APPROVED.png",
  },
  {
    title: "TrustMark Member",
    description: "TrustMark-certified quality assurance.",
    link: "https://www.trustmark.org.uk/firms/APN-Elec-1537739",
    imgSrc: "/Licences/TrustMark.jpg",
  },
  {
    title: "myenergi ZAPPI",
    description: "Member of myenergi for sustainable solutions.",
    link: "#", // Replace with ZAPPI membership page link
    imgSrc: "/Licences/zappi-myenergi-logo.jpg",
  },
];

const LicenseSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Our Membership Licenses</h2>
          <p className="font-20 text-center max-w-2xl mx-auto">
            APN Elec is authorised by OZEV, accredited by MCS, a member of NAPIT, RECC, TSI, and TrustMark. We are also approved by IWA Deposit and Guarantee Insurance and a member of myenergi (ZAPPI).
          </p>
        </div>

        {/* License Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {licenses.map((license, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
              <a href={license.link} target="_blank" rel="noopener noreferrer">
                <Image
                  width={256}
                  height={256}
                  src={license.imgSrc} 
                  alt={`${license.title} Logo`} 
                  className="mb-4 w-full h-16 object-contain mx-auto"
                />
                <h3 className="text-lg font-semibold">{license.title}</h3>
                <p className="text-sm text-gray-600">{license.description}</p>
              </a>
            </div>
          ))}
        </div>

        {/* TrustMark Information */}
        <div className="text-center mt-12">
          <h2 className="text-4xl font-bold mb-4">About TrustMark Code of Conduct</h2>
          <p className="font-20 max-w-2xl mx-auto mb-4">
            We are a TrustMark Registered business, committed to maintaining the highest standards of quality and customer service.
            Our work complies with the TrustMark Code of Conduct, ensuring fair trading, good work practices, and excellent customer service.
          </p>
          <div className="space-y-2">
            <a href="https://www.trustmark.org.uk/articles/protecting-homeowners-improving-quality-of-home-improvements" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Learn more about how TrustMark protects homeowners
            </a>
            <br />
            <a href="https://cms.trustmark.org.uk/media/ekpdo2xw/code-of-conduct.pdf" target="_blank" rel="nofollow" className="text-blue-600 hover:underline">
              Learn more about the TrustMark Code of Conduct
            </a>
            <br />
            <a href="https://www.trustmark.org.uk/homeowner/find-a-tradesperson?search=true&amp;tmln=1537739" target="_blank" rel="nofollow" className="text-blue-600 hover:underline">
              View our Registration details on TrustMark
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseSection;
