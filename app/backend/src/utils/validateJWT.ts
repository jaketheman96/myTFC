import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UsersModel';

const secret = process.env.JWT_SECRET || 'suasenhasecreta';

const validation = async (token: string): Promise<object | null> => {
  try {
    const { email } = jwt.verify(token, secret) as jwt.JwtPayload;
    const user = await Users.findOne({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};

export default { validation };
