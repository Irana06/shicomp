<?php

namespace Tests\Feature\Admin;

use App\Enums\PaymentStatusEnum;
use App\Enums\StatusEnum;
use App\Models\Product;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->admin()->create());
    }

    public function test_non_admins_cannot_see_projects()
    {
        $project = Project::factory()->create();

        $this->actingAs(User::factory()->create());

        $this->get(route('admin.projects.show', $project))->assertForbidden();
    }

    public function test_admin_can_create_a_project_for_a_whatsapp_order()
    {
        $product = Product::factory()->create();

        $response = $this->post(route('admin.projects.store'), [
            'title' => 'Website Toko Kue',
            'product_id' => $product->id,
            'budget' => '3.500.000',
            'payment_status' => 'down_payment',
            'guest_name' => 'Bu Sari',
            'guest_phone' => '0812-3456-7890',
        ]);

        $project = Project::where('title', 'Website Toko Kue')->firstOrFail();

        $response->assertRedirect(route('admin.projects.show', $project));
        $this->assertSame('3500000.00', $project->budget);
        $this->assertSame('081234567890', $project->guest_phone);
        $this->assertSame(PaymentStatusEnum::DownPayment, $project->payment_status);
        $this->assertSame(StatusEnum::Pending, $project->status);
        $this->assertCount(1, $project->statusLogs);
    }

    public function test_guest_projects_need_a_client_name()
    {
        $this->post(route('admin.projects.store'), [
            'title' => 'Tanpa nama klien',
            'payment_status' => 'unpaid',
        ])->assertSessionHasErrors('guest_name');
    }

    public function test_admin_can_update_status_with_a_note_for_the_client()
    {
        $project = Project::factory()->guest()->create();

        $this->post(route('admin.projects.status', $project), [
            'status' => 'development',
            'comment' => '  Halaman beranda sudah bisa dicoba.  ',
        ])->assertRedirect(route('admin.projects.show', $project));

        $this->assertSame(StatusEnum::Development, $project->fresh()->status);
        $this->assertDatabaseHas('project_status_logs', [
            'project_id' => $project->id,
            'status' => 'development',
            'comment' => 'Halaman beranda sudah bisa dicoba.',
        ]);
    }

    public function test_status_must_be_a_known_value()
    {
        $project = Project::factory()->create();

        $this->post(route('admin.projects.status', $project), ['status' => 'selesai'])
            ->assertSessionHasErrors('status');
    }

    public function test_project_index_can_be_filtered_by_status_and_search()
    {
        Project::factory()->guest()->create(['title' => 'Website Toko Kue']);
        Project::factory()->guest()->create(['title' => 'Aplikasi Kasir'])
            ->updateStatus(StatusEnum::Development);

        $this->get(route('admin.projects.index', ['status' => 'development']))
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/projects/index')
                ->has('projects.data', 1)
                ->where('projects.data.0.title', 'Aplikasi Kasir')
                ->where('filters.status', 'development')
            );

        $this->get(route('admin.projects.index', ['search' => 'kue']))
            ->assertInertia(fn (Assert $page) => $page
                ->has('projects.data', 1)
                ->where('projects.data.0.title', 'Website Toko Kue')
            );
    }

    public function test_project_detail_includes_the_client_status_link()
    {
        $project = Project::factory()->guest()->create();

        $this->get(route('admin.projects.show', $project))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/projects/show')
                ->where('project.project_code', $project->project_code)
                ->where('project.status_url', route('project-status', ['kode' => $project->project_code]))
                ->where('project.client.name', $project->guest_name)
                ->has('project.logs', 1)
                ->has('statusOptions', 6)
            );
    }

    public function test_admin_can_delete_a_project()
    {
        $project = Project::factory()->create();

        $this->delete(route('admin.projects.destroy', $project))
            ->assertRedirect(route('admin.projects.index'));

        $this->assertModelMissing($project);
        $this->assertDatabaseMissing('project_status_logs', ['project_id' => $project->id]);
    }
}
