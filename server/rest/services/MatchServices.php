<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/MatchDao.class.php';

class MatchServices extends BaseService
{
    public function __construct()
    {
        parent::__construct(new MatchDao);
    }

}
?>