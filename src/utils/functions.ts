import { getUserByEmail } from '../mockDB/users';

export const isAvailableEmail = (email: string) => new Promise<boolean>((resolve) => {
  const user = getUserByEmail(email);
  return resolve(!user);
});