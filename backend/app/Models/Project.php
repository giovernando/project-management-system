<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'name',
        'location',
        'status',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function weeklyReports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function finance(): HasMany
    {
        return $this->hasMany(Finance::class);
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }
}
