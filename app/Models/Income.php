<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    public function sector() {
        return $this->belongsTo(IncomeSector::class, 'income_sector_id');
    }
    
    public function user() {
        return $this->belongsTo(User::class);
    }
}
