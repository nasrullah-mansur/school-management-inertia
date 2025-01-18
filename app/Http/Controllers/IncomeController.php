<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Income;
use App\Models\Admission;
use App\Models\IncomeSector;
use App\Models\Sector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncomeController extends Controller
{
    public function index() {
        $student = null;
        $incomes = null;
        $sectors = null;
        return Inertia::render("Income/AcceptCash/Index", [
            'student' => $student,
            'incomes' => $incomes,
            "sectors" => $sectors,
        ]);
    }

    public function find(Request $request) {
        
        if($request->reg_id == null) {
            return redirect()->route('accept.cash.index');
        }
        else {
            $student = Admission::where('reg_id', $request->reg_id)->first();
            if($student) {
                return redirect()->route("accept.cash.view", $student->reg_id);
            } else {
                return redirect()->route('accept.cash.index');
            }
        }
    }

    public function view($id) {
        $student = Admission::with('sector')->where('reg_id', $id)->firstOrFail();
        $incomes = Income::with('income_sector', "user")->where('admission_id', $student->id)->get();
        $sectors = IncomeSector::where('status', 'active')->orderBy('created_at', 'desc')->get();

        return Inertia::render("Income/AcceptCash/Index", [
            'student' => $student,
            'incomes' => $incomes,
            "sectors" => $sectors
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'amount' => "required",
            'income_sector_id' => "required",
            "confirm_amount" => "required|same:amount",
            "admission_id" => "required",
            "status" => "required",
            'sector_id' => "required"
        ], [
            'income_sector_id.required' => "দয়া করে একটি খাত সিলেক্ট করুন",
            'amount.required' => "টাকার পরিমাণটি লিখুন",
            'confirm_amount.required' => "টাকার পরিমাণটি আবার লিখুন",
            'confirm_amount.same' => "টাকার পরিমাণটি সঠিকভাবে লিখুন"
        ]);

        $income = new Income();
        $income->amount = intval(convertToEnglishFont($request->amount));
        $income->income_sector_id = $request->income_sector_id;
        $income->admission_id = $request->admission_id;
        $income->status = $request->status;
        $income->sector_id = $request->sector_id;
        $income->user_id = Auth::user()->id;
        $income->save();

        return redirect()->route("accept.cash.view", $request->reg_id)->with('success', "নগদ গ্রহণ সফলভাবে সম্পন্ন হয়েছে");

        // return $request;

    }

    public function all_income() {
        
        $incomes = Income::with('admission', 'sector', 'income_sector', 'user')
        ->whereHas('income_sector', function ($query) {
            $query->where('status', 'active');
        })
        ->orderBy('created_at', 'DESC')
        ->paginate(10);
        return Inertia::render("Income/All", [
            'incomes' => $incomes,
        ]);
    }

    public function download_req(Request $request) {
        return $request;
    }

}
