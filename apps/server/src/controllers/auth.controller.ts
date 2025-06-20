import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as service from '@/services/auth.service';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existing = await service.getExistingUser(email);

  if (existing) {
    res.status(400).json({ error: 'Email already in use' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await service.createUser(email, hashed);

  res.status(201).json({ id: user.id, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await service.getExistingUser(email);

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
};
