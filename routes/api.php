<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', [UserController::class, 'show']);
    Route::post('/team', [TeamController::class, 'create']);
});


Route::middleware(['auth:sanctum', 'isTeamMember'])->group(function () {
    Route::get('/team/{id}', [TeamController::class, 'show']);
    Route::delete('/team/{id}', [TeamController::class, 'delete']);
    Route::post('/team/{id}/addMember', [TeamController::class, 'addMember']);
});
