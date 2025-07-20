<?php

use App\Http\Controllers\PaletteController;
use App\Models\Palette;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PaletteController::class, 'index'])->name('palette');

Route::get('/palette/{palette}', [PaletteController::class, 'show'])->name('palette');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
