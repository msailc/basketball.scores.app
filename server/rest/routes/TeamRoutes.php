<?php

/**
 * @OA\Get(path="/teams/", tags={"teams"}, summary="Returns all teams from the api. ",
 *      @OA\Response(response=200,description="Fetch list of teams")
 * )
 */
Flight::route('GET /teams', function () {
    Flight::json(Flight::teamService()->get_all());
});

/**
 * @OA\Get(path="/teams/{id}", tags={"teams"}, summary="Returns a team by id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of team"),
 *     @OA\Response(response="200", description="Fetch team by id")
 * )
 */
Flight::route('GET /teams/@id', function ($id) {
    Flight::json(Flight::teamService()->get_by_id($id));
});

/**
 * @OA\Get(path="/teams/{id}/players", tags={"teams"}, summary="Returns a team's players by team id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of team"),
 *     @OA\Response(response="200", description="Fetch team's players by team id")
 * )
 */
Flight::route('GET /teams/@id/players', function ($id) {
    Flight::json(Flight::teamService()->get_team_players($id));
});

/**
* @OA\Post(
*     path="/teams",
*     description="Add a new teams",
*     tags={"teams"},
*     summary="Adds a new team",
*     security={{"ApiKeyAuth": {}}},
*     @OA\RequestBody(description="Basic team info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="team_name", type="string", example="Some name",	description="Name of the team"),
*           @OA\Property(property="team_country", type="string", example="USA",	description="Team country"),
*           @OA\Property(property="team_coach", type="string", example="Some coach name",	description="Team coach"),
*           @OA\Property(property="league_id", type="int", example="1",	description="League id"),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Team added"
*     ),
*     @OA\Response(
*         response=404,
*         description="Unexpected error"
*     )
* )
*/
Flight::route('POST /teams', function () {
    $data = Flight::request()->data->getData();
    $data['id'] = rand(100000, 100000000);
    Flight::json(Flight::teamService()->add($data));
});

/**
 * @OA\Delete(path="/teams/{id}", tags={"teams"}, summary="Deletes a team by id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of team"),
 *     @OA\Response(response="200", description="Delete team by id")
 * )
 */
Flight::route('DELETE /teams/@id', function ($id) {
    Flight::json(Flight::teamService()->delete($id));
});

?>