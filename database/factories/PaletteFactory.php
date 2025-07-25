<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Palette>
 */
class PaletteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'visibility' => 'public',
            'colors' =>
[
  [ "name" => "red", "color" => "#F44336" ],
  [ "name" => "pink", "color" => "#E91E63" ],
  [ "name" => "purple", "color" => "#9C27B0" ],
  [ "name" => "deeppurple", "color" => "#673AB7" ],
  [ "name" => "indigo", "color" => "#3F51B5" ],
  [ "name" => "blue", "color" => "#2196F3" ],
  [ "name" => "lightblue", "color" => "#03A9F4" ],
  [ "name" => "cyan", "color" => "#00BCD4" ],
  [ "name" => "teal", "color" => "#009688" ],
  [ "name" => "green", "color" => "#4CAF50" ],
  [ "name" => "lightgreen", "color" => "#8BC34A" ],
  [ "name" => "lime", "color" => "#CDDC39" ],
  [ "name" => "yellow", "color" => "#FFEB3B" ],
  [ "name" => "amber", "color" => "#FFC107" ],
  [ "name" => "orange", "color" => "#FF9800" ],
  [ "name" => "deeporange", "color" => "#FF5722" ],
  [ "name" => "brown", "color" => "#795548" ],
  [ "name" => "grey", "color" => "#9E9E9E" ],
  [ "name" => "bluegrey", "color" => "#607D8B"]
]
,
            'user_id' => User::factory(),
            'emoji' => '👍'
        ];
    }
}
