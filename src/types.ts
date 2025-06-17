import Module from "module";

/**
 * Defines the complete configuration for the logger system.
 */
export interface ILoggerConfiguration {
  /**
   * Icons used to visually represent each log level.
   */
  icons: LoggerIcons;

  /**
   * The Node.js module where the logger is being used.
   */
  module: LoggerModule;

  /**
   * Minimum level to log.
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
 * The module object from Node.js used to identify the calling context.
 */
export type LoggerModule = Module;

/**
 * Generic metadata that can be attached to log entries.
 */
export type Metadata = unknown;
