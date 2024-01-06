import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { verifyAccessToken } from '../utils/jwt.server';

interface AuthRequest extends Request {
  user?: String; // Ajusta el tipo según la estructura del objeto 'user'
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized('Access token is required'));
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(createError.Unauthorized());
  }

  try {
    const user = await verifyAccessToken(token);
    req.user = user;
    next();
  } catch (e: any) {
    next(createError.Unauthorized(e.message));
  }
};

export default auth;
