import { Model, INTEGER, BOOLEAN } from 'sequelize';
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
      type: BOOLEAN,
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

Teams.hasMany(Matches, {
  foreignKey: 'id',
  as: 'homeTeam',
});

Teams.hasMany(Matches, {
  foreignKey: 'id',
  as: 'awayTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default Matches;
