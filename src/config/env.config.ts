import dotenv from 'dotenv';
import { cleanEnv, str, port, num, } from 'envalid';

dotenv.config();

export const envConfig = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: port({ default: 5000 }),
  DB_DATABASE_URL: str(),
  CLIENT_URL: str(),
  JWT_SALT: num(),
  JWT_SECRET: str(),
  JWT_LIFETIME: str(),
  DEFAULT_ADMIN_EMAIL: str(),
  DEFAULT_ADMIN_PASSWORD: str(),
  SENDER_EMAIL: str(),
  SENDER_PASSWORD: str(),
  SMTP_HOST: str(),
  SMTP_PORT: num(),
});