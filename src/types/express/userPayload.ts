export interface UserPayload {
  userId: string;
  role: 'admin' | 'user';
  email: string;
}