<?php

/**
 * @OA\Get(path="/matches/", tags={"matches"}, summary="Returns all matches from the api. ",
 *      @OA\Response(response=200,description="Fetch list of matches")
 * )
 */
Flight::route('GET /matches', function () {

        Flight::json(Flight::matchService()->get_all_matches());
});

/**
 * @OA\Get(path="/matches/{id}", tags={"matches"}, summary="Returns a match by id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of match"),
 *     @OA\Response(response="200", description="Fetch match by id")
 * )
 */
Flight::route('GET /matches/@id', function ($id) {
    Flight::json(Flight::matchService()->get_by_id($id));
});

/**
 * @OA\Get(path="/standings/", tags={"matches"}, summary="Returns all standings from the api. ",
 *      @OA\Response(response=200,description="Fetch team standings")
 * )
 */
Flight::route('GET /standings', function () {
    Flight::json(Flight::matchService()->get_standings());
});


/**
 * @OA\Get(path="/matches/generate-matches", tags={"matches"}, summary="Generates matches for the teams with no matches",
 *      @OA\Response(response=200,description="Matches generated successfully")
 * )
 */
Flight::route('GET /generate-matches', function () {
    Flight::matchService()->generate_matches();
    Flight::json(['message' => 'Matches generated successfully']);
});

?>