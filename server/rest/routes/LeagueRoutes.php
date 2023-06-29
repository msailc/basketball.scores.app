<?php

Flight::route('GET /leagues', function () {
    Flight::json(Flight::leagueService()->get_all());
});

Flight::route('GET /leagues/@id', function ($id) {
    Flight::json(Flight::leagueService()->get_by_id($id));
});


?>