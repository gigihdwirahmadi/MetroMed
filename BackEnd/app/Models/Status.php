<?php

namespace App\Models;

use App\Traits\Notifiable;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory, Notifiable;
    protected $table= 'status';
    protected $fillable = [
        'detail',
        'user_id',
    ];
    public function users()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class)
        ->join('users','users.id', 'comments.user_id');
    }
}