<?php

namespace Tests\Feature;

use App\Models\Status;
use App\Models\Comment;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StatusTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_can_see_all_status()
    {
        $data = $this->user;
        $statuses = Status::factory()->count(6)->create([
            'user_id' => $data->id,
        ]);
        foreach ($statuses as $status) {
            Status::create([
                "detail"=>$status->detail,
                "user_id" => $status->user_id
            ]);
        }
        $response = $this->actingAs($this->user)->get("api/status");
        $response->assertStatus(200);
    }
    public function test_user_can_add_status()
    {
        $data = $this->user;
        $input = Status::factory()->create([
            'user_id' => $data->id,
        ]);

        $response = $this->actingAs($this->user)->postJson('api/status', $input->toArray());

        $response->assertStatus(201);
    }
    public function test_user_can_see_one_status()
    {
        $data = $this->user;
        $status = Status::factory()->create([
            'user_id' => $data->id,
        ]);
        $comments = Comment::factory()->count(6)->create([
            'user_id' => $data->id,
            'status_id' =>$status->id
        ]);
        $response = $this->actingAs($this->user)->get("api/status/$status->id");
        $response->assertStatus(200);
    }
    public function test_user_can_update_status()
    {
        $data = $this->user;
        $input = Status::factory()->create([
            'user_id' => $data->id,
        ]);

        $response = $this->actingAs($this->user)->postJson('api/status/'.$input->id, $input->toArray());

        $response->assertStatus(201);
    }
    public function test_user_can_delete_status()
    {
        $data = $this->user;
        $input = Status::factory()->create([
            'user_id' => $data->id,
        ]);

        $response = $this->actingAs($this->user)->deleteJson('api/status/'.$input->id);

        $response->assertStatus(204);
    }
}