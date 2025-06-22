import { jest } from "@jest/globals";
import { DEFAULT_ICONS } from "./constant";
import { LoggerLevel } from "./types";

const debugMock = jest.fn();
const errorMock = jest.fn();
const fatalMock = jest.fn();
const infoMock = jest.fn();
const loggerMock = jest.fn();
const traceMock = jest.fn();
const warnMock = jest.fn();
jest.unstable_mockModule("pino", () => ({
  default: () => ({
    debug: debugMock,
    error: errorMock,
    fatal: fatalMock,
    info: infoMock,
    logger: loggerMock,
    trace: traceMock,
    warn: warnMock,
  }),
}));

const inspectMock = jest.fn();
jest.unstable_mockModule("util", () => ({
  default: {
    inspect: inspectMock,
  },
}));

type CriticalLevel = Extract<LoggerLevel, "error" | "fatal">;

type DiagnosticLevel = Extract<
  LoggerLevel,
  "trace" | "debug" | "info" | "warn"
>;

const criticalLevels = ["error", "fatal"] satisfies CriticalLevel[];

const criticalLevelMocks = {
  error: errorMock,
  fatal: fatalMock,
} satisfies Record<CriticalLevel, jest.Mock>;

const diagnosticLevels = [
  "debug",
  "info",
  "trace",
  "warn",
] satisfies DiagnosticLevel[];

const diagnosticLevelMocks = {
  debug: debugMock,
  info: infoMock,
  trace: traceMock,
  warn: warnMock,
} satisfies Record<DiagnosticLevel, jest.Mock>;

const { LoggerService } = await import("./service");

const loggerService = new LoggerService({
  level: "trace",
  filename: "service.unit.test.ts",
});

describe("LoggerService", () => {
  beforeEach(() => {
    debugMock.mockClear();
    errorMock.mockClear();
    fatalMock.mockClear();
    infoMock.mockClear();
    loggerMock.mockClear();
    traceMock.mockClear();
    warnMock.mockClear();
    inspectMock.mockClear();
  });

  describe("critical levels", () => {
    criticalLevels.forEach((level) => {
      it(`calls ${level} and verifies the formatted message is correct`, () => {
        const message = `logging ${level}`;
        const error = new Error(message);
        const mock = criticalLevelMocks[level];

        inspectMock.mockImplementationOnce(() => error.stack);

        loggerService[level](error);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(
          error,
          `${DEFAULT_ICONS[level]} ${message} ${error.stack}`
        );
      });
    });
  });

  describe("diagnostic levels", () => {
    diagnosticLevels.forEach((level) => {
      const message = `logging ${level}`;
      const mock = diagnosticLevelMocks[level];

      it(`calls ${level} with an undefined metadata and verifies the formatted message is correct`, () => {
        let metadata;

        loggerService[level](message, metadata);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(`${DEFAULT_ICONS[level]} ${message}`);
      });

      it(`calls ${level} with a null metadata and verifies the formatted message is correct`, () => {
        const metadata = null;

        loggerService[level](message, metadata);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(`${DEFAULT_ICONS[level]} ${message}`);
      });

      it(`calls ${level} with a boolean metadata and verifies the formatted message is correct`, () => {
        const metadata = true;

        loggerService[level](message, metadata);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(
          `${DEFAULT_ICONS[level]} ${message} true`
        );
      });

      it(`calls ${level} with a number metadata and verifies the formatted message is correct`, () => {
        const metadata = 0;

        loggerService[level](message, metadata);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(
          `${DEFAULT_ICONS[level]} ${message} 0`
        );
      });

      it(`calls ${level} with an object metadata and verifies the formatted message is correct`, () => {
        const metadata = {};

        inspectMock.mockImplementationOnce(() => "{}");

        loggerService[level](message, metadata);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(
          `${DEFAULT_ICONS[level]} ${message} {}`
        );
      });

      it(`calls ${level} with a string metadata and verifies the formatted message is correct`, () => {
        const metadata = "data";

        loggerService[level](message, metadata);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(
          `${DEFAULT_ICONS[level]} ${message} data`
        );
      });

      it(`calls ${level} with unsupported metadata type and verifies the formatted message is correct`, () => {
        const metadata = Symbol("data");

        loggerService[level](message, metadata);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(
          `${DEFAULT_ICONS[level]} ${message} [Invalid metadata type: symbol]`
        );
      });
    });
  });
});
