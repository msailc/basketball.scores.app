<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/MatchDao.class.php';

class MatchServices extends BaseService
{
    public function __construct()
    {
        parent::__construct(new MatchDao);
    }

    public function get_all_matches()
    {
        return $this->dao->get_all_matches();
    }

    public function get_standings()
    {
        return $this->dao->get_standings();
    }

    public function generate_matches()
    {
        $this->dao->generate_matches();
    }
}
?>