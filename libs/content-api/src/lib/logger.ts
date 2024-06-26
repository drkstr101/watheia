import _ from 'lodash';
import winston from 'winston';
import config from './config';

const formatError = winston.format((info, opts) => {
  if (_.has(info, 'err')) {
    info['error'] = info['err'];
    delete info['err'];
  }
  if (_.has(info, 'error.message')) {
    info['error'] = _.omitBy(
      {
        message: _.get(info, 'error.message'),
        stack: _.get(info, 'error.stack', null),
      },
      _.isNil
    );
  }
  return info;
});

const timestampFormat = winston.format((info) => {
  const MESSAGE = Symbol.for('message') as unknown as string;
  if (typeof info[MESSAGE] === 'string') {
    info[MESSAGE] = `[${new Date().toISOString().substring(11, 23)}] ${info[MESSAGE]}`;
  }
  return info;
});

const defaultFormats = [formatError(), winston.format.colorize(), winston.format.simple()];

if (process.env['LOG_TIMESTAMP']) {
  defaultFormats.push(timestampFormat());
}

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(...defaultFormats),
  }),
];

const logger = winston.createLogger({
  level: config.logLevel,
  transports: transports,
});

export const createLogger = ({ label }: { label: string }): winston.Logger => {
  const formats = defaultFormats.slice();
  if (label) {
    formats.push(
      winston.format.label({
        label: label,
        message: true,
      })
    );
  }
  const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(...formats),
    transports: transports,
  });
  logger.createLogger = createLogger;
  return logger;
};

declare module 'winston' {
  interface Logger {
    createLogger: ({ label }: { label: string }) => winston.Logger;
  }
}

logger.createLogger = createLogger;

export default logger;
