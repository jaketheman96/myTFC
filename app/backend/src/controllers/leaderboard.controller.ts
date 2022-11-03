import { Request, Response } from 'express';
import Leaderboard from '../interface/leaderboard.interface';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  getLeaderboard = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.leaderboardService.teamClassification() as Array<Leaderboard>;
    return res.status(200).json(response);
  };
}
