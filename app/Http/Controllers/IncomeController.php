<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Income;
use App\Models\MoneyFor;
use App\Models\Month;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncomeController extends Controller
{
    public function money_for_index() {
        $money_fors = MoneyFor::all();
        return view('back.money_for.index', ['money_fors' => $money_fors]);
    }

    public function money_for_create() {
        return view('back.money_for.create');
    }

    public function money_for_store(Request $request) {
        $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);

        $money_for = new MoneyFor();
        $money_for->name = $request->name;
        $money_for->status = $request->status;
        $money_for->save();

        return redirect()->route('money.for.index')->with('success', "আপনি সফলভাবে একটি আয়ের খাত এড করেছেন");
    }

    public function money_for_edit($id) {
        $money_for = MoneyFor::where('id', $id)->firstOrFail();

        return view('back.money_for.edit', ['money_for' => $money_for]);
    }

    public function money_for_update(Request $request, $id) {
        $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);

        $money_for = MoneyFor::where('id', $id)->firstOrFail();
        $money_for->name = $request->name;
        $money_for->status = $request->status;
        $money_for->save();

        return redirect()->route('money.for.index')->with('success', "আপনি সফলভাবে একটি আয়ের খাত আপডেট করেছেন");
    }

    // For getting money;
    public function income_create($id) {
        $student = Admission::where('id', $id)->firstOrFail();
        $months = Month::all();
        $money_fors = MoneyFor::all();
        return view('back.income.create', ['student' => $student, 'months' => $months, 'money_fors' => $money_fors]);
    }


    public function income_store(Request $request) {
        $request->validate([
            'admission_id' => 'required',
            'money_for_id' => 'required',
            'month_id' => 'required',
            'amount' => 'required',
            'confirm_amount' => 'required||same:amount',
        ], [
            'amount.required' => "টাকার পরিমাণ দিন",
            'confirm_amount.required' => "টাকার পরিমাণ পুনরায় দিন",
            'amount.same' => "টাকার পরিমাণ ভুল দিয়েছেন",
        ]);

        $income = new Income();
        $income->admission_id = $request->admission_id;
        $income->money_for_id = $request->money_for_id;
        $income->month_id = $request->month_id;
        $income->amount = $request->amount;
        $income->user_id = Auth::user()->id;
        $income->save();

        return redirect()->route('admission.edit', $request->reg_id)->with('success', "টাকাটি সফলভাবে গ্রহণ করা হয়েছে");
    }

    
}
