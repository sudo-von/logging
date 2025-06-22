/**
 * Defines the complete configuration for the logger system.
 */
export interface ILoggerConfiguration {
  /**
   * Optional set of icons used to visually represent each log level in log messages.
   *
   * If not provided, default icons will be used
   */
  icons?: LoggerIcons;

  /**
   * The Node.js file where the logger is being used.
   */
  filename: string;

  /**
   * Minimum level to log.
   *
   * All messages of this level and **higher severity** will be output.
   */
  level: LoggerLevel;
}

/**
 * Unicode string used to represent a log level.
 */
export type LoggerIcon = string;

/**
 * Mapping of each log level to its corresponding icon.
 */
export type LoggerIcons = Record<LoggerLevel, LoggerIcon>;

/**
 * Describes the severity level of a log message.
 *
 * Ordered from most **verbose** to most **severe**.
 */
export type LoggerLevel =
  | "trace"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

/**
 * Generic metadata that can be attached to log entries.
 */
export type Metadata = unknown;
