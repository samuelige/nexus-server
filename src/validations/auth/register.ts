import { object, string } from 'yup';

const firstName = string()
  .required('First name is required.')
  .min(3, 'First name must be at least 3 characters.')
  .max(50, 'First name must be at most 50 characters.');

const lastName = string()
  .required('Last name is required.')
  .min(3, 'Last name must be at least 3 characters.')
  .max(50, 'Last name must be at most 50 characters.');

const email = string()
  .required('Email is required.')
  .email('Must be a valid email.');

const password = string()
  .required('Password is required.')
  .min(6, 'Password must be at least 6 characters.');

const location = string()
  .max(20, 'Location must be at most 20 characters.')
  .default('my city');

export const CreateUserRules = object().shape({
  first_name: firstName,
  last_name: lastName,
  email,
  password,
  location,
});