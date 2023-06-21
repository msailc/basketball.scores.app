<?php
require_once __DIR__ . '/BaseDao.php';


class StandingDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("standings");
    }

}
?>
