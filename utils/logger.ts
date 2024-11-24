import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import os from "os";
import { logService } from "@/services"; // Import LogService to send logs to the server

// Check if running on the server
const isServer = typeof window === "undefined";

// Check environment for logging control
const isLoggingEnabled = process.env.ENABLE_LOGGING === "true";
const isProduction = process.env.NODE_ENV === "production";

// Create logger only if logging is enabled
let logger: winston.Logger;

if (isServer && isLoggingEnabled) {
  logger = winston.createLogger({
    level: isProduction ? "info" : "debug", // Info level for production, debug for development
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json() // Log data as JSON
    ),
    transports: [
      new winston.transports.Console({ silent: !isProduction }), // Disable console in production if needed
      new DailyRotateFile({
        filename: "logs/app-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d", // Keep logs for 14 days
      }),
    ],
  });

  // Intercept Winston logs and send them to the server
  logger.on("data", (log) => {
    sendLogToServer(log);
  });
} else {
  // Placeholder logger for client-side or disabled logging
  logger = winston.createLogger({
    level: "silent", // Disable logging when not enabled
    format: winston.format.simple(),
    transports: [new winston.transports.Console({ silent: true })],
  });
}

// Function to send logs to the server via the LogService
const sendLogToServer = async (logData: any) => {
  if (!isServer || !isLoggingEnabled) return; // Only run on server if logging is enabled

  try {
    const timestamp = new Date().toISOString().replace(/[:\-T]/g, "").split(".")[0]; // Format: YYYYMMDDHHMMSS
    const formattedLog = {
      ...logData,
      timestamp, // Add formatted timestamp
      hostname: os.hostname(),
    };
    await logService.sendLog(formattedLog); // Use LogService to send the log
  } catch (error) {
    if (error instanceof Error) {
      // Handle known error types
      logger.error({
        message: "Failed to send log to server",
        error: error.message,
      });
    } else {
      // Handle unknown error types
      logger.error({
        message: "Failed to send log to server",
        error: "Unknown error occurred",
      });
    }
  }
};

// Example utility to log request data
export const logRequestData = (req: any, message: string = "Request log") => {
  if (!isServer || !isLoggingEnabled) return; // Only run on server if logging is enabled

  const logData = {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    method: req.method,
    url: req.url,
    userAgent: req.headers["user-agent"],
    hostname: os.hostname(),
  };

  logger.info({ message, ...logData });
  sendLogToServer({ message, ...logData }); // Send the log to the server
};

export default logger;
