<?php
require_once __DIR__ . '/BaseDao.php';


class LeagueDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("leagues");
    }

}
?>
