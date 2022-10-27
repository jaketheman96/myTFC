import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  getAllTeams = async (): Promise<Array<object>> => {
    const teams = await Teams.findAll();
    return teams;
  };

  getTeamById = async (id: number): Promise<object | string> => {
    const team = await Teams.findOne({ where: { id } });
    if (!team) return 'NOT_FOUND';
    return team;
  };
}
