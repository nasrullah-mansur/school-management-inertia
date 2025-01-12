<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Month extends Model
{
    public function year() {
        return $this->belongsTo(Year::class);
    }
}
