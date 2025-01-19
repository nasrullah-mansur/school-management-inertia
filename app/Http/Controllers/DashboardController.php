<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    function dashboard() {

        $dates = [];
        for ($i = 0; $i < 10; $i++) {
            $dates[] = Carbon::now()->subDays($i)->format('Y-m-d');
        }

        // Step 2: Fetch totals from the database
        $last10Days = Carbon::now()->subDays(10);

        $incomeData = DB::table('incomes')
            ->selectRaw('DATE(created_at) as date, SUM(amount) as total')
            ->where('created_at', '>=', $last10Days)
            ->groupBy('date')
            ->pluck('total', 'date');

        // Step 3: Merge with all dates
        $dailyTotals = collect($dates)->map(function ($date) use ($incomeData) {
            return (object)[
                'date' => $date,
                'total' => $incomeData->get($date, 0), // Default to 0 if no data
            ];
        });

        $users = User::with('income')
        ->get()
        ->map(function ($user) {
            $user->total_income = $user->income->sum('amount'); // Add total income as a property
            return $user;
        });
       
        return Inertia::render('Dashboard', [
            "dailyTotals" => $dailyTotals,
            "users" => $users
        ]);
    }
}
