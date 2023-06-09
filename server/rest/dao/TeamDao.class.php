<?php
require_once __DIR__ . '/BaseDao.php';


class TeamDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("teams");
    }

}
?>
