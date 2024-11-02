// Final Page: Calculation & Results
interface CustomerDetails {
    name: string;
    address: string;
    telephone: string;
    email: string;
    installationAddress: string;
}

interface InstallationDetails {
    postcode: string;
    buildingUse: string;
    propertyType: string;
    age: string;
    listedBuilding: boolean;
    conservationArea: boolean;
    annualConsumption: string; // You may need to parse this to number later
    systemSize: string;        // Same here for systemSize
}

interface ResultsProps {
    customerDetails: CustomerDetails;
    installationDetails: InstallationDetails;
}

export default function Results({ customerDetails, installationDetails }: ResultsProps) {
    const { name, address } = customerDetails;
    const { systemSize, annualConsumption } = installationDetails;

    // Convert to numbers for calculations
    const systemSizeNum = parseFloat(systemSize);
    const annualConsumptionNum = parseFloat(annualConsumption);

    const estimatedAnnualOutput = systemSizeNum * 1000;
    const selfConsumption = (0.43 * estimatedAnnualOutput).toFixed(2);
    const gridIndependence = ((parseFloat(selfConsumption) / annualConsumptionNum) * 100).toFixed(2);

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Results</h2>
            <p><strong>Customer Name:</strong> {name}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>System Size:</strong> {systemSize} kWp</p>
            <p><strong>Estimated Annual Output:</strong> {estimatedAnnualOutput} kWh</p>
            <p><strong>Self-Consumption:</strong> {selfConsumption} kWh</p>
            <p><strong>Grid Independence:</strong> {gridIndependence} %</p>
        </div>
    );
}
