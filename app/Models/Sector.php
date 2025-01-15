<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    public function admissions() {
        return $this->hasMany(Admission::class);
    }

    public function year() {
        return $this->belongsTo(Year::class);
    }

    public function getSectorAttribute($value) {
        return $value . ' - ' . $this->year->year;
    }
}
