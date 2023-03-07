<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
require __DIR__.'/auth.php';
Route::get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:api'])->group(
    function () {
        Route::post('/status', [StatusController::class, 'store'])->name('status.store');
        Route::post('/status/{id}', [StatusController::class, 'update'])->name("status.update");
        Route::get('/status/{id}', [StatusController::class, 'show'])->name('status.show');
        Route::get('/status', [StatusController::class, 'index'])->name('status.index');
       
        Route::delete('/status/{id}', [StatusController::class, 'destroy'])->name("status.delete");
        
        Route::post('/comment/{id}', [CommentController::class, 'update'])->name("comment.update");
        Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
        Route::get('/comment', [CommentController::class, 'index'])->name('comment.index');
        Route::get('/comment/{id}', [CommentController::class, 'show'])->name('comment.shoe');
        Route::delete('/comment/{id}', [CommentController::class, 'destroy'])->name("comment.delete");
    });
    Route::get('/status', [StatusController::class, 'index'])->name('status.index');
       
    


    