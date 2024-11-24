import { useSolarCalculatorStore } from "@/states/solarcalculator";

export default function InstallationDetails({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const { installationDetails, setInstallationDetails } =
    useSolarCalculatorStore();

  return (
    <div>
      <h2 className="text-2xl mb-4">Installation Details</h2>
      <div className="mb-4">
        <label className="block">Postcode:</label>
        <input
          type="text"
          value={installationDetails.postcode}
          onChange={(e) =>
            setInstallationDetails({
              ...installationDetails,
              postcode: e.target.value,
            })
          }
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Building Use:</label>
        <input
          type="text"
          value={installationDetails.buildingUse}
          onChange={(e) =>
            setInstallationDetails({
              ...installationDetails,
              buildingUse: e.target.value,
            })
          }
          className="border p-2 w-full"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={prevStep}>
        Back
      </button>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={nextStep}>
        Next
      </button>
    </div>
  );
}
