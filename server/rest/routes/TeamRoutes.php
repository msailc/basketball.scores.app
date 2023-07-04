<?php

Flight::route('GET /teams', function () {
    Flight::json(Flight::teamService()->get_all());
});

Flight::route('GET /teams/@id', function ($id) {
    Flight::json(Flight::teamService()->get_by_id($id));
});

Flight::route('GET /teams/@id/players', function ($id) {
    Flight::json(Flight::teamService()->get_team_players($id));
});

?>