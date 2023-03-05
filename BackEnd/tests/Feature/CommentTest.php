<?php

namespace Tests\Feature;
use App\Models\Status;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_can_add_comment()
    {
        $data = $this->user;
        $input = Status::factory()->create([
            'user_id' => $data->id,
        ]);
        $input2 = Comment::factory()->create([
            'user_id' => $data->id,
            'status_id' => $input->id
        ]);
        $response = $this->actingAs($this->user)->postJson('api/comment', $input2->toArray());
        $response->assertStatus(200);
    }
    public function test_user_can_update_comment()
    {
        $data = $this->user;
        $input = Status::factory()->create([
            'user_id' => $data->id,
        ]);
        $input2 = Comment::factory()->create([
            'user_id' => $data->id,
            'status_id' => $input->id
        ]);
        $response = $this->actingAs($this->user)->postJson('api/comment/'.$input2->id, $input2->toArray());
        $response->assertStatus(200);
    }
    public function test_user_can_delete_comment()
    {
        $data = $this->user;
        $input = Status::factory()->create([
            'user_id' => $data->id,
        ]);
        $input2 = Comment::factory()->create([
            'user_id' => $data->id,
            'status_id' => $input->id
        ]);
        $response = $this->actingAs($this->user)->deleteJson('api/comment/'.$input2->id);
        $response->assertStatus(200);
    }
}