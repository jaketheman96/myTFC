import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

export default class MatchesService {
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

  createMatch = async (matchInfo: object): Promise<object> => {
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
}
