<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/TeamDao.class.php';

class TeamServices extends BaseService
{
    public function __construct()
    {
        parent::__construct(new TeamDao);
    }

}
?>