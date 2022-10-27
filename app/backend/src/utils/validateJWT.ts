import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UsersModel';

const secret = process.env.JWT_SECRET || 'suasenhasecreta';

const validation = async (token: string): Promise<object | string> => {
  if (!token) return 'INVALID_TOKEN';
  const { email } = jwt.verify(token, secret) as jwt.JwtPayload;
  const user = await Users.findOne({ where: { email } });
  if (!user) return 'INVALID_TOKEN';
  return user;
};

export default { validation };
