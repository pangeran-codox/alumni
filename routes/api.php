<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AlumniApiController;

Route::prefix('alumni')->group(function () {
    Route::get('/', [AlumniApiController::class, 'index']);
    Route::get('stats', [AlumniApiController::class, 'stats']);
    Route::get('filters', [AlumniApiController::class, 'filters']);
});
