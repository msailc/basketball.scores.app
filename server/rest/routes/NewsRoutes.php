<?php

Flight::route('GET /news', function () {
    Flight::json(Flight::newsService()->get_all());
});

Flight::route('GET /news/@id', function ($id) {
    Flight::json(Flight::newsService()->get_by_id($id));
});


?>