import jwt = require('jsonwebtoken');
import Login from '../interface/login.interface';

const secret = process.env.JWT_SECRET || 'password';

const generateToken = (userInfos: Login) => {
  const token = jwt.sign(userInfos, secret);
  return token;
};

export default { generateToken };
