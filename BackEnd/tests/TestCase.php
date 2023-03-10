<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    protected const USER_DEFAULT_ID = '8';
    protected $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user =User::factory()->create();
        $this->withoutMiddleware(ThrottleRequests::class);
    }
}