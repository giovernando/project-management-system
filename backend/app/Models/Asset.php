<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $fillable = [
        'name',
        'category',
        'quantity',
        'condition',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];
}
