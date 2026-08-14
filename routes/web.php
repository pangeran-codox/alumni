<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('alumni.index');
})->name('alumni.index');

