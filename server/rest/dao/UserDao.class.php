<?php
require_once __DIR__.'/BaseDao.php';

class UserDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("users");
    }

    public function get_user_by_email($email)
    {
        return $this->query_unique("SELECT * FROM users WHERE email = :email", ["email" => $email]);
    }

    public function insert($user)
    {
        $sql = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
        $stmt= $this->conn->prepare($sql);
        $stmt->execute($user);
        $user['id'] = $this->conn->lastInsertId();
        return $user;
    }
}
?>