import { PlatformUser } from "@enterprise-commerce/core/platform/types";
import bcrypt from 'bcryptjs';
import openDb from '../db/db';

export const createUser = async (email: string, password: string) => {
  const db = await openDb();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
  const newUser = await db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    email,
    hashedPassword
  );
  return newUser;
  } catch (error) {
    console.error(error);
  } finally {
    await db.close();
  }
} // Implement the createUser function

export const findUserById = async (id: string): Promise<PlatformUser | null> => {
  const db = await openDb();
  const user = await db.get<PlatformUser>('SELECT * FROM users WHERE id = ?', id);
  await db.close();
  return user || null;
};

/**
 * Compares a plain text password with a hashed password.
 *
 * This function uses bcrypt to asynchronously compare a plain text password with a hashed password 
 * to determine if they match.
 *
 * @param {string} password - The plain text password to be compared. (input from user when trying to login)
 * @param {string} hashedPassword - The hashed password to compare against. (encrypted password stored in database)
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, 
 *                               and `false` otherwise.
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword); 
};
