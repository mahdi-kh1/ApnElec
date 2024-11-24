import { ArrowRight } from "lucide-react";

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-center items-center space-x-4">
      {[1, 2, 3].map((step) => (
        <div key={step} className={`step ${currentStep >= step ? "completed" : ""}`}>
          {step === currentStep ? (
            <ArrowRight className="w-6 h-6 text-blue-500" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      ))}
    </div>
  );
}
