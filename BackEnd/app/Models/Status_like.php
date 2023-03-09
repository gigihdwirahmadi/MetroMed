<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status_like extends Model
{
    use HasFactory;
    protected $fillable = [
        'status_id',
        'user_id',
    ];
}