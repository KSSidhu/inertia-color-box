<?php

namespace App\Http\Controllers;

use App\Models\Palette;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaletteController extends Controller
{
    /**
     * Display a listing of the publicly available palettes.
     */
    public function index(): Response
    {

        $palettes = Palette::where('visibility', 'public')->limit(10)->get();

        return Inertia::render('palette-list', ['palettes' => $palettes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Palette $palette): Response
    {
        $palette = Palette::where('id', $palette->id)->first();

        return Inertia::render('palette', ['palette' => $palette]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Palette $palette): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Palette $palette): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Palette $palette): RedirectResponse
    {
        $palette->delete();

        return redirect('/');
    }
}
