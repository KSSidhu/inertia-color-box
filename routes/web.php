<?php

use App\Http\Controllers\PaletteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PaletteController::class, 'index'])->name('home');
Route::get('/palette/{palette}', [PaletteController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/create', [PaletteController::class, 'create'])->name('create');
    Route::post('/create', [PaletteController::class, 'store']);
    Route::delete('/palette/{palette}', [PaletteController::class, 'destroy']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
