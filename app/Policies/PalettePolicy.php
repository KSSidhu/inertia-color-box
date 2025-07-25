<?php

namespace App\Policies;

use App\Models\Palette;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PalettePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Palette $palette): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Palette $palette): bool
    {
        return $user->id === $palette->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Palette $palette): bool
    {
        return false;
    }
}
