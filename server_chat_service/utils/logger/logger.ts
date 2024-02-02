import pino from 'pino';

const logger = pino();

export class MyLogger {
  log(message: string) {
    logger.info(message);
  }

  error(message: string, trace: string) {
    logger.error({ trace }, message);
  }

  warn(message: string) {
    logger.warn(message);
  }

  debug(message: string) {
    logger.debug(message);
  }

  verbose(message: string) {
    logger.trace(message);
  }
}
