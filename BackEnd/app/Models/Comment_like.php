<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment_like extends Model
{
    use HasFactory;
    protected $fillable = [
        'comment_id',
        'user_id',
    ];
}