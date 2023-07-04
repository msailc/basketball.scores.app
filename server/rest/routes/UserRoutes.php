<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::route('GET /users', function () {
    Flight::json(Flight::usersService()->get_all());
});

Flight::route('GET /users/@email', function ($email) {
        Flight::json(Flight::usersService()->get_user_by_email($email));
    });

    Flight::route('POST /login', function () {
        $login = Flight::request()->data->getData();
        if (isset($login['email'])) {  // Check if the "email" key exists
            $user = Flight::userService()->get_user_by_email($login['email']);
            if (isset($user['id'])) {
                if (password_verify($login['password'], $user['password'])) {
                    unset($user['password']);
                    $jwt = JWT::encode($user, Config::JWT_SECRET(), 'HS256');
                    Flight::json(['token' => $jwt]);
                } else {
                    Flight::json(["message" => "Incorrect password"], 404);
                }
            } else {
                Flight::json(["message" => "User doesn't exist"], 404);
            }
        } else {
            Flight::json(["message" => "Email is missing"], 400);
        }
    });

    Flight::route('POST /users', function () {
        $data = Flight::request()->data->getData();
    
        // Extract user data from the request
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
    
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
        // Create a new user object or array with the extracted data
        $user = [
            'username' => $username,
            'email' => $email,
            'password' => $hashedPassword
            // Add any other relevant user data here
        ];
    
        // Call the user service to create the user
        $createdUser = Flight::userService()->create_user($user);
    
        // Return the created user or an appropriate response
        if ($createdUser) {
            Flight::json($createdUser, 201);
        } else {
            Flight::json(["message" => "User creation failed"], 500);
        }
    });
    
    
?>