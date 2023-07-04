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

Flight::route('POST /teams', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::teamService()->add($data));
});

Flight::route('PUT /teams/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::teamService()->update($id, $data));
});

Flight::route('DELETE /teams/@id', function ($id) {
    Flight::json(Flight::teamService()->delete($id));
});

?>