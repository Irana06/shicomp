<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Models\Project;
use App\Models\ProjectStatusLog;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectStatusController extends Controller
{
    /**
     * Let a client look up the progress of their project by its code.
     */
    public function __invoke(Request $request): Response
    {
        $code = Str::upper(trim((string) $request->query('kode', '')));

        $project = $code === ''
            ? null
            : Project::query()
                ->with(['product.category', 'statusLogs'])
                ->where('project_code', $code)
                ->first();

        return Inertia::render('public/project-status', [
            'code' => $code === '' ? null : $code,
            'project' => $project ? $this->present($project) : null,
        ]);
    }

    /**
     * Only expose what the client needs: no budget, payment or contact details.
     *
     * @return array<string, mixed>
     */
    private function present(Project $project): array
    {
        $logs = $project->statusLogs;

        $timeline = collect(StatusEnum::cases())
            ->reject(fn (StatusEnum $status) => $status === StatusEnum::Cancelled)
            ->map(fn (StatusEnum $status) => [
                'status' => $status->value,
                'label' => $status->label(),
                'reached_at' => $this->formatDate(
                    $logs->filter(fn (ProjectStatusLog $log) => $log->status === $status)
                        ->sortBy('created_at')
                        ->first()?->created_at,
                ),
            ])
            ->values();

        $note = $logs->filter(fn (ProjectStatusLog $log) => filled($log->comment))
            ->sortByDesc('created_at')
            ->first();

        return [
            'code' => $project->project_code,
            'title' => $project->title,
            'package' => $project->product
                ? "Paket {$project->product->name} · {$project->product->category->name}"
                : null,
            'status' => $project->status->value,
            'status_label' => $project->status->label(),
            'timeline' => $timeline,
            'latest_note' => $note ? [
                'comment' => $note->comment,
                'date' => $this->formatDate($note->created_at),
            ] : null,
        ];
    }

    private function formatDate(?CarbonImmutable $date): ?string
    {
        return $date?->settings(['locale' => 'id'])->translatedFormat('j F Y');
    }
}
