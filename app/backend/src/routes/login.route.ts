import { Router } from 'express';
import l from '../middlewares/loginFields.validation';
import LoginController from '../controllers/login.controller';

const loginController = new LoginController();
const router = Router();

router.post('/', l.loginFieldsValidation, loginController.login);

export default router;
