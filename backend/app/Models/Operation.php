<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    protected $fillable = [
        'month',
        'amount',
        'description',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];
}
