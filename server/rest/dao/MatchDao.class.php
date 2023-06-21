<?php
require_once __DIR__ . '/BaseDao.php';


class MatchDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("matches");
    }

}
?>
