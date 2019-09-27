<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spaces extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'spaces';
    
    protected $fillable = ['space_name'];
    
    public function booking()
    {
        return $this->hasMany('App\Models\Booking', 'space_id', 'id');
    }
    
    public function delete() {
        $this->booking()->delete();
        parent::delete();
    }

}
