<?php
require_once __DIR__ . '/BaseDao.php';


class NewsDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("news");
    }

}
?>
