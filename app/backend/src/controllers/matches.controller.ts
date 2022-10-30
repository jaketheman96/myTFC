import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private matches = new MatchesService();

  getMatches = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const matchesInProgress = await this.matches.getMatchInProgress();
      return res.status(200).json(matchesInProgress);
    }
    const matches = await this.matches.getAllMatches();
    return res.status(200).json(matches);
  };
}
