import util from "util";
import pino from "pino";
import { AbstractLoggerService } from "./abstracts";
import { DEFAULT_ICONS } from "./constant";
export class LoggerService extends AbstractLoggerService {
    constructor(configuration) {
        super(configuration);
        this.logger = pino({
            base: { app: configuration.filename },
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
        this.icons = configuration.icons || DEFAULT_ICONS;
    }
    debug(message, metadata) {
        const formattedMessage = this.format("debug", message, metadata);
        this.logger.debug(formattedMessage);
    }
    error(error) {
        const metadata = { stack: error.stack };
        const formattedMessage = this.format("error", error.message, metadata);
        this.logger.error(error, formattedMessage);
    }
    fatal(error) {
        const metadata = { stack: error.stack };
        const formattedMessage = this.format("fatal", error.message, metadata);
        this.logger.fatal(error, formattedMessage);
    }
    format(level, message, metadata) {
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
    info(message, metadata) {
        const formattedMessage = this.format("info", message, metadata);
        this.logger.info(formattedMessage);
    }
    trace(message, metadata) {
        const formattedMessage = this.format("trace", message, metadata);
        this.logger.trace(formattedMessage);
    }
    warn(message, metadata) {
        const formattedMessage = this.format("warn", message, metadata);
        this.logger.warn(formattedMessage);
    }
}
//# sourceMappingURL=service.js.map