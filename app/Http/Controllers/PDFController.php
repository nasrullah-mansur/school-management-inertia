<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PDFController extends Controller
{
    public function vorti_pdf($reg_id) {
        return 'ok';
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

    public function students_pdf() {
        $previousUrl = url()->previous(); 
        $previousUri = parse_url($previousUrl, PHP_URL_PATH);
        $parts = array_filter(explode('/', $previousUri));

        if($previousUri === "/students/all") {
            // All Student;
        }

        if (str_contains($previousUri, 'find')) {
            // Find;
        } 
        
        else {
            $year_id = $parts[4] ?? null;
            $sector_id = $parts[5] ?? null;
            $status = $parts[6] ?? null;

            $admissions = Admission::with('year')
            ->whereHas('year', function ($query) {
                $query->where('status', 'active');
            })
            ->when($year_id && $year_id !== "all", function ($query) use ($year_id) {
                $query->where('year_id', $year_id);
            })
            ->when($sector_id && $sector_id !== "all", function ($query) use ($sector_id) {
                $query->where('sector_id', $sector_id);
            })
            ->when($status && $status !== "all", function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->orderBy('created_at', 'DESC')
            ->get();

            $fileName = "allStudents.pdf";
            $pdf = Pdf::loadView("pdf.students", $admissions->toArray());
            return $pdf->download($fileName);
        }
        
       

       

    //    $fileName = "allStudents.pdf";
    //    $pdf = Pdf::loadView("pdf.students", $admissions);
    //    return $pdf->download($fileName);
    }


}
