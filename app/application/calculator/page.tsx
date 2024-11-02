'use client'
import { useState } from 'react';
import CustomerDetails from '@/components/calsteps/CustomerDetails';
import InstallationDetails from '@/components/calsteps/InstallationDetails';
import Results from '@/components/calsteps/Results';
import StepIndicator from '@/components/calsteps/StepIndicator'; // Import StepIndicator

export default function CalculatorPage() {
  const [step, setStep] = useState(1);

  // Initialize state with required properties
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    telephone: '',
    email: '',
    installationAddress: '',
  });

  const [installationDetails, setInstallationDetails] = useState({
    postcode: '',
    buildingUse: '',
    propertyType: '',
    age: '',
    listedBuilding: false,
    conservationArea: false,
    annualConsumption: '',
    systemSize: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  
  return (
    <div className="container mx-auto min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Solar alculator</h1>
      <StepIndicator currentStep={step} /> {/* Step Indicator */}
      {step === 1 && (
        <CustomerDetails
          nextStep={nextStep}
          setCustomerDetails={setCustomerDetails}
        />
      )}
      {step === 2 && (
        <InstallationDetails
          nextStep={nextStep}
          prevStep={prevStep}
          setInstallationDetails={setInstallationDetails}
        />
      )}
      {step === 3 && (
        <Results
          customerDetails={customerDetails}
          installationDetails={installationDetails}
        />
      )}
    </div>
  );
}
