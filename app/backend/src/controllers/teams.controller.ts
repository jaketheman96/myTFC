import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  private teams = new TeamsService();

  getAllTeams = async (_req: Request, res: Response): Promise<Response> => {
    const allTeams = await this.teams.getAllTeams();
    return res.status(200).json(allTeams);
  };

  getTeamById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const team = await this.teams.getTeamById(id);
    if (team === 'NOT_FOUND') return res.status(404).json({ message: 'Team not found' });
    return res.status(200).json(team);
  };
}
