import { AbstractLoggerFactory } from "./abstracts";
import { LoggerService } from "./service";
export class LoggerFactory extends AbstractLoggerFactory {
    static create(configuration) {
        return new LoggerService(configuration);
    }
}
//# sourceMappingURL=factory.js.map