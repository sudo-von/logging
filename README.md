# LoggerService

`LoggerService` is a modern, extensible, and type-safe logging utility built on top of [`pino`](https://github.com/pinojs/pino), 
providing structured log formatting, customizable icons per level, and metadata support.

## 📦 Installation

This package includes the built dist folder in the repository because there are currently no plans to publish it to the public npm registry.

Consumers are expected to install it directly from GitHub, and the committed output ensures compatibility without requiring local builds.

```bash
npm install github:sudo-von/logging#vX.Y.Z
```

## 🚀 Usage

```ts
import { LoggerFactory } from "@sudo-von/logging";

const filename = "...";

const logger = LoggerFactory.create({
  level: "trace",
  filename,
});

/* Diagnostic levels. */
const message = "...";
const metadata = {};

logger.trace(message, metadata);
logger.debug(message, metadata);
logger.info(message, metadata);
logger.warn(message, metadata);

/* Critical levels. */
const error = new Error("...");

logger.error(error);
logger.fatal(error);
```

### 🧾 Metadata

Metadata can be:

```bash
- boolean
- number
- string
- object
```

Unsupported types like symbol or function will be labeled as invalid in output.

## 🧪 Testing

The codebase is tested using Jest with ESM support and mocks.

```bash
npm test
```

## 📁 Project Structure

```bash
├── abstracts                # Factory and service abstract classes
├── service.ts               # Pino-based implementation
├── factory.ts               # Factory for instantiation
├── types.ts                 # Type definitions
├── constant.ts              # Default icon mappings
└── service.unit.test.ts     # Unit tests
```

## 🔐 ESM Compatibility

If using ESM, prefer import.meta.url instead of __filename or __dirname.