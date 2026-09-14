<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PaymentStatusEnum;
use App\Enums\StatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Models\Product;
use App\Models\Project;
use App\Models\ProjectStatusLog;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim($request->string('search')->toString());
        $status = StatusEnum::tryFrom($request->string('status')->toString());

        $projects = Project::query()
            ->with(['product', 'user'])
            ->when($search !== '', fn ($query) => $query->where(fn ($query) => $query
                ->where('project_code', 'like', "%{$search}%")
                ->orWhere('title', 'like', "%{$search}%")
                ->orWhere('guest_name', 'like', "%{$search}%")
            ))
            ->when($status, fn ($query) => $query->where('status', $status))
            ->latest('updated_at')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Project $project) => $this->presentListItem($project));

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => [
                'search' => $search,
                'status' => $status?->value,
            ],
            'statusOptions' => StatusEnum::options(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/create', $this->formOptions());
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        $project = Project::create($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Project dibuat dengan kode {$project->project_code}.",
        ]);

        return to_route('admin.projects.show', $project);
    }

    public function show(Project $project): Response
    {
        $project->load(['product.category', 'user']);

        $client = $project->user;

        return Inertia::render('admin/projects/show', [
            'project' => [
                'id' => $project->id,
                'project_code' => $project->project_code,
                'title' => $project->title,
                'brief' => $project->brief,
                'budget' => $project->budget,
                'status' => $project->status->value,
                'status_label' => $project->status->label(),
                'payment_status' => $project->payment_status->value,
                'payment_status_label' => $project->payment_status->label(),
                'package' => $project->product
                    ? "{$project->product->name} · {$project->product->category->name}"
                    : null,
                'client' => [
                    'name' => $client !== null ? $client->name : $project->guest_name,
                    'email' => $client !== null ? $client->email : $project->guest_email,
                    'phone' => $client !== null ? $client->phone : $project->guest_phone,
                    'has_account' => $client !== null,
                ],
                'created_at' => $this->formatDate($project->created_at),
                'status_url' => route('project-status', ['kode' => $project->project_code]),
                'logs' => $project->statusLogs()
                    ->latest()
                    ->get()
                    ->map(fn (ProjectStatusLog $log) => [
                        'id' => $log->id,
                        'status' => $log->status->value,
                        'status_label' => $log->status->label(),
                        'comment' => $log->comment,
                        'created_at' => $this->formatDate($log->created_at, withTime: true),
                    ]),
            ],
            'statusOptions' => StatusEnum::options(),
        ]);
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/edit', [
            'project' => [
                'id' => $project->id,
                'project_code' => $project->project_code,
                'title' => $project->title,
                'brief' => $project->brief,
                'budget' => $project->budget,
                'product_id' => $project->product_id,
                'payment_status' => $project->payment_status->value,
                'guest_name' => $project->guest_name,
                'guest_email' => $project->guest_email,
                'guest_phone' => $project->guest_phone,
                'has_account' => $project->user_id !== null,
            ],
            ...$this->formOptions(),
        ]);
    }

    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $project->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project disimpan.']);

        return to_route('admin.projects.show', $project);
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Project {$project->project_code} dihapus.",
        ]);

        return to_route('admin.projects.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function presentListItem(Project $project): array
    {
        return [
            'id' => $project->id,
            'project_code' => $project->project_code,
            'title' => $project->title,
            'client' => $project->user !== null ? $project->user->name : $project->guest_name,
            'package' => $project->product?->name,
            'status' => $project->status->value,
            'status_label' => $project->status->label(),
            'payment_status' => $project->payment_status->value,
            'payment_status_label' => $project->payment_status->label(),
            'updated_at' => $this->formatDate($project->updated_at),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formOptions(): array
    {
        return [
            'products' => Product::query()
                ->with('category')
                ->orderBy('sort_order')
                ->get()
                ->map(fn (Product $product) => [
                    'id' => $product->id,
                    'name' => "{$product->name} · {$product->category->name}",
                ]),
            'paymentOptions' => PaymentStatusEnum::options(),
        ];
    }

    private function formatDate(?CarbonImmutable $date, bool $withTime = false): ?string
    {
        return $date?->settings(['locale' => 'id'])->translatedFormat($withTime ? 'j M Y, H:i' : 'j M Y');
    }
}
