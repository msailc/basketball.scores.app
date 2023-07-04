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

    public function delete($id)
{
    $this->deleteTeamMatches($id);
    $this->deleteTeamPlayers($id);

    $stmt = $this->conn->prepare("DELETE FROM " . $this->table_name . " WHERE id=:id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
}

private function deleteTeamMatches($teamId)
{
    $stmt = $this->conn->prepare("DELETE FROM matches WHERE home_team_id=:teamId");
    $stmt->bindParam(':teamId', $teamId);
    $stmt->execute();

    $stmt = $this->conn->prepare("DELETE FROM matches WHERE away_team_id=:teamId");
    $stmt->bindParam(':teamId', $teamId);
    $stmt->execute();
}

private function deleteTeamPlayers($teamId)
{
    $stmt = $this->conn->prepare("DELETE FROM players WHERE team_id=:teamId");
    $stmt->bindParam(':teamId', $teamId);
    $stmt->execute();
}


}
?>
