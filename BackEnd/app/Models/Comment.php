<?php

namespace App\Models;

use App\Traits\Paging;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Comment_like;
class Comment extends Model
{
    use HasFactory, Paging;
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
    ];
     protected $fillable = [
        'user_id',
        'status_id',
        'comment',
        'reply_id',
        'reply_total'
    ];
    public function users()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function likeComment()
    {
        return $this->belongsTo(Comment_like::class,'comment_id','comment_id')->where('user_id',Auth::user()->id);
    }
     public function likesComment()
    {
         return $this->hasMany(Comment_like::class,'comment_id','comment_id');
    }
}