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

}
?>
