<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 * @OA\Get(path="/users/", tags={"users"}, summary="Returns all users from the api. ",
 *      @OA\Response(response=200,description="Fetch list of users")
 * )
 */
Flight::route('GET /users', function () {
    Flight::json(Flight::usersService()->get_all());
});

/**
 * @OA\Get(path="/users/{email}", tags={"users"}, summary="Returns a user by email",
 *     @OA\Parameter(in="path", name="email", example="mustafaislamovich@gmail.com", description="Email of user"),
 *     @OA\Response(response="200", description="Fetch user by email")
 * )
 */
Flight::route('GET /users/@email', function ($email) {
        Flight::json(Flight::usersService()->get_user_by_email($email));
    });

/**
 * @OA\Post(
 *     path="/login",
 *     description="Login to the system",
 *     tags={"JWT"},
 *     @OA\RequestBody(description="Basic user info", required=true,
 *       @OA\MediaType(mediaType="application/json",
 *    			@OA\Schema(
 *    				@OA\Property(property="email", type="string", example="mustafaislamovich@gmail.com",	description="Email"),
 *    				@OA\Property(property="password", type="string", example="1312",	description="Password" )
 *          )
 *     )),
 *     @OA\Response(
 *         response=200,
 *         description="JWT token on successful response",
 *     )
 * )
 */
Flight::route('POST /login', function () {
    $login = Flight::request()->data->getData();
    if (isset($login['email'])) {  // Check if the "email" key exists
        $user = Flight::userService()->get_user_by_email($login['email']);
        if (isset($user['id'])) {
            if (password_verify($login['password'], $user['password'])) {
                unset($user['password']);
                $jwt = JWT::encode($user, $_ENV['JWT_SECRET'], 'HS256');
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

//create user
/**
 * @OA\Post(path="/users", tags={"users"}, summary="Creates a user",
 *     @OA\RequestBody(description="Basic user info", required=true,
 *        @OA\MediaType(mediaType="application/json",
 *   			@OA\Schema(
 *  				@OA\Property(property="username", type="string", example="Mustafa",	description="Username"),
 *                 @OA\Property(property="email", type="string", example="mustafaislamovich@gmail.com)",	description="Email"),
 *                @OA\Property(property="password", type="string", example="1312",	description="Password" )
 *            )
 *      )
 *    ),
 *    @OA\Response(response="200", description="User created")
 * )
 * )
    */

    Flight::route('POST /users', function () {
        $data = Flight::request()->data->getData();
    
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
    
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
        $user = [
            'username' => $username,
            'email' => $email,
            'password' => $hashedPassword
        ];
    
        $createdUser = Flight::userService()->create_user($user);
    
        if ($createdUser) {
            Flight::json($createdUser, 201);
        } else {
            Flight::json(["message" => "User creation failed"], 500);
        }
    });
    
    
?>