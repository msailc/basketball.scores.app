<?php

Flight::route('GET /players', function () {
    Flight::json(Flight::playerService()->get_all());
});

Flight::route('GET /players/@id', function ($id) {
    Flight::json(Flight::playerService()->get_by_id($id));
});

Flight::route('POST /players', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::playerService()->add($data));
});

Flight::route('PUT /players/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::playerService()->update($id, $data));
});

Flight::route('DELETE /players/@id', function ($id) {
    Flight::json(Flight::playerService()->delete($id));
});

?>