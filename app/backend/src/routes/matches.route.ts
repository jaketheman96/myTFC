import { Router } from 'express';
import token from '../middlewares/jwt.validator';
import MatchesController from '../controllers/matches.controller';

const router = Router();
const matchesController = new MatchesController();

router.get('/', matchesController.getMatches);

router.post('/', token.validation, matchesController.createMatch);

router.patch('/:id', matchesController.updateMatch);

router.patch('/:id/finish', matchesController.finishMatch);

export default router;
