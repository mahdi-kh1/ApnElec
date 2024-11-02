// StepIndicator.tsx
import React from 'react';
import { Home, Building, ClipboardCheck } from 'lucide-react'; // Import icons

// Define the step types
interface Step {
  name: string;
  icon: JSX.Element;
}

const steps: Step[] = [
  { name: 'Customer Details', icon: <Home /> },
  { name: 'Installation Details', icon: <Building /> },
  { name: 'Results', icon: <ClipboardCheck /> },
];

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-around mb-5">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col items-center cursor-pointer ${
            currentStep === index + 1 ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <div className="text-2xl">{step.icon}</div>
          <span className="text-sm">{step.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
