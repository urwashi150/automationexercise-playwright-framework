import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://automationexercise.com',
  API_BASE_URL: process.env.API_BASE_URL || 'https://automationexercise.com/api',
  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT) || 30000,
  HEADLESS: process.env.HEADLESS !== 'false',
  TEST_USER_EMAIL: process.env.TEST_USER_EMAIL || '',
  TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD || '',
};
