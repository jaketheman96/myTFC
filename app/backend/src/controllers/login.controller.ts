import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  login = async (req: Request, res: Response) => {
    const service = new LoginService(req.body);
    const response = await service.login(req.body);
    if (response === 'UNAUTHORIZED') {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json(response);
  };
}
