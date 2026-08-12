<?php

use App\Http\Controllers\PublicAlumniController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicAlumniController::class, 'index'])->name('alumni.index');
