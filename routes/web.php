<?php

use App\Http\Controllers\PaletteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PaletteController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/palette/new', [PaletteController::class, 'create']);
    Route::post('/palette/new', [PaletteController::class, 'store'])->name('palette');
    Route::get('/palette/{palette}', [PaletteController::class, 'show'])->name('palette');
    Route::delete('/palette/{palette}', [PaletteController::class, 'destroy'])->name('palette');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
