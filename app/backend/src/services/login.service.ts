import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import Login from '../interface/login.interface';
import Users from '../database/models/UsersModel';
import t from '../utils/token';
import JWT from '../utils/validateJWT';

export default class LoginService {
  private token: string;

  login = async (userInfos: Login) : Promise<object | string> => {
    this.token = t.generateToken(userInfos);
    const { email, password } = userInfos;
    const user = await Users.findOne({ where: { email } });
    if (!user) return 'UNAUTHORIZED';
    const validation = await bcrypt.compare(password, user.password);
    if (!validation) return 'UNAUTHORIZED';
    return { token: this.token };
  };

  getUserRole = async (token: string): Promise<object> => {
    const user = await JWT.validation(token) as JwtPayload;
    return { role: user.role };
  };
}
