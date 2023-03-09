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
        $statuses = Status::factory()->count(15)->create();
        $users   = User::pluck('id');
          foreach($statuses as $status){
            Status_like::factory()->count(rand(0,3))->create([
                'status_id'=>$status->id,
                'user_id' => $users->random(),
            ]);

            Comment::factory()->count(rand(0,3))->create([
                'status_id'=>$status->id, 
                'user_id' => $users->random()
            ]);
        }
    }
}