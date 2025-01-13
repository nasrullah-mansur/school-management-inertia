<?php

namespace App\Http\Controllers;

use App\Models\Month;
use App\Models\Year;
use Illuminate\Http\Request;
use Inertia\Inertia;

class YearController extends Controller
{
    public function index() {
        $years = Year::withCount('admissions')->get();
        return Inertia::render('Year/Index', ['years' => $years]);
    }

    public function create() {
        return Inertia::render("Year/Create");
    }
    public function store(Request $request) {
        
        $request->validate([
            'year' => "required|max:256"
        ], [
            "year.required" => "দয়া করে কিছু লিখুন"
        ]);

        $year = new Year();
        $year->year = convertToEnglishFont($request->year);
        $year->status = $request->status;
        $year->save();

        return redirect()->route('year.index')->with('success', "আপনি সফলভাবে শিক্ষাবর্ষ যুক্ত করেছেন");
        // return to_route('year.index');
    }

    public function edit($id) {
        $year = Year::where('id', $id)->firstOrFail();

        return Inertia::render("Year/Edit", ['year' => $year]);
    }

    public function update(Request $request) {
        $request->validate([
            'year' => "required|max:256",
            'id' => 'required'
        ], [
            "year.required" => "দয়া করে কিছু লিখুন"
        ]);

        $year = Year::where('id', $request->id)->firstOrFail();

        $year->year = convertToEnglishFont($request->year);
        $year->status = $request->status;
        $year->save();

        return redirect()->route('year.index')->with('success', "আপনি সফলভাবে শিক্ষাবর্ষ এডিট করেছেন");
    }
    public function delete($id) {
        $year = Year::where('id', $id)->firstOrFail(); 
        $month = Month::where('year_id', $year->id)->first();
        if($month) {
            return redirect()->back()->withErrors(['error' => 'এই বর্ষে এখনও একটি মাস সংযুক্ত আছে। এটি মুছে ফেলা সম্ভব নয়।']);
        } else {
            $year->delete();
            return redirect()->route('year.index')->with('success', "আপনি সফলভাবে শিক্ষাবর্ষ রিমুভ করেছেন");
        }
    }
}
