import { AbstractLoggerFactory, AbstractLoggerService } from "./abstracts";
import { ILoggerConfiguration } from "./types";
export declare class LoggerFactory extends AbstractLoggerFactory {
    static create(configuration: ILoggerConfiguration): AbstractLoggerService;
}
//# sourceMappingURL=factory.d.ts.map