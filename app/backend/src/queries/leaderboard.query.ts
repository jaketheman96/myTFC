const query = `
SELECT team_name as name,
SUM(IF(home_team_goals>away_team_goals, 1, 0))*3 +
SUM(IF(home_team_goals=away_team_goals ,1, 0)) AS totalPoints,
COUNT(home_team) as totalGames,
SUM(IF(home_team_goals>away_team_goals, 1, 0)) AS totalVictories,
SUM(IF(home_team_goals=away_team_goals, 1, 0)) AS totalDraws,
SUM(IF(home_team_goals<away_team_goals, 1, 0)) AS totalLosses,
SUM(home_team_goals) AS goalsFavor,
SUM(away_team_goals) AS goalsOwn,
SUM(home_team_goals-away_team_goals) AS goalsBalance,
ROUND((SUM(IF(home_team_goals>away_team_goals, 1, 0))*3 +
SUM(IF(home_team_goals=away_team_goals ,1, 0)))/(COUNT(home_team)*3)* 100,2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches
JOIN TRYBE_FUTEBOL_CLUBE.teams on matches.home_team = teams.id
WHERE in_progress=0 GROUP BY home_team
ORDER BY totalPoints DESC,totalVictories DESC,goalsBalance DESC,goalsFavor DESC,goalsOwn
`;

export default query;
