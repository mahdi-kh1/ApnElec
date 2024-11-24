import { prefix } from "@/utils/helpers";
import axios from "axios";
import { IdentityService } from "./identity-service";
import { BlogService } from "./blog-service";
import { LogService } from "./log-service";
import logger from "@/utils/logger";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

if (!serverUrl) {
  throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in environment variables.");
}

const api = axios.create({
  baseURL: prefix("https://", serverUrl), // Now safe to use
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  logger.info("API Request", config);
  return config;
});

api.interceptors.response.use(
  (response) => {
    logger.info("API Response", response);
    return response;
  },
  (error) => {
    logger.error("API Error", error);
    return Promise.reject(error);
  }
);

const identityService = new IdentityService(api);
const blogService = new BlogService(api);
const logService = new LogService(api);

export { api, identityService, blogService, logService };
