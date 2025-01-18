<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    public function sector() {
        return $this->belongsTo(Sector::class);
    }
    
    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function admission() {
        return $this->belongsTo(Admission::class);
    }
    
    public function income_sector() {
        return $this->belongsTo(IncomeSector::class);
    }

    
}
