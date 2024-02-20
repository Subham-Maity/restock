//common settings for cors
export const exposedHeaders = ["X-Total-Count"];

export const credentials = true;

export const optionsSuccessStatus = 200;

//Production

const CORS_ORIGIN_Domain_1: string =
  process.env.CORS_URL_1 || "http://localhost:3000";
export const CORS_ORIGIN_Domain_2: string =
  process.env.CORS_URL_2 || "http://localhost:3001";
export const production_domain_whitelist: string[] = [
  CORS_ORIGIN_Domain_1,
  CORS_ORIGIN_Domain_2,
];

//Development
export const development_domain_whitelist = true;
