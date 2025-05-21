import mongoose from 'mongoose';
import logger from './logger';
import { envConfig } from '@/config/env.config';
import { adminSeeder } from '@/seeder/admin.seeder';

export async function databaseConnect(): Promise<void> {
  try {
    await mongoose.connect(envConfig.DB_DATABASE_URL);
    logger.info('MongoDB connection has been established successfully.');
    // await adminSeeder();
  } catch (error) {
    logger.error(`Unable to connect to MongoDB. ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}