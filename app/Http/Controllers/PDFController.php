<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use Carbon\Carbon;
use App\Models\Income;
use App\Models\Admission;
use Rap2hpoutre\FastExcel\FastExcel;

class PDFController extends Controller
{
    // Generate a PDF for a single student based on their ID
    public function vorti_pdf($id)
    {
        $student = Admission::where('id', $id)
            ->with('year', 'user', 'sector')
            ->firstOrFail();

        $mpdf = new Mpdf([
            'default_font_size' => 12,
            'default_font' => 'kalpurush',
            'format' => 'A5',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 12,
            'margin_bottom' => 12,
        ]);

        $html = view('pdf.vorti', compact('student'))->render();
        $mpdf->WriteHTML($html);

        $fileName = $student->reg_id;
        $mpdf->SetTitle($fileName);

        return $mpdf->OutputHttpDownload($student->reg_id . '.pdf');
    }

    // Generate an Excel file for a list of students based on the URL
    public function students_pdf()
    {
        $previousUrl = url()->previous();
        $previousUri = parse_url($previousUrl, PHP_URL_PATH);
        $parts = array_filter(explode('/', $previousUri));

        $fields = [
            'name', 'reg_id', 'form_no', 'father_name', 'birth_day', 'phone as phone_1', 
            'phone_2', 'phone_3', 'birth_no', 'nid_no', 'village', 'post', 'thana', 'zila', 
            'status', 'created_at', 'sector_id', 'created_at', 'user_id',
        ];

        $query = Admission::with('year', 'user')->whereHas('year', function ($query) {
            $query->where('status', 'active');
        });

        // Handle different URL cases for filtering
        if ($previousUri === "/students/all") {
            // All Students
            $admissions = $query->orderBy('created_at', 'DESC')->get($fields);
        } elseif (str_contains($previousUri, 'find')) {
            // Find by ID or Phone
            $id = $parts[3] ?? null;

            // Try to parse $id as a date, else handle as reg_id or phone
            $admissions = $this->handleFindRequest($id);
        } elseif (str_contains($previousUri, 'filter')) {
            // Filter by year, sector, and status
            $admissions = $this->handleFilterRequest($parts);
        } else {
            return response()->json(['message' => 'Invalid request'], 400);
        }

        $updateCollections = $this->getExcel($admissions);
        return (new FastExcel($updateCollections))->download('students.xlsx');
    }

    // Helper function to handle search by ID or Phone, including date filtering
    private function handleFindRequest($id)
    {
        try {
            // Attempt to parse as a date
            $d = Carbon::createFromFormat('d-M-Y', $id);
        } catch (\Exception $e) {
            // Invalid date format, proceed with reg_id or phone
            $d = null;
        }

        // Handle admissions based on parsed date or reg_id/phone
        if ($d != null) {
            return Admission::with('year')
                ->whereHas('year', function ($query) {
                    $query->where('status', 'active');
                })
                ->where(function ($query) use ($id, $d) {
                    $query->where('reg_id', $id)
                        ->orWhereDate('created_at', $d)
                        ->orWhere('created_at', $d);
                })
                ->orderBy('created_at', 'DESC')
                ->get();
        } else {
            return Admission::with('year')
                ->whereHas('year', function ($query) {
                    $query->where('status', 'active');
                })
                ->where('reg_id', $id)
                ->orWhere('phone', $id)
                ->orderBy('created_at', 'DESC')
                ->get();
        }
    }

    // Helper function to handle filter request by year, sector, and status
    private function handleFilterRequest($parts)
    {
        return Admission::with('year')
            ->whereHas('year', function ($query) {
                $query->where('status', 'active');
            })
            ->when($parts[4] ?? null, function ($query, $year_id) {
                if ($year_id !== "all") {
                    $query->where('year_id', $year_id);
                }
            })
            ->when($parts[5] ?? null, function ($query, $sector_id) {
                if ($sector_id !== "all") {
                    $query->where('sector_id', $sector_id);
                }
            })
            ->when($parts[6] ?? null, function ($query, $status) {
                if ($status !== "all") {
                    $query->where('status', $status);
                }
            })
            ->orderBy('created_at', 'DESC')
            ->get();
    }

    // Format and modify the admission collection before exporting
    public function getExcel($collection)
    {
        $collection->each(function ($admission) {
            // Add sector_name if sector exists
            $admission->sector_name = $admission->sector->name ?? null;

            // Format created_at date
            $admission->date = $admission->created_at ? Carbon::parse($admission->created_at)->format('d-M-Y') : null;

            // Format User;
            $admission->new_user = $admission->user->name ?? null;

            // Remove sector_id if not needed
            unset($admission->sector_id);
            unset($admission->user_id);
            

        });

        return $collection;
    }

    public function income_excel($sector_id, $income_sector_id, $status) {
        // Fetch incomes and extract admission IDs
        $incomeAdmissionIds = Income::where('income_sector_id', $income_sector_id)
        ->where('sector_id', $sector_id)
        ->pluck('admission_id')
        ->toArray();

        // Fetch students based on status
        $query = Admission::where('sector_id', $sector_id)
        ->orderBy('created_at', 'DESC')
        ->with('sector');

        if ($status == 'active') {
        // Students that are in the income collection
        $query->whereIn('id', $incomeAdmissionIds);
        } else {
        // Students that are NOT in the income collection
        $query->whereNotIn('id', $incomeAdmissionIds);
        }

        // Paginate and fetch the results
     
        $students = $query->get();
        $updateCollections = $this->getExcel($students);
        return (new FastExcel($updateCollections))->download('students.xlsx');

    }

    public function income_pdf($id) {
        $income = Income::where('id', $id)->with('admission', 'sector', 'user', 'income_sector')->firstOrFail();

        $mpdf = new Mpdf([
            'default_font_size' => 12,
            'default_font' => 'kalpurush',
            'format' => 'A5',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 12,
            'margin_bottom' => 12,
        ]);

        $html = view('pdf.income', compact('income'))->render();
        $mpdf->WriteHTML($html);

        $fileName = $income->admission->reg_id;
        $mpdf->SetTitle($fileName);

        return $mpdf->OutputHttpDownload($fileName . '.pdf');
    }
}
