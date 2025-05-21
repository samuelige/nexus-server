import { envConfig } from '@/config/env.config';
import User  from '@/model/user.model';
import logger from '@/server/logger';
import bcrypt from 'bcryptjs';
export const adminSeeder = async () => {
  try {
    const existingAdmin = await User.findOne({ email: envConfig.DEFAULT_ADMIN_EMAIL });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(Number(envConfig.JWT_SALT));
      const hashedPassword = await bcrypt.hash(envConfig.DEFAULT_ADMIN_PASSWORD, salt);
      await User.create({
        first_name: 'Super',
        last_name: 'Admin',
        email: envConfig.DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
        location: 'NG',
        isVerified: true
      });
      logger.info('Default admin created');
    } else {
      logger.info('Default admin already exists');
    }
  } catch (err: any) {
    logger.error(`Error creating default admin: ${err.message}`);
    logger.error(err.stack);
  }
};