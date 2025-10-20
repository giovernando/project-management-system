<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    protected $fillable = [
        'project_id',
        'week',
        'file_path',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
