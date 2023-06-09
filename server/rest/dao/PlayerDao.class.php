<?php
require_once __DIR__ . '/BaseDao.php';


class PlayerDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("players");
    }

}
?>
