<?php

ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

require '../vendor/autoload.php';

use Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Requested-With');

require_once __DIR__ . '/services/TeamServices.php';
require_once __DIR__ . '/services/PlayerServices.php';
require_once __DIR__ . '/services/MatchServices.php';
require_once __DIR__ . '/services/LeagueServices.php';
require_once __DIR__ . '/services/NewsServices.php';
require_once __DIR__ . '/services/UserServices.php';

Flight::register('teamService', "TeamServices");
Flight::register('playerService', "playerServices");
Flight::register('matchService', "matchServices");
Flight::register('leagueService', "leagueServices");
Flight::register('newsService', "newsServices");
Flight::register('userService', "userServices");

require_once __DIR__ . '/routes/TeamRoutes.php';
require_once __DIR__ . '/routes/PlayerRoutes.php';
require_once __DIR__ . '/routes/MatchRoutes.php';
require_once __DIR__ . '/routes/LeagueRoutes.php';
require_once __DIR__ . '/routes/NewsRoutes.php';
require_once __DIR__ . '/routes/UserRoutes.php';

Flight::route('/*', function() 
{
    $path = Flight::request()->url;
    if ($path == '/login' || $path == '/docs.json') {
        return true;
    }
    $headers = getallheaders();
    if (@!$headers['Authorization']) {
        Flight::json(["message" => "Authorization is missing"], 403);
        return false;
    } else {
        try {
            $decoded = (array)JWT::decode($headers['Authorization'], new Key($_ENV['JWT_SECRET'], 'HS256'));
            Flight::set('user', $decoded);
            return true;
        } catch (\Exception $e) {
            Flight::json(["message" => "Authorization token is not valid"], 403);
            return false;
        }
    }
});

Flight::route('GET /', function () {
    echo "Hello";
});

Flight::start();
?>
