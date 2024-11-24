import { AxiosInstance } from "axios";
import logger from "@/utils/logger";

export class CalculatorService {
  constructor(private api: AxiosInstance) {}

  async submitCustomerDetails(data: any) {
    try {
      const response = await this.api.post("/solar/customer-details", data);
      logger.info({ message: "Customer details submitted", data: response.data });
      return response.data;
    } catch (error) {
      logger.error({ message: "Failed to submit customer details", error });
      throw error;
    }
  }

  async submitInstallationDetails(data: any) {
    try {
      const response = await this.api.post("/solar/installation-details", data);
      logger.info({ message: "Installation details submitted", data: response.data });
      return response.data;
    } catch (error) {
      logger.error({ message: "Failed to submit installation details", error });
      throw error;
    }
  }

  async submitRoofDetails(data: any) {
    try {
      const response = await this.api.post("/solar/roof-details", data);
      logger.info({ message: "Roof details submitted", data: response.data });
      return response.data;
    } catch (error) {
      logger.error({ message: "Failed to submit roof details", error });
      throw error;
    }
  }

  async getFinalResults(data: any) {
    try {
      const response = await this.api.post("/solar/final-results", data);
      logger.info({ message: "Final results fetched", data: response.data });
      return response.data;
    } catch (error) {
      logger.error({ message: "Failed to fetch final results", error });
      throw error;
    }
  }
}
