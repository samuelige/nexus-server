import { envConfig } from '@/config/env.config';
import { transporter } from './mailer';
import logger from '@/server/logger';

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${envConfig.CLIENT_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: envConfig.SENDER_EMAIL,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Verification email sent to ${email}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Failed to send verification email to ${email}: ${errorMessage}`);
    throw new Error('Verification email could not be sent. Please try again later.');
  }
};