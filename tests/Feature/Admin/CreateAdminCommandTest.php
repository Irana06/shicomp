<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateAdminCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_grants_admin_access_to_an_existing_user()
    {
        $user = User::factory()->create(['email' => 'yushika@example.com']);

        $this->artisan('shikacomp:admin', ['email' => 'Yushika@Example.com'])->assertSuccessful();

        $this->assertTrue($user->fresh()->is_admin);
    }

    public function test_it_creates_a_new_admin_account()
    {
        $this->artisan('shikacomp:admin', ['email' => 'yushika@example.com'])
            ->expectsQuestion('Nama', 'Yushika')
            ->expectsQuestion('Nomor HP', '081234567890')
            ->expectsQuestion('Password', 'rusa-nara-2026')
            ->assertSuccessful();

        $user = User::where('email', 'yushika@example.com')->firstOrFail();

        $this->assertTrue($user->is_admin);
        $this->assertSame('081234567890', $user->phone);
        $this->assertNotNull($user->email_verified_at);
    }

    public function test_it_rejects_an_invalid_email()
    {
        $this->artisan('shikacomp:admin', ['email' => 'bukan-email'])->assertFailed();
    }
}
