<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Palette extends Model
{
    /** @use HasFactory<\Database\Factories\PaletteFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'emoji',
        'colors',
        'visibility'
    ];

    protected $casts = ['colors' => AsCollection::class];
}
