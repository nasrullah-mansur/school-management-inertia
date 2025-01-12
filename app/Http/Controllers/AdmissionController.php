<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Income;
use App\Models\Sector;
use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdmissionController extends Controller
{
    public function create() {
        $years = Year::all();
        $sectors = Sector::all();
        $admissions = Admission::orderBy('created_at', 'DESC')->take(5)->get();
        return view('back.student.create', [
            'years' => $years,
            "sectors" => $sectors,
            "admissions" => $admissions
        ]);
    }

    public function store(Request $request) {

        
        
        $request->validate([
            'name' => 'required|max:256', 
            'year_id' => 'required|numeric', 
            'sector_id' => 'required|numeric', 
            'form_no' => 'required|unique:admissions', 
            'phone' => 'required|max:256',
        ], [
            'name.required' => 'দয়া করে পূর্ণ নামটি লিখুন',
            'year_id.required' => "দয়া করে একটি শিক্ষাবর্ষ সিলেক্ট করুন",
            'sector_id.required' => "দয়া করে একটি বিভাগ সিলেক্ট করুন",
            "form_no.unique" => "এই ফরম নাম্বারটি একবার ব্যবহৃত হয়েছে"
        ]);

        $admission = new Admission();
        $admission->name = $request->name;
        $admission->year_id = $request->year_id;
        $admission->sector_id = $request->sector_id;
        $admission->form_no = convertToEnglishFont($request->form_no);
        $admission->phone = convertToEnglishFont($request->phone);
        $admission->father_name = $request->father_name;
        $admission->birth_day = $request->birth_day;
        $admission->birth_no = $request->birth_no;
        $admission->nid_no = $request->nid_no;
        $admission->village = $request->village;
        $admission->post = $request->post;
        $admission->thana = $request->thana;
        $admission->zila = $request->zila;
        
        $admission->user_id = strval(Auth::user()->id);
        $admission->phone_2 = convertToEnglishFont($request->phone_2);
        $admission->phone_3 = convertToEnglishFont($request->phone_3);
        
        $sector = Sector::where('id', $request->sector_id)->firstOrFail();

        $maxAdmission = Admission::where('year_id', $request->year_id)
        ->where('sector_id', $request->sector_id)
        ->count();

        $admission->reg_id = $sector->prefix .  str_pad($maxAdmission + 1, 3, '0', STR_PAD_LEFT) ;

        $admission->save();

        return redirect()->route('admission.create')->with('success', "একজন ছাত্রের ভর্তি কার্যক্রম সফলভাবে সম্পন্ন হয়েছে");

    }

    public function update(Request $request, $id) {
        $admission = Admission::where('id', $id)->firstOrFail();

        $rules = [
            'name' => 'required|max:256',
            'year_id' => 'required|numeric',
            'sector_id' => 'required|numeric',
            'phone' => 'required|max:256',
        ];

        $messages = [
            'name.required' => 'দয়া করে পূর্ণ নামটি লিখুন',
            'year_id.required' => "দয়া করে একটি শিক্ষাবর্ষ সিলেক্ট করুন",
            'sector_id.required' => "দয়া করে একটি বিভাগ সিলেক্ট করুন",
        ];

        if ($admission->form_no != $request->form_no) {
            $rules['form_no'] = 'required|unique:admissions';
        }

        $request->validate($rules, $messages);

        
        $admission->name = $request->name;
        $admission->year_id = $request->year_id;
        $admission->sector_id = $request->sector_id;
        $admission->form_no = convertToEnglishFont($request->form_no);
        $admission->phone = convertToEnglishFont($request->phone);
        $admission->father_name = $request->father_name;
        $admission->birth_day = $request->birth_day;
        $admission->birth_no = $request->birth_no;
        $admission->nid_no = $request->nid_no;
        $admission->village = $request->village;
        $admission->post = $request->post;
        $admission->thana = $request->thana;
        $admission->zila = $request->zila;
        
        $admission->user_id = strval(Auth::user()->id);
        $admission->phone_2 = convertToEnglishFont($request->phone_2);
        $admission->phone_3 = convertToEnglishFont($request->phone_3);

        $admission->save();

        return redirect()->back()->with('success', "ছাত্রের ভর্তি তথ্য সফলভাবে আপডেট হয়েছে");

    }

    public function by_me() {
        $admissions = Admission::where('user_id', Auth::user()->id)->paginate(10);
        return view("back.student.me", ['admissions' => $admissions]);
    }

    public function find(Request $request) {
        // return $request;
        $r_id = $request->r_id;
        $phone = $request->phone;

        if($r_id) {
            return redirect()->route('admission.get', ['registration', $r_id]);
        }

        if($phone) {
            return redirect()->route('admission.get', ['phone', $phone]);
        }

        return redirect()->route('admission.create');
        
    }

    public function edit_list($tag, $id) {
        $admissions = null;

        if($tag == 'registration') {
            $admissions = Admission::where('reg_id', $id)->get();
        } else {
            $admissions = Admission::where('phone', $id)->get();
        }
        return view('back.student.edit_list', [
            'admissions' => $admissions,            
        ]);
    }

    // For add money or edit student data;
    public function edit_form($id) {
        $admission = Admission::where('reg_id', $id)->firstOrFail();
        $incomes = Income::where('admission_id', $admission->id)->get();
        $years = Year::all();
        $sectors = Sector::all();
        return view('back.student.edit_form', [
            'admission' => $admission,
            'years' => $years,
            'sectors' => $sectors,
            'incomes' => $incomes,
        ]);
    }

    public function student_check() {
        return view('back.student.check');
    }

    
}

