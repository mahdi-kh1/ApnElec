// Page 2: Installation Details
import { useState } from "react";
interface InstallationDetailsProps {
    nextStep: () => void;
    prevStep: () => void;
    setInstallationDetails: (details: {
        postcode: string;
        buildingUse: string;
        propertyType: string;
        age: string;
        listedBuilding: boolean;
        conservationArea: boolean;
        annualConsumption: string;
        systemSize: string;
    }) => void;
}

export default function InstallationDetails({ nextStep, prevStep, setInstallationDetails }: InstallationDetailsProps) {
    const [postcode, setPostcode] = useState<string>("");
    const [buildingUse, setBuildingUse] = useState<string>("");
    const [propertyType, setPropertyType] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [listedBuilding, setListedBuilding] = useState<boolean>(false);
    const [conservationArea, setConservationArea] = useState<boolean>(false);
    const [annualConsumption, setAnnualConsumption] = useState<string>("");
    const [systemSize, setSystemSize] = useState<string>("");

    const handleNext = () => {
        setInstallationDetails({
            postcode,
            buildingUse,
            propertyType,
            age,
            listedBuilding,
            conservationArea,
            annualConsumption,
            systemSize,
        });
        nextStep();
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Installation Details</h2>
            <input
                type="text"
                placeholder="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="border-b-2 p-2"
            />
            <select
                value={buildingUse}
                onChange={(e) => setBuildingUse(e.target.value)}
                className="border-b-2 p-2"
            >
                <option value="">Select Building Use</option>
                <option value="Domestic">Domestic</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Other">Other</option>
            </select>
            <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="border-b-2 p-2"
            >
                <option value="">Select Property Type</option>
                <option value="Semi-detached">Semi-detached</option>
                <option value="Terrace">Terrace</option>
                <option value="Detached">Detached</option>
            </select>
            <input
                type="number"
                placeholder="Age of Property"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border-b-2 p-2"
            />
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={listedBuilding}
                    onChange={() => setListedBuilding(!listedBuilding)}
                />
                <label>Listed Building</label>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={conservationArea}
                    onChange={() => setConservationArea(!conservationArea)}
                />
                <label>Conservation Area</label>
            </div>
            <input
                type="number"
                placeholder="Annual Electricity Consumption (kWh)"
                value={annualConsumption}
                onChange={(e) => setAnnualConsumption(e.target.value)}
                className="border-b-2 p-2"
            />
            <input
                type="number"
                placeholder="Preferred System Size (kWp)"
                value={systemSize}
                onChange={(e) => setSystemSize(e.target.value)}
                className="border-b-2 p-2"
            />
            <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded">
                    Back
                </button>
                <button onClick={handleNext} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Next
                </button>
            </div>
        </div>
    );
}
