import { Request, Response } from 'express';
import typeFunc from '../utils/booleanConverter';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private matches = new MatchesService();

  getMatches = async (req: Request, res: Response): Promise<Response> => {
    const inProgress = req.query.inProgress as string;
    if (!inProgress) {
      const matches = await this.matches.getAllMatches();
      return res.status(200).json(matches);
    }
    const convertedType = typeFunc.booleanConverter(inProgress);
    const matchesInProgress = await this.matches.getMatchInProgress(convertedType);
    return res.status(200).json(matchesInProgress);
  };

  createMatch = async (req: Request, res: Response): Promise<Response> => {
    const addingMatch = await this.matches.createMatch(req.body);
    return res.status(201).json(addingMatch);
  };
}
