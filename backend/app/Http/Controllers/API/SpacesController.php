<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;
use App\Models\Spaces;

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
            $response[] = array(
                'id' => $space->id,
                'space_name'=>$space->space_name
            );
        }
        return $this->sendResponse($response, 'Spaces retrieved successfully.');
    }
}
