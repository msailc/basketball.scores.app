<?php
ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

require '../vendor/autoload.php';

require_once __DIR__ . '/services/TeamServices.php';
require_once __DIR__ . '/services/PlayerServices.php';
require_once __DIR__ . '/services/MatchServices.php';

Flight::register('teamService', "TeamServices");
Flight::register('playerService', "playerServices");
Flight::register('matchService', "matchServices");

require_once __DIR__ . '/routes/TeamRoutes.php';
require_once __DIR__ . '/routes/PlayerRoutes.php';
require_once __DIR__ . '/routes/MatchRoutes.php';

Flight::route('GET /', function () {
    echo "Hello";
});

Flight::start();
?>
