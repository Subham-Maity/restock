import { ConfigService } from '@nestjs/config';
import { MyLogger } from '../utils/logger/logger';

const logger = new MyLogger();

export function logApplicationDetails(configService: ConfigService) {
  logger.log(
    `Application is running on: ${configService.get(
      'host',
    )}:${configService.get('port')}`,
  );
  logger.log(`Database URL: ${configService.get('db')}`);
  logger.log(`Environment: ${process.env.NODE_ENV}`);
}

export function logServerReady(port: number) {
  logger.log(`Server ready at http://localhost:${port}`);
}

export function logServerListening(port: number) {
  logger.log(`Server is listening on port ${port}`);
}
