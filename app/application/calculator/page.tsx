'use client';

import { useSolarCalculatorStore } from "@/states/solarcalculator";
import CustomerDetails from "@/components/calsteps/CustomerDetails";
import InstallationDetails from "@/components/calsteps/InstallationDetails";
import RoofDetails from "@/components/calsteps/RoofDetails";
import Results from "@/components/calsteps/Results";
import StepIndicator from "@/components/calsteps/StepIndicator";
import { useState } from "react";

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const {
    submitCustomerDetails,
    submitInstallationDetails,
    submitRoofDetails,
    roofs,
    setRoofDetails,
  } = useSolarCalculatorStore();

  const handleNext = async () => {
    if (step === 1) await submitCustomerDetails();
    if (step === 2) await submitInstallationDetails();
    if (step === 3) await submitRoofDetails();
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Solar Calculator</h1>
      <StepIndicator currentStep={step} />
      {step === 1 && <CustomerDetails nextStep={handleNext} />}
      {step === 2 && <InstallationDetails nextStep={handleNext} prevStep={prevStep} />}
      {step === 3 &&
        roofs.map((roof, index) => (
          <RoofDetails
            key={index}
            roof={roof}
            index={index}
            updateRoof={(idx, updatedRoof) => setRoofDetails(idx, updatedRoof)}
          />
        ))}
      {step === 4 && <Results prevStep={prevStep} />}
    </div>
  );
}
