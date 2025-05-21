import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserLogin {
  email: string;
  password: string;
}