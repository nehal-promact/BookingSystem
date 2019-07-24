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
}
