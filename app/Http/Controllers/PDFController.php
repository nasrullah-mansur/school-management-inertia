<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PDFController extends Controller
{
    public function vorti_pdf($reg_id) {
         $admission = Admission::where('reg_id', $reg_id)->firstOrFail();

        $data = [
            'name' => $admission->name,
            'father_name' => $admission->father_name,
            'birth' => $admission->birth_day,
            'phone' => $admission->phone,
            'reg_id' => $admission->reg_id,
            'year' => $admission->year->year,
            'sector' => $admission->sector->sector,
        ];

        $fileName = $admission->reg_id . ".pdf";

       $pdf = Pdf::loadView("pdf.vorti", $data);

       return $pdf->download($fileName);
    }
}
