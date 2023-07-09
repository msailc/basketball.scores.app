<?php

/**
 * @OA\Get(path="/players/", tags={"players"}, summary="Returns all players from the api. ",
 *      @OA\Response(response=200,description="Fetch list of players")
 * )
 */
Flight::route('GET /players', function () {
    Flight::json(Flight::playerService()->get_all());
});

/**
 * @OA\Get(path="/players/{id}", tags={"players"}, summary="Returns a player by id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of player"),
 *     @OA\Response(response="200", description="Fetch player by id")
 * )
 */
Flight::route('GET /players/@id', function ($id) {
    Flight::json(Flight::playerService()->get_by_id($id));
});

/**
* @OA\Post(
*     path="/players",
*     description="Add a new player",
*     tags={"players"},
*     summary="Adds a new player to the team",
*     security={{"ApiKeyAuth": {}}},
*     @OA\RequestBody(description="Basic player info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="player_name", type="string", example="Some player name",	description="Name of the player"),
*           @OA\Property(property="player_age", type="int", example="18",	description="Player age"),
*           @OA\Property(property="player_country", type="string", example="Some country",	description="Player country"),
*           @OA\Property(property="team_id", type="int", example="1",	description="Team id"),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Player added"
*     ),
*     @OA\Response(
*         response=404,
*         description="Unexpected error"
*     ),
*     @OA\Response(
*         response=403,
*         description="JWT token not passed"
*     )
* )
*/
Flight::route('POST /players', function () {
    $data = Flight::request()->data->getData();
    $data['id'] = rand(100000, 100000000);
    Flight::json(Flight::playerService()->add($data));
});

/**
 * @OA\Delete(path="/players/{id}", tags={"players"}, summary="Deletes a player by id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of player"),
 *     @OA\Response(response="200", description="Delete player by id")
 * )
 */
Flight::route('DELETE /players/@id', function ($id) {
    Flight::json(Flight::playerService()->delete($id));
});

?>