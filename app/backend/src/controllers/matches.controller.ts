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
    if (addingMatch === 'NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (addingMatch === 'Unprocessable Entity') {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return res.status(201).json(addingMatch);
  };

  finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const matchToFinish = await this.matches.finishMatch(id);
    return res.status(200).json(matchToFinish);
  };

  updateMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.matches.updateMatch(req.body, id);
    return res.status(200).json({ message: 'Resultado alterado com sucesso!' });
  };
}
