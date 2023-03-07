<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
    ];
     protected $fillable = [
        'user_id',
        'status_id',
        'comment',
    ];
}