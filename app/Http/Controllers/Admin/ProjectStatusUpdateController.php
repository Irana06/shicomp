<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectStatusRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ProjectStatusUpdateController extends Controller
{
    /**
     * Move a project to a status (or add a note) and log it for the client.
     */
    public function __invoke(ProjectStatusRequest $request, Project $project): RedirectResponse
    {
        $project->updateStatus($request->status(), $request->comment());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Status diperbarui: {$project->status->label()}.",
        ]);

        return to_route('admin.projects.show', $project);
    }
}
