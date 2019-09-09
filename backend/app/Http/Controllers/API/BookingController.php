<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;
use App\Models\Booking;
use App\Models\Spaces;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

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
       $validator = Validator::make($request->all(),[
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

        return $this->sendResponse($booking, 'booking created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Booking  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $booking = Booking::find($id);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $booking = Booking::find($id);
        $error = $this->_validate($id, $booking, Input::get());
        if(empty($error)){
            $v = Validator::make($request->all(), [
                'date_time'     => 'required|date',
                'from_time'     => 'required',
                'to_time'       => 'required',
                'space_id'      => 'required|integer',
                'user_id'       => 'required|integer',
                'booking_title' => 'required|string', 
            ]);
        
            if ($v->fails()){
                return $this->sendResponse($v->errors()->all(), 'error');
            }
            
            $booking->date_time     = Input::get('date_time');
            $booking->from          = Input::get('from_time');
            $booking->to            = Input::get('to_time');
            $booking->space_id      = Input::get('space_id');
            $booking->user_id       = Input::get('user_id');
            $booking->booking_title = Input::get('booking_title');
            $booking->save();
            
            return $this->sendResponse($booking, 'Booking updated successfully.');
        }else{
            return $this->sendResponse($error, 'error');
        }
        //print_r(Input::get('date_time')); exit;
        /*$request->validate([
            'date_time'     => 'required|date',
            'from_time'     => 'required',
            'to_time'       => 'required',
            'space_id'      => 'required|integer',
            'user_id'       => 'required|integer',
            'booking_title' => 'required|string', 
        ]);*/    
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
    
    public function getBookingsForDayView($SelectedDate) {
        $response = array();
        $bookings = Booking::where('date_time',$SelectedDate)->get();
        $spaces = Spaces::all();
          
        $strJsonFileContents = file_get_contents(resource_path("\\json\\time.json"));
        $times = json_decode($strJsonFileContents, true); 
         
        foreach ($times['times'] as $key=>$time) {
            $t = array(
                'id' => intval($time['id']),
                'data' => $time['data'],
                'isDisabled'=>intval($time['id'])<=16 || intval($time['id'])>41?true:false
            );
            
            $response[$key]['Time'] = $t;
            $response[$key]['Booking'] = Array();
            foreach ($spaces as $space) {
                $s = array(
                    'id'=>$space->id,
                    'space_name'=>$space->space_name,
                    'booked'=>false,
                    'rows'=>1
                );
                foreach ($bookings as $booking) {
                    if($booking->space_id == $space->id && ($booking->from == $time['id'])){
                       $response[$key]['Booking'][] = $booking;
                       $s['rows'] = $this->_row($booking);
                       $s['booked'] = true;
                    }
                }
                $response[$key]['SpaceType'][] = $s;
            }
        }
        return $this->sendResponse($response, 'Bookings for day view.');
    }
    
    private function _row($booking) {
        return $booking->to - $booking->from;
    }
    
    public function getBookingsForMonthView($SelectedDate) {
        
        $response = array();
        $month = date('m', strtotime($SelectedDate));
        $bookings = Booking::with('spaces')
        ->select('booking.id as booking_id','booking.date_time','booking.to as to_time','booking.from as from_time','booking.booking_title','booking.space_id','booking.created_at','booking.updated_at','spaces.space_name')
        ->join('spaces', 'spaces.id', '=', 'booking.space_id')
        ->whereMonth('booking.date_time',$month)
        ->orderBy('booking.date_time','DESC')->get();
                 
        foreach ($bookings as $b) {
                $tempArr[] = array(
                     'day'=>date('j', strtotime($b->date_time)),
                     'booking_id'=> $b->booking_id,
                     'date_time'=> $b->date_time,
                     'to_time'=> $this->getTime($b->to_time),
                     'from_time'=> $this->getTime($b->from_time),
                     'booking_title'=> $b->booking_title,
                     'space_id'=> $b->space_id,
                     'created_at'=> $b->created_at,
                     'updated_at'=> $b->updated_at,
                     'space_name'=> $b->space_name
                 );
            //$response[date('d', strtotime($b->date_time))] = $tempArr;
        }
        $response = $this->group_by("day", $tempArr);
        return $this->sendResponse($response, 'Bookings for Month view.');
    }
    
    private function getTime($time){
        $strJsonFileContents = file_get_contents(resource_path("\\json\\time.json"));
        $times = json_decode($strJsonFileContents, true); 
        
        foreach ($times['times'] as $value) {
            if($time == $value['id']){
                return $value['data'];
            }
        }
    }
    
    function group_by($key, $data) {
        $result = array();

        foreach($data as $val) {
            if(array_key_exists($key, $val)){
                $result[$val[$key]][] = $val;
            }else{
                $result[""][] = $val;
            }
        }
        return $result;
    }
    
    private function _validate($id, Booking $booking, $request = array()) {
        /*echo "req from : ".$request['from_time'];
        echo "req to : ".$request['to_time'];
        echo "book from : ".$booking->from;
        echo "book to : ".$booking->to;
        echo "req dt : ".$request['date_time'];
        echo "book dt : ".date('Y-m-d', strtotime($booking->date_time));
        echo "req space : ".$request['space_id'];
        echo "book space : ".$booking->space_id;*/
        
        $error = array();
        //check booking is on same date 
        if($request['date_time'] == date('Y-m-d', strtotime($booking->date_time))) {
            $bookings = Booking::where('date_time',date('Y-m-d', strtotime($request['date_time'])))->get();
            foreach($bookings as $book) {
                if( ($request['to_time'] == $book->to || $request['from_time'] == $book->from || $request['from_time']>= $book->from) &&  $request['space_id'] == $book->space_id && $request['id']!=$book->id) {
                    $error[] = 'Booking already exist on same time.';
                    return $error;
                }
            }
        }
    }
}
