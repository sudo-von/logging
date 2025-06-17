import { AbstractLoggerFactory, AbstractLoggerService } from "./abstracts";
import { ILoggerConfiguration, LoggerModule } from "./types";
import { LoggerService } from "./service";

export class LoggerFactory extends AbstractLoggerFactory {
  static create(configuration: ILoggerConfiguration): AbstractLoggerService {
    return new LoggerService(configuration);
  }
}
