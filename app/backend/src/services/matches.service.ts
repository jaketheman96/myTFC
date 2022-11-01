import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import Imatches from '../interface/matches.interface';
import TeamsService from './teams.service';

export default class MatchesService {
  private _teams = new TeamsService();

  getAllMatches = async (): Promise<Array<object>> => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };

  getMatchInProgress = async (query: boolean): Promise<Array<object>> => {
    const matches = await Matches.findAll({
      where: { inProgress: query },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };

  createMatch = async (matchInfo: Imatches): Promise<object | string> => {
    const { awayTeam, homeTeam } = matchInfo;
    if (awayTeam === homeTeam) return 'Unprocessable Entity';
    const team1 = await this._teams.getTeamById(JSON.stringify(awayTeam)) as object | string;
    const team2 = await this._teams.getTeamById(JSON.stringify(homeTeam)) as object | string;
    if (team1 === 'NOT_FOUND' || team2 === 'NOT_FOUND') return 'NOT_FOUND';
    const create = await Matches.create({ ...matchInfo, inProgress: true });
    return create;
  };

  finishMatch = async (id: string): Promise<object> => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
    return { message: 'finished' };
  };

  updateMatch = async (matchInfo: Imatches, id: string): Promise<void> => {
    const { homeTeamGoals, awayTeamGoals } = matchInfo;
    await Matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  };
}
