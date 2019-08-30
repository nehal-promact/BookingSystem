<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'booking';
 public function spaces()
    {
        return $this->belongsTo('App\Models\Spaces');
    }    public function space()
    {
        return $this->hasOne('App\Models\Spaces',  'id', 'space_id');
    }}
