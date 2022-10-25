import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  login = async (req: Request, res: Response) => {
    const service = new LoginService(req.body);
    const response = await service.login(req.body);
    return res.status(200).json(response);
  };

  teste = () => { console.log('teste'); };
}
