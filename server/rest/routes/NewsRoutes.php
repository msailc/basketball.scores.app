<?php

/**
 * @OA\Get(path="/news/", tags={"news"}, summary="Returns all news from the api. ",
 *      @OA\Response(response=200,description="Fetch list of news")
 * )
 */
Flight::route('GET /news', function () {
    Flight::json(Flight::newsService()->get_all());
});

/**
 * @OA\Get(path="/news/{id}", tags={"news"}, summary="Returns a news by id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of news"),
 *     @OA\Response(response="200", description="Fetch news by id")
 * )
 */
Flight::route('GET /news/@id', function ($id) {
    Flight::json(Flight::newsService()->get_by_id($id));
});

/**
* @OA\Post(
*     path="/news",
*     description="Add a new topic",
*     tags={"news"},
*     summary="Adds a new topic to the db",
*     security={{"ApiKeyAuth": {}}},
*     @OA\RequestBody(description="Basic topic info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="news_title", type="string", example="Some title",	description="Name of the topic"),
*           @OA\Property(property="news_content", type="string", example="Some text",	description="Topic content"),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="News added"
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
Flight::route('POST /news', function () {
    $data = Flight::request()->data->getData();
    $data['id'] = rand(100000, 100000000);
    Flight::json(Flight::newsService()->add($data));
});

/**
 * @OA\Delete(path="/news/{id}", tags={"news"}, summary="Deletes a news by id",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of news"),
 *     @OA\Response(response="200", description="Delete news by id")
 * )
 */
Flight::route('DELETE /news/@id', function ($id) {
    Flight::json(Flight::newsService()->delete($id));
});



?>