import { createLogger, LeveledLogMethod, Logger, transports } from 'winston';
import {
  APP_NAME,
  consoleFormat,
  gcpFormat,
  logLevels,
} from './logger-v1.config';
import { LoggingWinston } from '@google-cloud/logging-winston';

const logger = createLogger({
  levels: logLevels,
  level: 'trace',
  defaultMeta: {
    app: APP_NAME,
  },
  transports: [
    new transports.Console({ format: consoleFormat }),

    new LoggingWinston({
      level: 'debug',
      format: gcpFormat,
    }),
  ],
}) as Logger & Record<keyof typeof logLevels, LeveledLogMethod>;

export default logger;
