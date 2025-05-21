import { object, string } from 'yup';

const email = string()
  .required('Email is required.')
  .email('Must be a valid email.');

export const VerifyUserEmailRules = object().shape({
  email
});