import { envConfig } from "@/config/env.config";
import { AuthService } from "@/services/auth.service";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { CreateUserRules, LoginUserRules, VerifyUserEmailRules } from "@/validations/auth";
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const authService = new AuthService();

export const registerController = async (req:Request, res: Response) => {
  await CreateUserRules.validate(req?.body, {abortEarly: false});
  const user = await authService.create({...req.body});
  const token = user.createJWT();
  // await sendVerificationEmail(user.email, token);
  res.status(StatusCodes.CREATED).json({user: {name: user.first_name}, token});
};

export const loginController = async (req:Request, res: Response) => {
  await LoginUserRules.validate(req.body, {abortEarly: false});
  const user = await authService.login({...req.body});
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user:{name:user.first_name}, token})
};
export const verifyEmailController = async (req:Request, res: Response) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, envConfig.JWT_SECRET) as { email: string };
  await authService.verifyEmail(decoded.email);
  res.status(StatusCodes.OK).json({ message: 'Email verified successfully' });
};
