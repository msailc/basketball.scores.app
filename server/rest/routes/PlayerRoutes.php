<?php

Flight::route('GET /players', function () {
    Flight::json(Flight::playerService()->get_all());
});

Flight::route('GET /players/@id', function ($id) {
    Flight::json(Flight::playerService()->get_by_id($id));
});

?>