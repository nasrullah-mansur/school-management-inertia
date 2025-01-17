<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Sector;
use App\Models\Year;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    // Student;
    public function create() {
        return Inertia::render("Search/View");
    }

    public function search_form(Request $request) {
        $request->validate([
            'text' => 'required|max:256'
        ]);

        return redirect()->route('search.get', $request->text);

    }



    public function search_result($id)
    {

        try {
            // Create a Carbon instance
            $d = Carbon::createFromFormat('d-M-Y', $id);
        } catch (\Exception $e) {
            // Handle error: Invalid format
            $d = null;
        }

        // dd($d);

        // Retrieve admissions with associated year
        if($d != null) {
            $admissions = Admission::with('year', 'sector')
            ->whereHas('year', function ($query) {
                $query->where('status', 'active');
            })
            ->where(function ($query) use ($id, $d) {
                $query->where('reg_id', $id)
            ->orWhereDate('created_at', $d)
                      ->orWhere('created_at', $d);
            })
            ->orderBy('created_at', 'DESC')
            ->paginate(10);
        } 
        
        else {
            $admissions = Admission::with('year', 'sector')
                ->whereHas('year', function ($query) {
                    $query->where('status', 'active');
                })
                ->where('reg_id', $id)
                ->orWhere('phone', $id)
                ->orderBy('created_at', 'DESC')
                ->paginate(10);
        }



        // Retrieve active years and sectors
        $years = Year::where('status', "active")->get();
        $sectors = Sector::where('status', "active")->get();

        // Pass data to the view
        return Inertia::render("Student/Index", [
            'admissions' => $admissions,
            'years' => $years,
            'sectors' => $sectors,
        ]);
    }


    public function search_filter(Request $request) {
        return redirect()->route('search.filter.result', [$request->year_id, $request->sector_id, $request->status]);
    }

    public function search_filter_result($year_id, $sector_id, $status) {
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
            ->paginate(10);

            $years = Year::where('status', "active")->get();
            $sectors = Sector::where('status', "active")->get();

            return Inertia::render("Student/Index", [
                'admissions' => $admissions,
                'years' => $years,
                'sectors' => $sectors,
            ]);
    }

}
