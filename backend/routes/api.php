<?php

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
   return $request->user();
   Route::apiResource('booking', 'API\BookingController');
    Route::apiResource('space', 'API\SpacesController')->except([
       'create', 'edit'
    ]);    
});
Route::post('login', 'API\UserController@login');    
Route::apiResource('user', 'API\UserController');

//Route::get('getSpaces','API\SpacesController@index');
//Route::post('addSpace', 'API\SpacesController@create');
