import { MethodNotImplementedYetError } from "@sudo-von/core";
/**
 * Abstract base class for logging services.
 *
 * Acts as a **Facade** over third-party logging libraries,
 * exposing a simplified and uniform interface for structured logging across different log levels.
 *
 * Provides a consistent interface for structured logging across different log levels.
 * Intended to be extended by concrete logger implementations (e.g., using Pino, Winston, etc.).
 */
export class AbstractLoggerService {
    /**
     * Creates an instance of the logger service.
     *
     * @param configuration - Logger configuration options.
     *
     * @throws MethodNotImplementedYetError Always throws to prevent direct instantiation.
     */
    constructor(_configuration) { }
}
/**
 * Abstract base class for creating logger service instances.
 *
 * This factory defines a static `create` method contract for returning
 * an `ILoggerService` implementation, scoped to a specific file.
 *
 * Concrete factories are expected to handle configuration, formatting,
 * transports, and other implementation details.
 */
export class AbstractLoggerFactory {
    /**
     * Creates and returns a logger service instance scoped to a specific file.
     *
     * Implementations should ensure the logger is properly configured with
     * icons, levels, and transports.
     *
     * @param configuration - The configuration used to initialize the logger.
     *
     * @returns A fully initialized instance of `AbstractLoggerService`.
     */
    static create(_configuration) {
        throw new MethodNotImplementedYetError("create");
    }
}
//# sourceMappingURL=abstracts.js.map