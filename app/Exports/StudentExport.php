<?php

namespace App\Exports;

use App\Models\Admission;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentExport implements FromCollection
{
    public function collection()
    {
        return Admission::all();
    }
}