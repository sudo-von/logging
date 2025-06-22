import { ILoggerConfiguration, LoggerLevel, Metadata } from "./types";
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
export abstract class AbstractLoggerService {
  /**
   * Creates an instance of the logger service.
   *
   * @param configuration - Logger configuration options.
   *
   * @throws MethodNotImplementedYetError Always throws to prevent direct instantiation.
   */
  protected constructor(_configuration: ILoggerConfiguration) {}

  /**
   * Logs a message at the `debug` level.
   *
   * Typically used for verbose diagnostic information useful during development.
   *
   * @param message - The message to log.
   * @param metadata - Optional contextual data to include.
   */
  abstract debug(message: string, metadata?: Metadata): void;

  /**
   * Logs an `error` level message.
   *
   * Intended for recoverable operational errors or exceptions.
   *
   * @param error - The error instance to log.
   */
  abstract error(error: Error): void;

  /**
   * Logs a `fatal` level message.
   *
   * Used for critical, unrecoverable errors that typically require process termination.
   *
   * @param error - The error instance to log.
   */
  abstract fatal(error: Error): void;

  /**
   * Formats a log entry with the corresponding icon and optional metadata.
   *
   * This utility method standardizes the appearance of log messages.
   *
   * @param level - The severity level of the log entry.
   * @param message - The core message content.
   * @param metadata - Optional structured metadata.
   *
   * @returns A formatted string for output.
   */
  protected abstract format(
    level: LoggerLevel,
    message: string,
    metadata?: Metadata
  ): string;

  /**
   * Logs an `info` level message.
   *
   * Used for general operational messages that represent normal system behavior.
   *
   * @param message - The message to log.
   * @param metadata - Optional additional data.
   */
  abstract info(message: string, metadata?: Metadata): void;

  /**
   * Logs a `trace` level message.
   *
   * Used for the most detailed logs, often capturing execution flow and function entry/exit.
   *
   * @param message - The message to log.
   * @param metadata - Optional metadata to provide additional context.
   */
  abstract trace(message: string, metadata?: Metadata): void;

  /**
   * Logs a `warn` level message.
   *
   * Indicates potentially harmful situations that do not prevent program execution.
   *
   * @param message - The warning message.
   * @param metadata - Optional contextual metadata.
   */
  abstract warn(message: string, metadata?: Metadata): void;
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
export abstract class AbstractLoggerFactory {
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
  public static create(
    _configuration: ILoggerConfiguration
  ): AbstractLoggerService {
    throw new MethodNotImplementedYetError("create");
  }
}
