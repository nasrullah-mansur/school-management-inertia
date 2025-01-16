<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function dashboard() {
        $dashboardPath = resource_path('js/Pages/Dashboard.jsx');
        
        return Inertia::render('Dashboard');
    }
}
