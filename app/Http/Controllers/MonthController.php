<?php

namespace App\Http\Controllers;

use App\Models\Month;
use App\Models\Year;
use Illuminate\Http\Request;

class MonthController extends Controller
{
    public function index() {
        $months = Month::with('year')->get();
        return view('back.month.index', ['months' => $months]);
    }

    public function create() {
        $years = Year::all();
        return view('back.month.create', ['years' => $years]);
    }
    public function store(Request $request) {
        $request->validate([
            'month' => "required|max:256",
            'year_id' => "required|numeric",
        ], [
            "month.required" => "দয়া করে কিছু লিখুন",
            "year_id.required" => "দয়া করে যেকোনো একটি সিলেক্ট করুন", 
        ]);

        $month = new Month();
        $month->month = $request->month;
        $month->year_id = $request->year_id;
        $month->save();

        return redirect()->route('month.index')->with('success', "আপনি সফলভাবে একটি মাস যুক্ত করেছেন");
    }

    public function edit($id) {
        $month = Month::where('id', $id)->firstOrFail();
        $years = Year::all();
        return view('back.month.edit', ['month' => $month, 'years' => $years]);
    }

    public function update(Request $request) {
        $request->validate([
            'month' => "required|max:256",
            'year_id' => "required|numeric",
        ], [
            "month.required" => "দয়া করে কিছু লিখুন",
            "year_id.required" => "দয়া করে যেকোনো একটি সিলেক্ট করুন", 
        ]);

        $month = Month::where('id', $request->id)->firstOrFail();

        $month->month = $request->month;
        $month->year_id = $request->year_id;
        $month->status = $request->status;
        $month->save();

        return redirect()->route('month.index')->with('success', "আপনি সফলভাবে একটি মাস এডিট করেছেন");
    }
    public function delete($id) {
        $month = Month::where('id', $id)->firstOrFail();  
        $month->delete();
        return redirect()->route('month.index')->with('success', "আপনি সফলভাবে একটি মাস রিমুভ করেছেন");
    }
}
