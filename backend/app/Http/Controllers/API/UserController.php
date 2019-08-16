<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;
use Illuminate\Support\Facades\Input;
use App\Notifications\SignupActivate;
use App\User;
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
        return $this->sendResponse($user, 'Spaces retrieved successfully.');
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
            'role_id'        => 'required|numeric'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        //echo "aa"; exit;
        $user = new User([
            'first_name'       => $request->first_name,
            'last_name'        => $request->last_name,
            'email'            => $request->email,
            'password'         => bcrypt($request->password),
            'contact_number'   => $request->contact_number,
            'role_id'          => $request->role_id,  
            'activation_token' => str_random(60)
        ]);
        $user->save();

        //$user->notify(new SignupActivate($user));
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
        return $this->sendResponse($user, 'Spaces found');
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
       return $this->sendResponse($user, 'Spaces updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
