<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YearController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CalculationController;
use App\Http\Controllers\IncomeSectorController;
use App\Http\Controllers\SectorIncomeController;

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


    // Student Routes;
    Route::get('students/all', [AdmissionController::class, 'index'])->name('admission.index');
    Route::get('student/admission', [AdmissionController::class, 'create'])->name('admission.create');
    Route::post('student/admission', [AdmissionController::class, 'store'])->name('admission.store');
    Route::get('/student/view/{id}', [AdmissionController::class, 'view'])->name('admission.view');
    Route::get('student/edit/{id}', [AdmissionController::class, 'edit'])->name('admission.edit');
    Route::post('student/admission/{id}', [AdmissionController::class, 'update'])->name('admission.update');


    // Student Search Route;
    Route::post('/student/find/', [SearchController::class, 'search_form'])->name('search.post');
    Route::get('/student/find/{id}', [SearchController::class, 'search_result'])->name('search.get');
    Route::get('/student/result/{reg_id}', [SearchController::class, 'single_view'])->name('search.single');
    

    Route::post('/student/filter', [SearchController::class, 'search_filter'])->name('search.filter');
    Route::get('/student/filter/result/{year_id}/{sector_id}/{status}', [SearchController::class, 'search_filter_result'])->name('search.filter.result');

    // PDF;
    Route::get('/pdf/vorti/{id}', [PDFController::class, 'vorti_pdf'])->name('vorti.pdf');
    Route::get('/pdf/download/students', [PDFController::class, 'students_pdf'])->name('students.pdf');

    // Income Sector;
    Route::get('income-sectors', [IncomeSectorController::class, 'index'])->name('income.sector.index');
    Route::get('income-sectors/create', [IncomeSectorController::class, 'create'])->name('income.sector.create');
    Route::post('income-sectors/store', [IncomeSectorController::class, 'store'])->name('income.sector.store');
    Route::get('income-sectors/edit/{id}', [IncomeSectorController::class, 'edit'])->name('income.sector.edit');
    Route::post('income-sectors/update', [IncomeSectorController::class, 'update'])->name('income.sector.update');

    Route::get('/income/all-income', [IncomeController::class, 'all_income'])->name('all.income');

    Route::get('/income/by/sector', [SectorIncomeController::class, 'index'])->name('income.by.sector.index');
    Route::post('/income/by/sector', [SectorIncomeController::class, 'search_req'])->name('income.by.sector.req');
    Route::get('/income/by/sector/{sector_id}/{income_sector_id}/{status}', [SectorIncomeController::class, 'search_result'])->name('income.by.sector.result');

    Route::get('accept-cash', [IncomeController::class, 'index'])->name('accept.cash.index');
    Route::post('accept-cash/find', [IncomeController::class, 'find'])->name('accept.cash.find');
    Route::get('accept-cash/student/{id}', [IncomeController::class, 'view'])->name('accept.cash.view');
    Route::post('accept-cash/store', [IncomeController::class, 'store'])->name('accept.cash.store');
    Route::post('accept-cash/update', [IncomeController::class, 'update'])->name('accept.cash.update');

    Route::get('/income/excel/download/{sector_id}/{income_sector_id}/{status}', [PDFController::class, 'income_excel'])->name('income.excel');
    Route::get('/income/pdf/download/{id}', [PDFController::class, 'income_pdf'])->name('income.pdf');
});

require __DIR__.'/auth.php';
