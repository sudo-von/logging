import util from "util";
import pino, { Logger } from "pino";
import {
  ILoggerConfiguration,
  LoggerIcons,
  LoggerLevel,
  Metadata,
} from "./types";
import { AbstractLoggerService } from "./abstracts";

export class LoggerService extends AbstractLoggerService {
  private icons: LoggerIcons;
  private logger: Logger;

  constructor(configuration: ILoggerConfiguration) {
    super(configuration);

    this.logger = pino({
      base: { app: configuration.module.filename },
      level: configuration.level,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          hideObject: true,
          ignore: "pid",
          levelFirst: true,
          translateTime: "yyyy-mm-dd hh:mm:ss",
          timestampKey: "time",
        },
      },
    });

    this.icons = configuration.icons;
  }

  public debug(message: string, metadata?: Metadata): void {
    const formattedMessage = this.format("debug", message, metadata);
    this.logger.debug(formattedMessage);
  }

  public error(error: Error): void {
    const metadata: Metadata = { stack: error.stack };
    const formattedMessage = this.format("error", error.message, metadata);
    this.logger.error(formattedMessage, { error });
  }

  public fatal(error: Error): void {
    const metadata: Metadata = { stack: error.stack };
    const formattedMessage = this.format("fatal", error.message, metadata);
    this.logger.fatal(formattedMessage, { error });
  }

  protected format(
    level: LoggerLevel,
    message: string,
    metadata?: Metadata
  ): string {
    const icon = this.icons[level];

    if (metadata === undefined || metadata === null) {
      return `${icon} ${message}`;
    }

    let formattedMetadata = "";
    switch (typeof metadata) {
      case "boolean":
        formattedMetadata = metadata ? "true" : "false";
        break;
      case "number":
        formattedMetadata = String(metadata);
        break;
      case "object":
        formattedMetadata = util.inspect(metadata, {
          depth: null,
          showHidden: false,
        });
        break;
      case "string":
        formattedMetadata = metadata;
        break;
      default:
        formattedMetadata = `[Invalid metadata type: ${typeof metadata}]`;
    }

    return `${icon} ${message} ${formattedMetadata}`;
  }

  info(message: string, metadata?: Metadata): void {
    const formattedMessage = this.format("info", message, metadata);
    this.logger.info(formattedMessage);
  }

  trace(message: string, metadata?: Metadata): void {
    const formattedMessage = this.format("trace", message, metadata);
    this.logger.trace(formattedMessage);
  }

  warn(message: string, metadata?: Metadata): void {
    const formattedMessage = this.format("warn", message, metadata);
    this.logger.warn(formattedMessage);
  }
}
