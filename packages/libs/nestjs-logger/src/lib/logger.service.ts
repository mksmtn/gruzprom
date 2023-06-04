import { Injectable } from '@nestjs/common';
import * as IO from 'fp-ts/IO';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService {
  constructor(private readonly logger: PinoLogger) {}

  debug(message: unknown): IO.IO<void> {
    return () => this.logger.debug(message);
  }

  verbose(message: unknown): IO.IO<void> {
    return () => this.logger.trace(message);
  }

  log(message: unknown): IO.IO<void> {
    return () => this.logger.info(message);
  }

  warn(message: unknown): IO.IO<void> {
    return () => this.logger.warn(message);
  }

  error(message: unknown): IO.IO<void> {
    return () => this.logger.error(message);
  }
}
