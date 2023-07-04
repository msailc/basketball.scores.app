<?php

Flight::route('GET /matches', function () {

        Flight::json(Flight::matchService()->get_all_matches());
});

Flight::route('GET /matches/@id', function ($id) {
    Flight::json(Flight::matchService()->get_by_id($id));
});

Flight::route('GET /standings', function () {
    Flight::json(Flight::matchService()->get_standings());
});


?>