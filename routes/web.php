<?php

use App\Http\Controllers\PaletteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PaletteController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/palette/new', [PaletteController::class, 'create'])->name('create')->can('create', 'App\Models\User');
    Route::post('/palette/new', [PaletteController::class, 'store']);
    Route::get('/palette/{palette}', [PaletteController::class, 'show']);
    Route::delete('/palette/{palette}', [PaletteController::class, 'destroy']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
