<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/NewsDao.class.php';

class NewsServices extends BaseService
{
    public function __construct()
    {
        parent::__construct(new NewsDao);
    }

}
?>