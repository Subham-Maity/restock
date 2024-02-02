import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import {
  allowedHeaders,
  credentials,
  development_domain_whitelist,
  methods,
  optionsSuccessStatus,
  production_domain_whitelist,
} from './cors.setting';
import { INestApplication } from '@nestjs/common';

export function configureCors(app: INestApplication<any>): void {
  let corsSettings: CorsOptions;

  if (process.env.NODE_ENV === 'development') {
    corsSettings = {
      origin: development_domain_whitelist,
      optionsSuccessStatus: optionsSuccessStatus,
      credentials: credentials,
    };
  } else {
    const whitelist = production_domain_whitelist;
    corsSettings = {
      origin: function (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void,
      ) {
        if (origin && whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: methods,
      optionsSuccessStatus: optionsSuccessStatus,
      credentials: credentials,
      allowedHeaders: allowedHeaders,
    };
  }
  app.enableCors(corsSettings);
}
