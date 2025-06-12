import winston from "winston";

const { combine, timestamp, json, errors, simple } = winston.format;

export const log = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    errors({ stack: true }),
    ...(process.env.LOG_FORMAT === "json" ? [timestamp(), json()] : [simple()])
  ),
  transports: [new winston.transports.Console()],
  handleExceptions: true,
  exceptionHandlers: [new winston.transports.Console()],
});
