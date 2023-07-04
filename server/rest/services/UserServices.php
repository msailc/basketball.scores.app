<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/UserDao.class.php';

class UserServices extends BaseService
{
    public function __construct()
    {
        parent::__construct(new UserDao);
    }

    public function get_user_by_email($email)
    {
        return $this->dao->get_user_by_email($email);
    }

    public function create_user($user)
    {
        return $this->dao->insert($user);
    }
}
?>
