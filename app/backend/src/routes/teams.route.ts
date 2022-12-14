import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsController = new TeamsController();
const router = Router();

router.get('/', teamsController.getAllTeams);

router.get('/:id', teamsController.getTeamById);

export default router;
