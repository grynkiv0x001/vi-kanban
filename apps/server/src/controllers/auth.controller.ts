import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as service from '@/services/auth.service';

const JWT_SECRET = process.env.JWT_SECRET || 'access-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

const ACCESS_TOKEN_EXPIRE = '1m';
const REFRESH_TOKEN_EXPIRE = '7d';

const issueTokens = (userId: string, res: Response) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });

  res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    })
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 1000,
    });

  return { expiresIn: 60 };
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existing = await service.getExistingUser(email);

  if (existing) {
    res.status(400).json({ error: 'Email already in use' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await service.createUser(email, hashed);

  const tokens = issueTokens(user.id, res);

  res.status(201).json({
    email: user.email,
    id: user.id,
    ...tokens,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await service.getExistingUser(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const tokens = issueTokens(user.id, res);

  res.status(200).json(tokens);
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };

    const newAccessToken = jwt.sign({ userId: payload.userId }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE,
    });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 1000,
    });

    res.status(200).json({});
  } catch {
    res.sendStatus(403);
  }
};

export const logout = async (_: Request, res: Response) => {
  res
    .clearCookie('refreshToken', { path: '/auth/refresh' })
    .clearCookie('accessToken')
    .status(200)
    .json({});
};
