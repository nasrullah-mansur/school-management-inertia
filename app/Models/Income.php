<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    public function money_for() {
        return $this->belongsTo(MoneyFor::class);
    }

    public function month() {
        return $this->belongsTo(Month::class);
    }

}
