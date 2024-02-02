import {
  CORS_ORIGIN_Domain_1,
  CORS_ORIGIN_Domain_2,
} from '../../config/config';

export const production_domain_whitelist: string[] = [
  CORS_ORIGIN_Domain_1,
  CORS_ORIGIN_Domain_2,
];

export const development_domain_whitelist = true;

export const credentials = true;

export const optionsSuccessStatus = 200;

export const allowedHeaders = [
  'Accept',
  'Authorization',
  'Content-Type',
  'X-Requested-With',
  'apollo-require-preflight',
];

export const methods = ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'];
