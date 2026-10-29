/**
 * Server configuration
 *
 * Centralized configuration management for the server.
 * All environment variables and app settings are validated and exported from here.
 *
 * Usage:
 *      import config from './config/index.ts';
 */

import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

/**
 * Get optional environment variable with default
 * @param {string} name - Environment variable name
 * @param {string} defaultValue - Default value if not set
 * @returns {string} The value or default
 */
const getEnv = (name: string, defaultValue: string = ''): string => {
    return process.env[name] || defaultValue;
};

const config = {
    port: parseInt(getEnv('PORT', '8080'), 10), // Default: 8080
    nodeEnv: getEnv('NODE_ENV', 'production'), // Values: 'development', 'production', 'test'
    database: {
        url: getEnv('DATABASE_URL')
    },
    security: {
        rateLimitWindowMs: 10 * 60 * 1_000, // 10 minutes
        rateLimitMax: 100, // Maximum requests per window per IP
    },
    cors: {
        origin: getEnv('CORS_ORIGIN', '*') // '*' or a comma-separated list
    }
};

// Validate critical environment variables
if (!config.database.url) {
  console.warn('⚠️ Warning: DATABASE_URL environment variable is not set.');
}

export default config;
