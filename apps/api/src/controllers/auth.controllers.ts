import { PlatformUser } from "@enterprise-commerce/core/platform/types";
import { Request, Response } from 'express';
import { createUser } from "../models/User";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const newUser: PlatformUser = {
    id: null,
    email,
    password
  };

  try {
    const createdUser = await createUser(newUser.email, newUser.password);
    res.status(201).json({ message: 'User registered successfully', userId: createdUser.lastID });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
  res.end();
};

