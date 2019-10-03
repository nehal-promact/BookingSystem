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
            'contact_number' => 'required|min:11|numeric',
            //'role_id'        => 'required|numeric'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'  => 'ERROR',
                'errors' => $validator->errors(),
            ], 200);
            //return $this->sendError('Validation Error.', $validator->errors());       
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
        $input = $request->all();
        
        $validator = Validator::make($input,[
            'last_name'      => 'required',
            'first_name'     => 'required',
            'email'          => 'required|email|unique:users,email,'.$id,
            'contact_number' => 'required|min:11|numeric',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'  => 'ERROR',
                'errors' => $validator->errors(),
            ], 200);
        } 
       $user                 = User::find($id);
       $user->email          = Input::get('email');   
       $user->first_name     = Input::get('first_name');
       $user->last_name      = Input::get('last_name');
       $user->contact_number = Input::get('contact_number');
       $user->save();
       return $this->sendResponse($user, 'User updated successfully.');
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
        $success = array();
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('api_token')->accessToken; 
            $user->api_token = $success['token'];
            $user->save();
             return $this->sendResponse($success,'login successfully'); 
        } else{ 
            return $this->sendError('error',['error'=>'Unauthorised'], 401);
        } 
    }
    
    public function logout() {
        if (Auth::check()) {
            Auth::user()->AauthAcessToken()->delete();
        }
        $response = 'You have been succesfully logged out!';
        return $this->sendResponse($response, 200);
    }
    
    public function getUser() {
        $user = Auth::user();
        return $this->sendResponse($user, "user retrive successfully."); 
    }
    
    public function UserWiseBooking($id)
    {
        $user = User::find($id);
        $data = $user->booking;
        $i = 0;
        
        foreach($data as $data)
        {
           $data->from = $this->getTime($data->from);
           $data->to = $this->getTime($data->to);
           $user['booking'][$i]['space'] = Booking::find($data->id)->space;
           $i++; 
        }
        return $this->sendResponse($user, "user retrive successfully."); 
    }
    
    public function searchUser($searchText=''){
        if($searchText == 'undefined' || $searchText == ''){
            $user = User::all();
        }else{
            $user = User::where('first_name', 'LIKE', "%$searchText%")->get();
        }
        return $this->sendResponse($user, 'Users retrieved successfully.');
    }
    
    public function changeEmail(){
        
    }
    
    /**
     * check user is administrator or not
     *
     * @return boolean
     */
    public function isAdmin($id){
        $user = User::find($id);
        return $this->sendResponse(User::isAdmin($user), 'user is admin or not');
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

    function changePassword(Request $request) {
        $data = $request->all();
        $user = Auth::guard('api')->user();
        //echo "<pre>"; print_r($user); exit;
        //Changing the password only if is different of null
        if( isset($data['oldPassword']) && !empty($data['oldPassword']) && $data['oldPassword'] !== "" && $data['oldPassword'] !=='undefined') {
         //checking the old password first
            $check  = Auth::guard('web')->attempt([
                'id'       => $user->id,
                'password' => $data['oldPassword']
            ]);
            if($check && isset($data['password']) && !empty($data['password']) && $data['password'] !== "" && $data['password'] !=='undefined') {
                $user->password    = bcrypt($data['password']);
                //$user->isFirstTime = false; //variable created by me to know if is the dummy password or generated by user.
                $user->token()->revoke();
                $token = $user->createToken('newToken')->accessToken;

                //Changing the type
                $user->save();

                return json_encode(array('token' => $token)); //sending the new token
            }
            else {
                return "Wrong password information";
            }
        }
        return "Wrong password information";
    }
}
