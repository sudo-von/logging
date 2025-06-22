import { ILoggerConfiguration, LoggerLevel, Metadata } from "./types";
import { AbstractLoggerService } from "./abstracts";
export declare class LoggerService extends AbstractLoggerService {
    private icons;
    private logger;
    constructor(configuration: ILoggerConfiguration);
    debug(message: string, metadata?: Metadata): void;
    error(error: Error): void;
    fatal(error: Error): void;
    protected format(level: LoggerLevel, message: string, metadata?: Metadata): string;
    info(message: string, metadata?: Metadata): void;
    trace(message: string, metadata?: Metadata): void;
    warn(message: string, metadata?: Metadata): void;
}
//# sourceMappingURL=service.d.ts.map