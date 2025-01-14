<?php

use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\MonthController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YearController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Welcome");
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(["auth"])->group(function() {
    // Dashboard;
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    // Year Routes;
    Route::get('years', [YearController::class, 'index'])->name('year.index');
    Route::get('years/create', [YearController::class, 'create'])->name('year.create');
    Route::post('years/store', [YearController::class, 'store'])->name('year.store');
    Route::get('years/edit/{id}', [YearController::class, 'edit'])->name('year.edit');
    Route::post('years/update', [YearController::class, 'update'])->name('year.update');

    // Month Routes;
    Route::get('months', [MonthController::class, 'index'])->name('month.index');
    Route::get('months/create', [MonthController::class, 'create'])->name('month.create');
    Route::post('months/store', [MonthController::class, 'store'])->name('month.store');
    Route::get('months/edit/{id}', [MonthController::class, 'edit'])->name('month.edit');
    Route::post('months/update', [MonthController::class, 'update'])->name('month.update');

    // Sector Routes;
    Route::get('sectors', [SectorController::class, 'index'])->name('sector.index');
    Route::get('sectors/create', [SectorController::class, 'create'])->name('sector.create');
    Route::post('sectors/store', [SectorController::class, 'store'])->name('sector.store');
    Route::get('sectors/edit/{id}', [SectorController::class, 'edit'])->name('sector.edit');
    Route::post('sectors/update', [SectorController::class, 'update'])->name('sector.update');

    // Admin adn Staff Routes;
    Route::get('users', [UserController::class, 'index'])->name('user.index');
    Route::get('users/create', [UserController::class, 'create'])->name('user.create');
    Route::post('users/store', [UserController::class, 'store'])->name('user.store');
    Route::get('users/delete/{id}', [UserController::class, 'delete'])->name('user.delete');
    Route::get('users/status/change', [UserController::class, 'status_change'])->name('user.status.change');


    // Everything about student routes;;
    Route::get('students/all', [AdmissionController::class, 'index'])->name('admission.index');
    Route::get('student/admission', [AdmissionController::class, 'create'])->name('admission.create');
    Route::post('student/admission', [AdmissionController::class, 'store'])->name('admission.store');
    Route::get('student/edit/{id}', [AdmissionController::class, 'edit'])->name('admission.edit');
    Route::post('student/admission/{id}', [AdmissionController::class, 'update'])->name('admission.update');


    Route::get('student/by/me', [AdmissionController::class, 'by_me'])->name('admission.by.me');
    Route::post('student/find', [AdmissionController::class, 'find'])->name('admission.find');
    Route::get('student/find/{tag}/{id}', [AdmissionController::class, 'edit_list'])->name('admission.get');
    Route::get('student/check', [AdmissionController::class, 'student_check'])->name('admission.check');


    // PDF;
    Route::get('/pdf/vorti/{reg_no}', [PDFController::class, 'vorti_pdf'])->name('vorti.pdf');


    // Mony For;
    Route::get('/money-for', [IncomeController::class, 'money_for_index'])->name('money.for.index');
    Route::get('/money-for/create', [IncomeController::class, 'money_for_create'])->name('money.for.create');
    Route::post('/money-for', [IncomeController::class, 'money_for_store'])->name('money.for.store');
    Route::get('/money-for/{id}', [IncomeController::class, 'money_for_edit'])->name('money.for.edit');
    Route::post('/money-for/{id}', [IncomeController::class, 'money_for_update'])->name('money.for.update');

    // Income;
    Route::get('/income/create/{id}', [IncomeController::class, 'income_create'])->name('income.create');
    Route::post('/income/store', [IncomeController::class, 'income_store'])->name('income.store');


});

require __DIR__.'/auth.php';
