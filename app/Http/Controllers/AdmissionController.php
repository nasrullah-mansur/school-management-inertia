<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Income;
use App\Models\Sector;
use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdmissionController extends Controller
{
    public function index() {
        $years = Year::all();
        $sectors = Sector::all();
        $admissions = Admission::with('year')
        ->whereHas('year', function ($query) {
            $query->where('status', 'active');
        })
        ->orderBy('created_at', 'DESC')
        ->paginate(10);
        return Inertia::render("Student/Index", ['admissions' => $admissions, "years" => $years, "sectors" => $sectors]);
    }

    public function create() {
        $years = Year::where('status', 'active')->get();
        $sectors = Sector::where('status', 'active')->get();
        return Inertia::render('Student/Create', [
            'years' => $years,
            "sectors" => $sectors,
        ]);
    }

    public function view($id) {
        $student = Admission::with('year', 'user', 'sector')->where('id', $id)->firstOrFail();
        return Inertia::render("Student/Show", ["student" => $student]);
    }

    public function store(Request $request) {
        // return $request;
        $request->validate([
            'name' => 'required|max:256', 
            'father_name' => "required|max:256",
            'year_id' => 'required|numeric', 
            'sector_id' => 'required|numeric', 
            'form_no' => 'required|unique:admissions', 
            'phone' => 'required|max:256',
        ], [
            'name.required' => 'পূর্ণ নামটি লিখুন',
            'father_name.required' => 'পিতার নামটি লিখুন',
            'name.required' => 'পিতার নামটি লিখুন',
            'year_id.required' => "একটি শিক্ষাবর্ষ সিলেক্ট করুন",
            'sector_id.required' => "একটি বিভাগ সিলেক্ট করুন",
            "form_no.required" => "ভর্তি ফরম নাম্বার লিখুন",
            "form_no.unique" => "এই ফরম নাম্বারটি একবার ব্যবহৃত হয়েছে",
            "phone.required" => "ফোন নাম্বারটি লিখুন",
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
        $admission->status = $request->status;
        
        $admission->user_id = strval(Auth::user()->id);
        $admission->phone_2 = convertToEnglishFont($request->phone_2);
        $admission->phone_3 = convertToEnglishFont($request->phone_3);
        
        $sector = Sector::where('id', $request->sector_id)->firstOrFail();

        $maxAdmission = Admission::where('year_id', $request->year_id)
        ->where('sector_id', $request->sector_id)
        ->count();

        $admission->reg_id = $sector->prefix .  str_pad($maxAdmission + 1, 3, '0', STR_PAD_LEFT) ;

        $admission->save();

        return redirect()->route('admission.index')->with('success', "একজন ছাত্রের ভর্তি কার্যক্রম সফলভাবে সম্পন্ন হয়েছে");

    }

    public function edit($id) {
        $student = Admission::where('id', $id)->firstOrFail();
        $years = Year::where('status', 'active')->get();
        $sectors = Sector::where('status', 'active')->get();
        return Inertia::render('Student/Edit', [
            'years' => $years,
            "sectors" => $sectors,
            "student" => $student
        ]);
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
        $admission->status = $request->status;
        
        $admission->user_id = strval(Auth::user()->id);
        $admission->phone_2 = convertToEnglishFont($request->phone_2);
        $admission->phone_3 = convertToEnglishFont($request->phone_3);

        $admission->save();

        return redirect()->route('admission.index')->with('success', "ছাত্রের ভর্তি তথ্য সফলভাবে আপডেট হয়েছে");

    } 
}

