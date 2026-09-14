<?php

namespace Tests\Feature;

use App\Enums\PaymentStatusEnum;
use App\Enums\StatusEnum;
use App\Models\Product;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_project_gets_a_code_and_an_initial_status_log()
    {
        $project = Project::factory()->create();

        $this->assertMatchesRegularExpression('/^SHC-[A-Z2-9]{4}-[A-Z2-9]{4}$/', $project->project_code);
        $this->assertSame(StatusEnum::Pending, $project->status);
        $this->assertSame(PaymentStatusEnum::Unpaid, $project->payment_status);
        $this->assertCount(1, $project->statusLogs);
        $this->assertSame(StatusEnum::Pending, $project->statusLogs->first()->status);
    }

    public function test_updating_status_records_a_log_entry()
    {
        $project = Project::factory()->create();

        $project->updateStatus(StatusEnum::Development, 'Halaman beranda selesai.');

        $this->assertSame(StatusEnum::Development, $project->fresh()->status);
        $this->assertDatabaseHas('project_status_logs', [
            'project_id' => $project->id,
            'status' => StatusEnum::Development->value,
            'comment' => 'Halaman beranda selesai.',
        ]);
    }

    public function test_deleting_a_user_keeps_their_projects()
    {
        $user = User::factory()->create();
        $project = Project::factory()->for($user)->create();

        $user->delete();

        $this->assertNull($project->fresh()->user_id);
    }

    public function test_a_product_with_projects_cannot_be_deleted()
    {
        $product = Product::factory()->create();
        Project::factory()->for($product)->create();

        $this->expectException(QueryException::class);

        $product->delete();
    }
}
