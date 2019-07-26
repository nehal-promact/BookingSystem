<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;
use App\Models\Spaces;
use Illuminate\Support\Facades\Input;

class SpacesController extends APIBaseController
{
    /**
     * Display a listing of the spaces.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $spaces = Spaces::all();
        $response = array();
        foreach($spaces as $space){
            $Response[] = array(
                'id' => $space->id,
                'space_name'=>$space->space_name
            );
        }
        return $this->sendResponse($response, 'Spaces retrieved successfully.');
    }

    public function store(Request $request){

        $request->validate([
            'space_name' =>'required',
        ]);

        $space             = new Spaces;
        $space->space_name = Input::get('space_name');
        $space->save();

        return $this->sendResponse($space, 'Space created successfully.');
    }

    public function show($id){
        $request->validate([
            'id' =>'required',
        ]);
        
        $space = Spaces::find($id);
        return $this->sendResponse($space, 'Spaces found');
    }

    public function update($id){
        $request->validate([
            'id' =>'required',
        ]);

        $space = Space::find($id);
        $space->space_name = Input::get('space_name');

        return $this->sendResponse($space, 'Spaces updated successfully.'); 
    }   

    public function destroy($id){
        $request->validate([
            'id' =>'required',
        ]);

        $space  = Space::find($id);
        $space->delete();

        return $this->sendResponse('Spaces deleted successfully.');
    }

}
