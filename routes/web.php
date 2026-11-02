<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// The portfolio homepage is registered once in routes/portfolio.php.
// Preserve the existing Laravel dashboard/settings/auth routes.
// The default Laravel auth layouts still call route('home'). Keep an alias.
Route::redirect('/home', '/')->name('home');
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/portfolio.php';
