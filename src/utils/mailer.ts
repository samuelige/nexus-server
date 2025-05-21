import { envConfig } from '@/config/env.config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: envConfig.SMTP_HOST,
  port: envConfig.SMTP_PORT,
  auth: {
    user: envConfig.SENDER_EMAIL,
    pass: envConfig.SENDER_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection failed:', error);
  } else {
    console.log('SMTP server is ready to take messages:', success);
  }
});