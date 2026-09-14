<?php

namespace Tests\Feature;

use App\Enums\StatusEnum;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectStatusPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_status_page_renders_without_a_code()
    {
        $this->get(route('project-status'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/project-status')
                ->where('code', null)
                ->where('project', null)
            );
    }

    public function test_client_can_look_up_a_project_by_code()
    {
        $project = Project::factory()->guest()->create();
        $project->updateStatus(StatusEnum::Design);
        $project->updateStatus(StatusEnum::Development, 'Halaman beranda selesai.');

        $this->get(route('project-status', ['kode' => strtolower($project->project_code)]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/project-status')
                ->where('project.code', $project->project_code)
                ->where('project.status', 'development')
                ->has('project.timeline', 5)
                ->where('project.timeline.0.status', 'pending')
                ->whereNot('project.timeline.2.reached_at', null)
                ->where('project.timeline.3.reached_at', null)
                ->where('project.latest_note.comment', 'Halaman beranda selesai.')
                ->missing('project.budget')
                ->missing('project.guest_email')
                ->missing('project.guest_phone')
            );
    }

    public function test_unknown_code_shows_not_found()
    {
        $this->get(route('project-status', ['kode' => 'SHC-AAAA-BBBB']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('code', 'SHC-AAAA-BBBB')
                ->where('project', null)
            );
    }
}
