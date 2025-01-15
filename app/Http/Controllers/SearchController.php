<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Sector;
use App\Models\Year;
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

    public function search_result($id) {
        $admissions = Admission::with('year')
        ->whereHas('year', function ($query) {
            $query->where('status', 'active');
        })
        ->where('reg_id', $id)
        ->orWhere('phone', $id)
        ->orderBy('created_at', 'DESC')
        ->paginate(10);
        $years = Year::where('status', "active")->get();
        $sectors = Sector::where('status', "active")->get();
        return Inertia::render("Student/Index", ['admissions' => $admissions, "years" => $years, "sectors" => $sectors]);
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

            $years = Year::all();
            $sectors = Sector::all();

            return Inertia::render("Student/Index", [
                'admissions' => $admissions,
                'years' => $years,
                'sectors' => $sectors,
            ]);
    }

}