<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/LeagueDao.class.php';

class LeagueServices extends BaseService
{
    public function __construct()
    {
        parent::__construct(new LeagueDao);
    }

}
?>