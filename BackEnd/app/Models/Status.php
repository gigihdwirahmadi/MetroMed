<?php

namespace App\Models;

use App\Traits\Notifiable;
use App\Models\User;
use App\Models\Comment;
use App\Models\Status_like;
use App\Traits\Paging;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Status extends Model
{
    use HasFactory, Paging, Notifiable;
    protected $table= 'status';
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
    ];
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
        return $this->hasMany(Comment::class)->withCount("likesComment")->withCount("likeComment")->where('reply_id',null)
        ->with('users');
    }
    public function like()
    {
        return $this->belongsTo(Status_like::class,'id','status_id')->where('user_id',Auth::user()->id);
    }
    public function likes()
    {
        return $this->hasMany(Status_like::class);
    }
    
}