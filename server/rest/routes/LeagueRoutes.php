<?php


/**
 * @OA\Get(path="/leagues/", tags={"leagues"}, summary="Returns all leagues from the api. ",
 *      @OA\Response(response=200,description="Fetch list of leagues")
 * )
 */
Flight::route('GET /leagues', function () {
    Flight::json(Flight::leagueService()->get_all());
});

/**
 * @OA\Get(path="/leagues/{id}", tags={"leagues"}, summary="Returns a league by id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of league"),
 *     @OA\Response(response="200", description="Fetch league by id")
 * )
 */
Flight::route('GET /leagues/@id', function ($id) {
    Flight::json(Flight::leagueService()->get_by_id($id));
});


?>