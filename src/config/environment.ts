import { config } from 'dotenv';

class Environment {
  constructor() {
    config();
  }

  get app(): string {
    return process.env.APP.toUpperCase();
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  get port(): number {
    return parseInt(process.env.PORT || '80', 10);
  }

  get apiConfig(): {
    version: string;
    prefix: string;
  } {
    return {
      version: process.env.API_VERSION,
      prefix: process.env.API_PREFIX,
    };
  }
}

export const environment = new Environment();
