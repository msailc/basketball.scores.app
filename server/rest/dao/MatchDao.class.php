<?php
require_once __DIR__ . '/BaseDao.php';

class MatchDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("matches");
    }

    public function get_all_matches()
    {
        $stmt = $this->conn->prepare("
            SELECT m.id, m.match_date, 
                   t1.team_name AS home_team_name, 
                   t2.team_name AS away_team_name, 
                   t1.team_country AS location,
                   m.home_team_score, 
                   m.away_team_score, 
                   m.league_id 
            FROM " . $this->table_name . " m
            INNER JOIN teams t1 ON m.home_team_id = t1.id
            INNER JOIN teams t2 ON m.away_team_id = t2.id
        ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_standings()
    {
        $stmt = $this->conn->prepare("
            SELECT t.team_name, t.league_id, t.id, 
                   SUM(CASE WHEN m.home_team_score > m.away_team_score THEN 2
                            ELSE 1 END) AS points,
                   COUNT(*) AS played,
                   SUM(CASE WHEN m.home_team_score > m.away_team_score THEN 1
                            ELSE 0 END) AS wins,
                     SUM(CASE WHEN m.home_team_score < m.away_team_score THEN 1
                             ELSE 0 END) AS losses,
                   SUM(m.home_team_score) AS points_for,
                   SUM(m.away_team_score) AS points_against,
                   SUM(m.home_team_score) - SUM(m.away_team_score) AS points_difference
            FROM matches m
            INNER JOIN teams t ON m.home_team_id = t.id
            GROUP BY t.team_name
            ORDER BY points DESC, points_difference DESC, points_for DESC
        ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
?>
