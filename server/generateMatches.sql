SET @match_id := 1;
INSERT INTO matches (id, match_date, home_team_id, away_team_id, home_team_score, away_team_score, league_id)
SELECT
  @match_id := @match_id + 1 AS id,
  CURDATE() AS match_date,
  t1.id AS home_team_id,
  t2.id AS away_team_id,
  FLOOR(RAND() * 100) AS home_team_score,
  FLOOR(RAND() * 100) AS away_team_score,
  l.id AS league_id
FROM
  teams t1
JOIN
  teams t2 ON t1.id <> t2.id
JOIN
  leagues l ON t1.league_id = l.id AND t2.league_id = l.id;
