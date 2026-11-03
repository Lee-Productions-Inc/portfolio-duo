<?php
namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response //here
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::query()->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate($this->rules(), $this->messages());
        $file = $data['image'] ?? null;
        unset($data['image']);
        if ($file) {
            $data['image_path'] = $file->store('projects', 'public');
        }
        Project::create($data);
        return to_route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $request->validate($this->rules($project), $this->messages());
        $file = $data['image'] ?? null;
        unset($data['image']);
        if ($file) {
            $data['image_path'] = $file->store('projects', 'public');
        }
        $oldImage = $project->image_path;
        $project->update($data);
        if ($file && $oldImage && str_starts_with($oldImage, 'projects/')) {
            Storage::disk('public')->delete($oldImage);
        }
        return to_route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $image = $project->image_path;
        $project->delete();
        if ($image && str_starts_with($image, 'projects/')) {
            Storage::disk('public')->delete($image);
        }
        return to_route('projects.index')->with('success', 'Project deleted successfully.');
    }

    private function rules(?Project $project = null): array
    {
        return [
            'title' => ['required', 'string', 'min:3', 'max:120', Rule::unique('projects', 'title')->ignore($project?->id)],
            'description' => ['required', 'string', 'min:30', 'max:2000'],
            'tech_stack' => ['required', 'string', 'max:255'],
            'project_url' => ['nullable', 'url:http,https', 'max:2048'],
            'repository_url' => ['nullable', 'url:http,https', 'max:2048'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'completed_at' => ['nullable', 'date', 'before_or_equal:today'],
            'status' => ['required', Rule::in(['planned', 'in_progress', 'completed'])],
        ];
    }

    private function messages(): array
    {
        return [
            'title.unique' => 'This project title already exists. Choose a different title.',
            'description.min' => 'Write at least 30 characters so visitors understand the project.',
            'image.mimes' => 'Upload a JPG, PNG, or WebP image only.',
            'image.max' => 'The preview image must be 2 MB or smaller.',
            'completed_at.before_or_equal' => 'The completion date cannot be in the future.',
        ];
    }
}
