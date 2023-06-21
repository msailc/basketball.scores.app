<?php

Flight::route('GET /standings', function () {
    Flight::json(Flight::standingService()->get_all());
});

?>