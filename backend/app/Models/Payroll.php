<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $fillable = [
        'worker_name',
        'amount',
        'month',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];
}
