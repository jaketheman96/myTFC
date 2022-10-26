import * as bcrypt from 'bcryptjs';
import Login from '../interface/login.interface';
import Users from '../database/models/UsersModel';
import token from '../utils/token';

export default class LoginService {
  private _token: string;

  constructor(userInfos: Login) {
    this._token = token.generateToken(userInfos);
  }

  login = async (userInfos: Login) => {
    const { email, password } = userInfos;
    const user = await Users.findOne({ where: { email } });
    if (!user) return 'UNAUTHORIZED';
    const validation = await bcrypt.compare(password, user.password);
    if (!validation) return 'UNAUTHORIZED';
    return { token: this._token };
  };
}
