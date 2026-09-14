<?php

namespace Tests\Feature;

use App\Enums\StatusEnum;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_non_admin_users_cannot_visit_the_dashboard()
    {
        $this->actingAs(User::factory()->create());

        $this->get(route('dashboard'))->assertForbidden();
    }

    public function test_admins_see_project_stats_and_recent_updates()
    {
        $this->actingAs(User::factory()->admin()->create());

        Project::factory()->create();
        Project::factory()->create()->updateStatus(StatusEnum::Completed, 'Sudah online.');

        $this->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/dashboard')
                ->where('stats.active', 1)
                ->where('stats.pending', 1)
                ->where('stats.completed', 1)
                ->has('recentUpdates', 3)
            );
    }
}
