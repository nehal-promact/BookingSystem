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
});
Route::post('login', 'API\UserController@login');
Route::group(['middleware' => ['cors','auth:api']], function(){
  Route::get('getUser', 'API\UserController@getUser');
  Route::post('logout','API\UserController@logout');
  Route::get('isAdmin/{id}','API\UserController@isAdmin');
  Route::get('searchUser/{searchText}', 'API\UserController@searchUser');
  Route::post('changePassword', 'API\UserController@changePassword');
 });

Route::apiResource('booking', 'API\BookingController');
Route::get('getBookingsForDayView/{SelectedDate}','API\BookingController@getBookingsForDayView');
Route::get('getBookingsForMonthView/{SelectedDate}','API\BookingController@getBookingsForMonthView');
Route::apiResource('user', 'API\UserController');
Route::apiResource('space', 'API\SpacesController');
Route::get('UserWiseBooking/{id}', 'API\UserController@UserWiseBooking');
