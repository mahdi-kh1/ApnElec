export interface CustomerDetails {
    name: string;
    address: string;
    telephone: string;
    email: string;
    installationAddress: string;
  }
  
  export interface InstallationDetails {
    postcode: string;
    buildingUse: string;
    propertyType: string;
    age: string;
    listedBuilding: boolean;
    conservationArea: boolean;
    annualConsumption: string;
    systemSize: string;
  }
  
  export interface RoofDetails {
    roofOrientation: number;
    roofSlope: number;
    shadeFactor: number;
    pvOutput: number;
    roofType: string;
  }
  
  export interface CalculatorSubmission {
    customerDetails: CustomerDetails;
    installationDetails: InstallationDetails;
    roofs: RoofDetails[];
  }
  
  export interface CalculatorResult {
    totalOutput: number;
    financialSavings: number;
    co2Savings: number;
    breakdown: RoofDetails[];
  }
  