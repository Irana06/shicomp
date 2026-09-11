<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PaymentStatusEnum;
use App\Enums\StatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectStatusLog;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Overview of the running projects and the latest progress updates.
     */
    public function __invoke(): Response
    {
        $closed = [StatusEnum::Completed, StatusEnum::Cancelled];

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'active' => Project::whereNotIn('status', $closed)->count(),
                'pending' => Project::where('status', StatusEnum::Pending)->count(),
                'completed' => Project::where('status', StatusEnum::Completed)->count(),
                'awaiting_payment' => Project::where('status', '!=', StatusEnum::Cancelled)
                    ->where('payment_status', '!=', PaymentStatusEnum::Paid)
                    ->count(),
            ],
            'recentUpdates' => ProjectStatusLog::query()
                ->with('project')
                ->latest()
                ->limit(8)
                ->get()
                ->map(fn (ProjectStatusLog $log) => $this->presentUpdate($log)),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function presentUpdate(ProjectStatusLog $log): array
    {
        return [
            'id' => $log->id,
            'project_id' => $log->project_id,
            'project_code' => $log->project->project_code,
            'project_title' => $log->project->title,
            'status' => $log->status->value,
            'status_label' => $log->status->label(),
            'comment' => $log->comment,
            'created_at' => $log->created_at?->settings(['locale' => 'id'])->diffForHumans(),
        ];
    }
}
