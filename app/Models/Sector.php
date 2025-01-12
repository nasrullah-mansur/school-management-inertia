<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    public function admissions() {
        return $this->hasMany(Admission::class);
    }
}
