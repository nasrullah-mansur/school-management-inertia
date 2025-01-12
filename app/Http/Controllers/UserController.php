<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return view('back.user.index', ['users' => $users]);
    }

    public function create() {
        return view('back.user.create');
    }
    public function store(Request $request) {
        $request->validate([
            'name' => "required|max:256",
            'email' => "required|max:256|email",
            'phone' => "required|max:256",
            'role' => "required|max:256",
            'status' => "required|max:256",

        ], [
            "name.required" => "দয়া করে কিছু লিখুন",
            "email.required" => "দয়া করে কিছু লিখুন",
            "phone.required" => "দয়া করে কিছু লিখুন",
            "role.required" => "দয়া করে কিছু লিখুন",
            "status.required" => "দয়া করে কিছু লিখুন",
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->role = $request->role;
        $user->status = $request->status;
        $user->password = Hash::make('password');
        $user->save();

        return redirect()->route('user.index')->with('success', "আপনি সফলভাবে একজন ব্যবহারকারী যুক্ত করেছেন");
    }

    public function edit($id) {
        $user = User::where('id', $id)->firstOrFail();

        return view('back.user.edit', ['user' => $user]);
    }

    public function update(Request $request) {
        $request->validate([
            'name' => "required|max:256",
            'email' => "required|max:256|email",
            'phone' => "required|max:256",
            'role' => "required|max:256",
            'status' => "required|max:256",

        ], [
            "name.required" => "দয়া করে কিছু লিখুন",
            "email.required" => "দয়া করে কিছু লিখুন",
            "phone.required" => "দয়া করে কিছু লিখুন",
            "role.required" => "দয়া করে কিছু লিখুন",
            "status.required" => "দয়া করে কিছু লিখুন",
        ]);

        $user = User::where('id', $request->id)->firstOrFail();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->role = $request->role;
        $user->status = $request->status;
        $user->password = Hash::make('password');
        $user->save();

        return redirect()->route('user.index')->with('success', "আপনি সফলভাবে একজন ব্যবহারকারী এডিট করেছেন");
    }
    public function delete($id) {
        $user = User::where('id', $id)->firstOrFail();  
        $user->delete();
        return redirect()->route('user.index')->with('success', "আপনি সফলভাবে একজন ব্যবহারকারী রিমুভ করেছেন");
    }

    public function status_change(Request $request) {
        $request->validate([
            "id" => "required"
        ]);
        $id = $request->id;

        $user = User::where('id', $id)->firstOrFail();
        $user->status = $user->status === STATUS_ACTIVE ? STATUS_INACTIVE : STATUS_ACTIVE;
        $user->save();

        return redirect()->route('user.index')->with('success', "আপনি সফলভাবে একজন ব্যবহারকারীর স্টাটাস পরিবর্তন করেছেন");
    }
}
