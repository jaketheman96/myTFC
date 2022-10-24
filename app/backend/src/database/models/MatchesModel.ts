import { Model, INTEGER } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team',
    },
    homeTeamGoals: {
      type: INTEGER,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team',
    },
    awayTeamGoals: {
      type: INTEGER,
      field: 'away_team_goals',
    },
    inProgress: {
      type: INTEGER,
      field: 'in_progress',
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Teams.hasMany(Matches);
Matches.belongsTo(Teams);

export default Matches;
