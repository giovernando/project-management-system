<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'name',
        'stock',
        'remaining_stock',
    ];

    protected $casts = [
        'stock' => 'integer',
        'remaining_stock' => 'integer',
    ];
}
