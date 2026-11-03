/**
 * Système de logging personnalisé qui s'adapte selon l'environnement
 * En production, les logs info et debug sont désactivés
 */

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

type LoggerOptions = {
  module?: string;
  minLevel?: LogLevel;
};

class Logger {
  private module: string;
  private minLevel: LogLevel;
  private static isProduction = process.env.NODE_ENV === "production";

  constructor(options: LoggerOptions = {}) {
    this.module = options.module || "app";

    // En production, on désactive les logs de niveau info et debug
    this.minLevel = Logger.isProduction
      ? LogLevel.WARN
      : options.minLevel ?? LogLevel.DEBUG;
  }

  private logWithLevel(level: LogLevel, message: string, ...args: unknown[]): void {
    if (level < this.minLevel) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}][${this.module}]`;

    switch (level) {
      case LogLevel.DEBUG:
        if (!Logger.isProduction)
          console.debug(`${prefix} 🔍 ${message}`, ...args);
        break;
      case LogLevel.INFO:
        if (!Logger.isProduction)
          console.info(`${prefix} ℹ️ ${message}`, ...args);
        break;
      case LogLevel.WARN:
        console.warn(`${prefix} ⚠️ ${message}`, ...args);
        break;
      case LogLevel.ERROR:
        console.error(`${prefix} ❌ ${message}`, ...args);
        break;
    }
  }

  debug(message: string, ...args: unknown[]): void {
    this.logWithLevel(LogLevel.DEBUG, message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.logWithLevel(LogLevel.INFO, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logWithLevel(LogLevel.WARN, message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.logWithLevel(LogLevel.ERROR, message, ...args);
  }
}

/**
 * Crée un logger pour un module spécifique
 */
export function createLogger(module: string): Logger {
  return new Logger({ module });
}

export default Logger;
