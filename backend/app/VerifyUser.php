<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VerifyUser extends Model
{
    //

    public function user()
    {

    	protected $guarded = [];
        
        return $this->belongsTo('App\User', 'user_id');
    }
}
