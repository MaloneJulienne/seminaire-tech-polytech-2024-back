import Joi from 'joi';
import { format } from 'winston';

export const APP_NAME = 'TODO APP BACKEND';
export const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export const logColors = {
  fatal: '\x1b[37;41m',
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[34m',
  debug: '\x1b[37;43m',
  trace: '\x1b[35m',
};

export const logLevelMap = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

export function mapLogLevel(level: string): string {
  return logLevelMap[level] || 'DEFAULT';
}

export const logSchema = Joi.object({
  app: Joi.string().required(),
  timestamp: Joi.date().iso().required(),
  level: Joi.string()
    .valid(...Object.keys(logLevels))
    .required(),
  message: Joi.string().required(),
  context: Joi.string().required(),
  email: Joi.string().email().optional(),
  stack: Joi.object().optional(),
  error: Joi.string().optional(),
  url: Joi.string()
    .pattern(/^\/[a-zA-Z0-9\-\/]*$/)
    .min(1)
    .message(
      'Path must start with a "/" and can contain only alphanumeric characters, hyphens, and slashes.',
    ),
});

export const consoleFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const log = {
      timestamp,
      level,
      message,
      ...meta,
    };

    validateLog(log);
    return `\x1b[32m${new Date(timestamp).toLocaleDateString() + ' ' + new Date(timestamp).toLocaleTimeString()} ${logColors[level]}[${level.toUpperCase()}]\x1b[0m\x1b[32m : \x1b[33m[${meta['app']}] [${meta['context']}] \x1b[32m${message} \x1b[36m${JSON.stringify(delete meta['context'] && delete meta['app'] && meta, null, 2)}\x1b[37m`;
  }),
);

// Create file format
export const fileFormat = format.combine(format.timestamp(), format.json());
export const gcpFormat = format.combine(format.timestamp(), format.json());

export const validateLog = (log: any) => {
  const { error } = logSchema.validate(log);

  if (error) {
    throw new Error(`Log validation error: ${error.message}`);
  }
};
