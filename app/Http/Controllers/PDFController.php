<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use Mpdf\Mpdf;
use PDF;

class PDFController extends Controller
{
    public function vorti_pdf($id)
    {
        $student = Admission::where('id', $id)->with('year', 'user', 'sector')->firstOrFail();

        $mpdf =new Mpdf([
            // 'mode' => "UTF-8",
            // 'autoScriptToLang' => true,
            // 'autoLangToFont' => true,
            'default_font_size' => 12,
            'default_font' => 'kalpurush',
            'format' => 'A5',
            'margin_left' => 10, // Adjust left margin (default is 15)
            'margin_right' => 10, // Adjust right margin (default is 15)
            'margin_top' => 12, // Adjust top margin (default is 16)
            'margin_bottom' => 12, // Adjust bottom margin (default is 16)
        ]);

        $html = view('pdf.vorti', compact('student'))->render();

        $mpdf->WriteHTML($html);

        $fileName = $student->reg_id;
        $mpdf->SetTitle($fileName);

        return $mpdf->OutputHttpDownload($student->reg_id . '.pdf');

        // return response($mpdf->Output(), 200, [
        //     'Content-Type' => 'application/pdf',
        //     'Content-Disposition' => 'inline filename='. $fileName .''
        // ]);
   
    }

    public function students_pdf() {
        $previousUrl = url()->previous(); 
        $previousUri = parse_url($previousUrl, PHP_URL_PATH);
        $parts = array_filter(explode('/', $previousUri));

        if($previousUri === "/students/all") {
            // All Student;
            return $admissions = Admission::with('year')
            ->whereHas('year', function ($query) {
                $query->where('status', 'active');
            })
            ->orderBy('created_at', 'DESC')
            ->get();
        }

        if (str_contains($previousUri, 'find')) {
            // Find;
            $id = $parts[3] ?? null;
            return $admissions = Admission::with('year')
                ->whereHas('year', function ($query) {
                    $query->where('status', 'active');
                })
                ->where('reg_id', $id)
                ->orWhere('phone', $id)
                ->orderBy('created_at', 'DESC')
                ->get();
        } 

        if (str_contains($previousUri, 'filter')) {
            // filter;
            $year_id = $parts[4] ?? null;
            $sector_id = $parts[5] ?? null;
            $status = $parts[6] ?? null;
           return $admissions = Admission::with('year')
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
            
        }
        
        else {
            
        }
        
       
    }


}

// $year_id = $parts[4] ?? null;
//             $sector_id = $parts[5] ?? null;
//             $status = $parts[6] ?? null;

//             $admissions = Admission::with('year')
//             ->whereHas('year', function ($query) {
//                 $query->where('status', 'active');
//             })
//             ->when($year_id && $year_id !== "all", function ($query) use ($year_id) {
//                 $query->where('year_id', $year_id);
//             })
//             ->when($sector_id && $sector_id !== "all", function ($query) use ($sector_id) {
//                 $query->where('sector_id', $sector_id);
//             })
//             ->when($status && $status !== "all", function ($query) use ($status) {
//                 $query->where('status', $status);
//             })
//             ->orderBy('created_at', 'DESC')
//             ->get();

//             $fileName = "allStudents.pdf";
//             $pdf = Pdf::loadView("pdf.students", $admissions->toArray());
//             return $pdf->download($fileName);
