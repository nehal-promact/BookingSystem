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
});
 Route::apiResource('booking', 'API\BookingController');
Route::get('getBookingsForDayView','API\BookingController@getBookingsForDayView');
Route::get('getBookingsForMonthView','API\BookingController@getBookingsForMonthView');
Route::apiResource('user', 'API\UserController');
Route::apiResource('space', 'API\SpacesController');
Route::get('UserWiseBooking/{id}', 'API\UserController@UserWiseBooking');
Route::post('login', 'API\UserController@login');