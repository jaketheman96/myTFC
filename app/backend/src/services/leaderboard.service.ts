import query from '../queries/leaderboard.query';
import Matches from '../database/models/MatchesModel';
import Leaderboard from '../interface/leaderboard.interface';

export default class LeaderboardService {
  teamClassification = async (): Promise<Leaderboard[]> => {
    const [leaderboard] = await Matches.sequelize?.query(query) as Array<Leaderboard[]>;
    return leaderboard;
  };
}
