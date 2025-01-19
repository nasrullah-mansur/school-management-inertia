<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Income;
use App\Models\IncomeSector;
use App\Models\Sector;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SectorIncomeController extends Controller
{
    public function index() {
        $sectors = Sector::where('status', 'active')->orderBy('created_at', 'desc')->get();
        $income_sectors = IncomeSector::where('status', 'active')->orderBy('created_at', 'desc')->get();
        return Inertia::render("Income/SectorIncome/Index", [
            // 'students' => $students,
            'sectors' => $sectors,
            'income_sectors' => $income_sectors
        ]);
    }

    public function search_req(Request $request) {
        $request->validate([
            'sector_id' => "required",
            'income_sector_id' => "required",
            'status' => "required"
        ], [
            'sector_id.required' => "একটি বিভাগ সিলেক্ট করুন",
            'income_sector_id.required' => "একটি আয়ের খাত সিলেক্ট করুন",
            'status.required' => "একটি স্টাটাস সিলেক্ট করুন"
        ]);

        return redirect()->route('income.by.sector.result', [$request->sector_id, $request->income_sector_id, $request->status]);
    }

    public function search_result($sector_id, $income_sector_id, $status)
    {
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
        $students = $query->paginate(10);

       
        // Fetch related sector and income_sector details
        $sector = Sector::findOrFail($sector_id);
        $income_sector = IncomeSector::findOrFail($income_sector_id);

        // Return results using Inertia
        return Inertia::render("Income/SectorIncome/Result", [
            'students' => $students,
            'sector' => $sector,
            'income_sector' => $income_sector,
            'status' => $status,
        ]);
    }

}
