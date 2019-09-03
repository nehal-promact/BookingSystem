<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;
use Illuminate\Support\Facades\Input;
use App\Notifications\SignupActivate;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Models\Booking;
use Validator;

class UserController extends APIBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
        return $this->sendResponse($user, 'Users retrieved successfully.');
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
        $input = $request->all();
         $validator = Validator::make($input,[
            'last_name'      => 'required',
            'first_name'     => 'required',
            'email'          => 'required|string|email|unique:users',
            'password'       => 'required|string|confirmed',
            'contact_number' => 'required|numeric',
            //'role_id'        => 'required|numeric'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        $user = new User([
            'first_name'     => $request->first_name,
            'last_name'      => $request->last_name,
            'email'          => $request->email,
            'password'       => bcrypt($request->password),
            'contact_number' => $request->contact_number,
            'role_id'        => 1, //$request->role_id,  
            'remember_token' => str_random(60)
        ]);
        $user->save();

        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return $this->sendResponse($user, 'Users found');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function update(Request $request, $id)
    {
       $user                 = User::find($id);
       $user->first_name     = Input::get('first_name');
       $user->last_name      = Input::get('last_name');
       $user->save();
       return $this->sendResponse($user, 'User details updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user  = User::find($id);
        $user->delete();
        return $this->sendResponse(true,'Users deleted successfully.');
    }

    public function login()
    { 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user             = Auth::user();
            $success['token'] = $user->createToken('MyApp')-> accessToken;
            return response()->json(['success' => $success], 200); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }

    public function UserWiseBooking($id)
    {
        //echo "aaa".$id; exit;
        $user = User::find($id);
        $data = $user->booking;
        $i = 0;
        $space = array();
        foreach($data as $data)
        {
           $user['booking'][$i]['space'] = Booking::find($data->id)->space;
           $i++; 
        }
        return response()->json(['success' => $user], 200);
    }

}
