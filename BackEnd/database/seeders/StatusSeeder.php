<?php

namespace Database\Seeders;
use App\Models\Status;
use App\Models\User;
use App\Models\Comment;
use App\Models\Status_like;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users   = User::pluck('id');
        $statuses = Status::factory()->count(15)->create(['user_id' => $users->random()]);
          foreach($statuses as $status){
            Status_like::factory()->count(rand(0,3))->create([
                'status_id'=>$status->id,
                'user_id' => $users->random(),
            ]);

            $comments=Comment::factory()->count(rand(0,3))->create([
                'status_id'=>$status->id, 
                'user_id' => $users->random()
            ]);
            foreach($comments as $comment){
                Comment::factory()->count(rand(0,3))->create([
                    'status_id'=>$status->id, 
                    'user_id' => $users->random(),
                    'reply_id'=>$comment->id
                ]);
            }
        }
    }
}