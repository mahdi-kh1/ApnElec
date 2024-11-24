import { AxiosInstance } from "axios";
import logger from "@/utils/logger";

export class LogService {
  constructor(private api: AxiosInstance) {}

  async sendLog(logData: any) {
    try {
      const response = await this.api.post("/logs", logData); // POST the log to the `/logs` endpoint
      logger.info({
        message: "Log successfully sent to the server",
        logData,
        response: response.data,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        logger.error({
          message: "Failed to send log to the server",
          error: error.message,
          logData,
        });
      } else {
        logger.error({
          message: "Failed to send log to the server",
          error: "Unknown error occurred",
          logData,
        });
      }
      throw error; // Re-throw the error to handle it upstream if needed
    }
  }
}
