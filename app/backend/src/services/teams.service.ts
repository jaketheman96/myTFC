import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  getAllTeams = async (): Promise<Array<object>> => {
    const teams = await Teams.findAll();
    return teams;
  };
}
