<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\IncomeSector;
use App\Models\Sector;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SectorIncomeController extends Controller
{
    public function index() {
    //    $students = Admission::where('status', 'active')
    //     ->with('income')
    //    ->whereHas('income', function ($query) {
    //         $query->where('income_sector_id', 2);
    //     })
    //     ->orderBy('created_at', 'DESC')
    //     ->paginate(10);

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

    public function search_result($sector_id, $income_sector_id, $status) {
        
        if($status == 'active') {
            
            $students = Admission::where('status', 'active')
            ->with('income', 'sector', 'user')
            ->whereHas('income', function ($query) use ($income_sector_id) {
                    $query->where('income_sector_id', $income_sector_id);
                })
                ->whereHas('sector', function ($query) use ($sector_id) {
                    $query->where('sector_id', $sector_id);
                })
                ->orderBy('created_at', 'DESC')
                ->paginate(10);
        }

        else {
            $students = Admission::where('status', 'active')
            ->with('income', 'sector', 'user')
            ->whereHas('income', function ($query) use ($income_sector_id) {
                    $query->where('income_sector_id', '!=', $income_sector_id);
                })
                ->whereHas('sector', function ($query) use ($sector_id) {
                    $query->where('sector_id', $sector_id);
                })
                ->orderBy('created_at', 'DESC')
                ->paginate(10);
        }
      

                $sector = Sector::where('id', $sector_id)->firstOrFail();
                $income_sector = IncomeSector::where('id', $income_sector_id)->firstOrFail();
            
            return Inertia::render("Income/SectorIncome/Result", [
                'students' => $students,
                "sector" => $sector,
                "income_sector" => $income_sector,
                'status' => $status
            ]);
    }
}
