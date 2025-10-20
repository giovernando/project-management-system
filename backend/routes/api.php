<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Projects - accessible to all authenticated users
    Route::apiResource('projects', ProjectController::class);

    // Finance - only keuangan and super_admin
    Route::middleware('role:keuangan,super_admin')->apiResource('finance', FinanceController::class);

    // Assets - accessible to all authenticated users
    Route::apiResource('assets', AssetController::class);

    // Vendors - accessible to all authenticated users
    Route::apiResource('vendors', VendorController::class);

    // Reports - accessible to all authenticated users
    Route::apiResource('reports', ReportController::class);
    Route::get('reports/{report}/download', [ReportController::class, 'download']);

    // Users - only super_admin
    Route::middleware('role:super_admin')->apiResource('users', UserController::class);
});
