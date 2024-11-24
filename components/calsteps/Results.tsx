import { useSolarCalculatorStore } from "@/states/solarcalculator";

export default function Results({ prevStep }: { prevStep: () => void }) {
  const { interimResults } = useSolarCalculatorStore();

  return (
    <div>
      <h2 className="text-2xl mb-4">Results</h2>
      {interimResults ? (
        <>
          <p>Total Output: {interimResults.totalOutput} kWh</p>
          <p>Financial Savings: ${interimResults.financialSavings}</p>
          <p>CO2 Savings: {interimResults.co2Savings} kg/year</p>
        </>
      ) : (
        <p>Loading results...</p>
      )}
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={prevStep}>
        Back
      </button>
    </div>
  );
}
