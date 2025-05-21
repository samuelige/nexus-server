import { object, string } from 'yup';

const email = string()
  .required('Email is required.')
  .email('Must be a valid email.');

const password = string()
  .required('Password is required.')
  .min(6, 'Password must be at least 6 characters.');

export const LoginUserRules = object().shape({
  email,
  password,
});