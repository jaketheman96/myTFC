import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UsersModel';

const secret = process.env.JWT_SECRET || 'suasenhasecreta';
const tokenMessage = 'Token must be a valid token';

const validation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization') as string;
    const { email } = jwt.verify(token, secret) as jwt.JwtPayload;
    const user = await Users.findOne({ where: { email } });
    if (!user) res.status(401).json({ message: tokenMessage });
    return next();
  } catch (error) {
    return res.status(401).json({ message: tokenMessage });
  }
};

export default { validation };
