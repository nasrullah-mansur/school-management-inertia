<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Sector;
use App\Models\Year;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectorController extends Controller
{
    public function index() {
        $sectors = Sector::withCount('admissions')->with('year')->latest()->get();
        return Inertia::render("Sector/Index", ['sectors' => $sectors]);
    }

    public function create() {
        $years = Year::where('status', 'active')->get();
        return Inertia::render("Sector/Create", ['years' => $years]);
    }

    public function store(Request $request) {
        
        $request->validate([
            'sector' => "required|max:256",
            'prefix' => 'required|max:256|unique:sectors|numeric',
            'year_id' => 'required'
        ], [
            "sector.required" => "দয়া করে কিছু লিখুন",
            "prefix.required" => "দয়া করে কিছু লিখুন",
            'year_id.required' => "দয়া করে যেকোনো একটি সিলেক্ট করুন",
            'prefix.unique' => "এটি একবার ব্যবহৃত হয়েছে",
        ]);

        $sector = new Sector();
        $sector->sector = $request->sector;
        $sector->status = $request->status;
        $sector->year_id = $request->year_id;
        $sector->prefix = convertToEnglishFont($request->prefix);
        $sector->save();

        return redirect()->route('sector.index')->with('success', "আপনি সফলভাবে একটি বিভাগ যুক্ত করেছেন");
    }

    public function edit($id) {
        $sector = Sector::where('id', $id)->firstOrFail();
        $years = Year::all();
        return Inertia::render("Sector/Edit", ['sector' => $sector, 'years' => $years]);
    }

    public function update(Request $request) {
        $request->validate([
            'sector' => "required|max:256",
            'year_id' => 'required'
        ], [
            "sector.required" => "দয়া করে কিছু লিখুন",
            'year_id.required' => "দয়া করে যেকোনো একটি সিলেক্ট করুন"
        ]);

        $sector = Sector::where('id', $request->id)->firstOrFail();
        $sector->sector = $request->sector;
        $sector->status = $request->status;
        $sector->year_id = $request->year_id;
        $sector->save();

        return redirect()->route('sector.index')->with('success', "আপনি সফলভাবে একটি বিভাগ আপডেট করেছেন");
    }

    
}
