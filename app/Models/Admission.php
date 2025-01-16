<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admission extends Model
{
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function year() {
        return $this->belongsTo(Year::class);
    } 

    public function sector() {
        return $this->belongsTo(Sector::class);
    }

    public function getSectorNameAttribute() {
        return $this->sector->sector;
    }

    public function getAdmissionByAttribute() {
        return $this->user->name;
    }


}
