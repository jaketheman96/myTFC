import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  private loginService = new LoginService();

  login = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.loginService.login(req.body);
    if (response === 'UNAUTHORIZED') {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json(response);
  };

  getUserRole = async (req: Request, res: Response) => {
    const token = req.header('Authorization') as string;
    const response = await this.loginService.getUserRole(token);
    if (response === 'INVALID_TOKEN') return res.status(401).json({ message: response });
    return res.status(200).json(response);
  };
}
