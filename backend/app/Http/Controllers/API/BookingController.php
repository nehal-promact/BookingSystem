<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;
use App\Models\Booking;
use Illuminate\Support\Facades\Input;

class BookingController extends APIBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $booking = Booking::all();

        return $this->sendResponse($booking, 'Booking retrieved successfully.');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //echo "<pre>"; print_r(Input::get('from_time')); exit;
        $validator = Validator::make($input,[
            'date_time'     => 'required|date',
            'from_time'     => 'required',
            'to_time'       => 'required',
            'space_id'      => 'required|integer',
            'user_id'       => 'required|integer',
            'booking_title' => 'required|string', 
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $booking                = new Booking;
        $booking->date_time     = Input::get('date_time');
        $booking->from          = Input::get('from_time');
        $booking->to            = Input::get('to_time');
        $booking->space_id      = Input::get('space_id');
        $booking->user_id       = Input::get('user_id');
        $booking->booking_title = Input::get('booking_title');
        $booking->save();

        return $this->sendResponse($booking, 'Space created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function show(Booking $booking)
    {
        $booking = Booking::find($booking);
        return $this->sendResponse($booking, 'Spaces found');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function edit(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Booking $booking)
    {

        $booking = Booking::find($booking->id);
        //print_r( Input::get('date_time')); exit;
        //print_r(Input::get('date_time')); exit;
        /*$request->validate([
            'date_time'     => 'required|date',
            'from_time'     => 'required',
            'to_time'       => 'required',
            'space_id'      => 'required|integer',
            'user_id'       => 'required|integer',
            'booking_title' => 'required|string', 
        ]);*/

        $booking->date_time     = Input::get('date_time');
        $booking->from          = Input::get('from_time');
        $booking->to            = Input::get('to_time');
        $booking->space_id      = Input::get('space_id');
        $booking->user_id       = Input::get('user_id');
        $booking->booking_title = Input::get('booking_title');
        $booking->save();

        return $this->sendResponse($booking, 'Booking updated successfully.');
           
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function destroy(Booking $booking)
    {
       $booking = Booking::find($booking->id);
       $booking->delete();
      return $this->sendResponse(true,'Booking deleted successfully.');
    }
}
