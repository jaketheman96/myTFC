import Login from '../interface/login.interface';
import Users from '../database/models/UsersModel';
import token from '../utils/token';

export default class LoginService {
  private _token: string;

  constructor(userInfos: Login) {
    this._token = token.generateToken(userInfos);
  }

  login = async (userInfos: Login) => {
    const { email } = userInfos;
    const user = await Users.findOne({ where: { email } });
    if (!user) return { type: 'NOT_FOUND', message: 'User not found' };
    return { token: this._token };
  };
}
