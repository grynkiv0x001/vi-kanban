import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'access-secret';

export const authenticateToken = (req: Request & { userId: string }, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.userId = payload.userId;

    next();
  });
};
