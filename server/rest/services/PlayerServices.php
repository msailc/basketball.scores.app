<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/PlayerDao.class.php';

class PlayerServices extends BaseService
{
    public function __construct()
    {
        parent::__construct(new PlayerDao);
    }

}
?>