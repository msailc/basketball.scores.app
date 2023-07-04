<?php
require_once __DIR__ . '/BaseDao.php';

class TeamDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("teams");
    }

    public function get_team_players($team_id)
    {
        return $this->query("SELECT * FROM players WHERE team_id = :team_id", ["team_id" => $team_id]);
    }

}
?>
