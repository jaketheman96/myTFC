import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  getAllMatches = async (_req: Request, res: Response): Promise<Response> => {
    const matchesService = new MatchesService();
    const matches = await matchesService.getAllMatches();
    return res.status(200).json(matches);
  };
}
