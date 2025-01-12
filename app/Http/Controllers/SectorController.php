<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Sector;
use App\Models\Year;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    public function index() {
        $sectors = Sector::with('admissions')->get();
        return view('back.sector.index', ['sectors' => $sectors]);
    }

    public function create() {
        $years = Year::all();
        return view('back.sector.create', ['years' => $years]);
    }
    public function store(Request $request) {
        $request->validate([
            'sector' => "required|max:256",
            'prefix' => 'required|max:256',
            'year_id' => 'required'
        ], [
            "sector.required" => "দয়া করে কিছু লিখুন",
            "prefix.required" => "দয়া করে কিছু লিখুন"
        ]);

        $sector = new Sector();
        $sector->sector = $request->sector;
        $sector->year_id = $request->year_id;
        $sector->prefix = convertToEnglishFont($request->prefix);
        $sector->save();

        return redirect()->route('sector.index')->with('success', "আপনি সফলভাবে একটি বিভাগ যুক্ত করেছেন");
    }

    public function edit($id) {
        $sector = Sector::where('id', $id)->firstOrFail();
        $years = Year::all();
        return view('back.sector.edit', ['sector' => $sector, 'years' => $years]);
    }

    public function update(Request $request) {
        $request->validate([
            'sector' => "required|max:256",
            'prefix' => 'required|max:256',
            'year_id' => 'required'
        ], [
            "sector.required" => "দয়া করে কিছু লিখুন",
            "prefix.required" => "দয়া করে কিছু লিখুন"
        ]);

        $sector = Sector::where('id', $request->id)->firstOrFail();
        $sector->sector = $request->sector;
        $sector->year_id = $request->year_id;
        $sector->prefix = convertToEnglishFont($request->prefix) ;
        $sector->save();

        return redirect()->route('sector.index')->with('success', "আপনি সফলভাবে একটি বিভাগ এডিট করেছেন");
    }
    public function delete($id) {
        $sector = Sector::findOrFail($id);  
    
        $admission = Admission::where('sector_id', $sector->id)->first();
        
        if ($admission) {
            // Add a validation error and redirect back
            return redirect()->back()->withErrors(['error' => 'এই বিভাগে এখনও ভর্তি সংযুক্ত আছে। এটি মুছে ফেলা সম্ভব নয়।']);
        } else {
            $sector->delete();
            return redirect()->route('sector.index')->with('success', 'আপনি সফলভাবে একটি বিভাগ রিমুভ করেছেন');
        }
    }
}
