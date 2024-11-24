import { create } from "zustand";
import { CalculatorService } from "@/services/calculator-service";
import { api } from "@/services"; // Use shared Axios instance

const calculatorService = new CalculatorService(api);

export interface RoofDetails {
  roofOrientation: number; // Orientation in degrees
  roofSlope: number; // Slope in degrees
  shadeFactor: number; // Shade factor as a percentage
  pvOutput: number; // PV output in kWp
  roofType: string; // Type of roof
}

export interface SolarCalculatorState {
  customerDetails: any;
  installationDetails: any;
  roofs: RoofDetails[];
  totalOutput: number;
  interimResults: any;

  setCustomerDetails: (data: any) => void;
  setInstallationDetails: (data: any) => void;
  setRoofDetails: (index: number, details: RoofDetails) => void;
  submitCustomerDetails: () => Promise<void>;
  submitInstallationDetails: () => Promise<void>;
  submitRoofDetails: () => Promise<void>;
  fetchFinalResults: () => Promise<void>;
}

export const useSolarCalculatorStore = create<SolarCalculatorState>((set, get) => ({
  customerDetails: {},
  installationDetails: {},
  roofs: Array(4).fill({
    roofOrientation: 0,
    roofSlope: 0,
    shadeFactor: 0,
    pvOutput: 0,
    roofType: "",
  }),
  totalOutput: 0,
  interimResults: null,

  setCustomerDetails: (data) => set({ customerDetails: data }),
  setInstallationDetails: (data) => set({ installationDetails: data }),
  setRoofDetails: (index, details) =>
    set((state) => {
      const roofs = [...state.roofs];
      roofs[index] = details;
      return { roofs };
    }),

  submitCustomerDetails: async () => {
    const { customerDetails } = get();
    const result = await calculatorService.submitCustomerDetails(customerDetails);
    set({ interimResults: result });
  },

  submitInstallationDetails: async () => {
    const { installationDetails } = get();
    const result = await calculatorService.submitInstallationDetails(installationDetails);
    set({ interimResults: result });
  },

  submitRoofDetails: async () => {
    const { roofs } = get();
    const result = await calculatorService.submitRoofDetails(roofs);
    set({ interimResults: result });
  },

  fetchFinalResults: async () => {
    const { customerDetails, installationDetails, roofs } = get();
    const result = await calculatorService.getFinalResults({
      customerDetails,
      installationDetails,
      roofs,
    });
    set({ totalOutput: result.totalOutput });
  },
}));
