<?php

Flight::route('GET /news', function () {
    Flight::json(Flight::newsService()->get_all());
});

Flight::route('GET /news/@id', function ($id) {
    Flight::json(Flight::newsService()->get_by_id($id));
});

Flight::route('POST /news', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::newsService()->add($data));
});

Flight::route('PUT /news/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::newsService()->update($id, $data));
});

Flight::route('DELETE /news/@id', function ($id) {
    Flight::json(Flight::newsService()->delete($id));
});


?>