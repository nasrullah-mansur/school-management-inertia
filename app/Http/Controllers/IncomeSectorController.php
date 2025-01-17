<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\IncomeSector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncomeSectorController extends Controller
{
    public function index() {
        $income_sectors = IncomeSector::orderBy('created_at', 'DESC')->get();
        return Inertia::render("Income/Sector/Index", ["income_sectors" => $income_sectors]);
    }

    public function create() {
        return Inertia::render("Income/Sector/Create");
    }

    public function store(Request $request) {
        $request->validate([
            'name' => "required|max:256",
            'status' => "required",
        ], [
            'name.required' => "একটি আয়ের খাত লিখুন"
        ]);

        $income_sector = new IncomeSector();
        $income_sector->name = $request->name;
        $income_sector->status = $request->status;
        $income_sector->user_id = Auth::user()->id;
        $income_sector->save();

        return redirect()->route("income.sector.index")->with('success', "আয়ের খাতটি সফলভাবে যুক্ত হয়েছে");
    }

    public function edit($id) {
        $income_sector = IncomeSector::where('id', $id)->firstOrFail();
        return Inertia::render('Income/Sector/Edit', ["income_sector" => $income_sector]);
    }

    public function update(Request $request) {
        $request->validate([
            'name' => "required|max:256",
            'status' => "required",
            'id' => 'required'
        ], [
            'name.required' => "একটি আয়ের খাত লিখুন"
        ]);

        $income_sector = IncomeSector::where('id', $request->id)->firstOrFail();
        $income_sector->name = $request->name;
        $income_sector->status = $request->status;
        $income_sector->user_id = Auth::user()->id;
        $income_sector->save();

        return redirect()->route("income.sector.index")->with('success', "আয়ের খাতটি সফলভাবে পরিবর্তন হয়েছে");
    }
}
