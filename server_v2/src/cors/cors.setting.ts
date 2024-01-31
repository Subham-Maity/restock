import { CORS_ORIGIN_Domain_1, CORS_ORIGIN_Domain_2 } from "../config/default";

export const production_domain_whitelist: string[] = [
  CORS_ORIGIN_Domain_1,
  CORS_ORIGIN_Domain_2,
];

export const development_domain_whitelist = true;

export const exposedHeaders = ["X-Total-Count"];

export const credentials = true;

export const optionsSuccessStatus = 200;
