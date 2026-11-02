<?php
namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProjectCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config()->set('portfolio.editor_emails', ['editor@example.com', 'partner@example.com']);
        $this->actingAs(User::factory()->create(['email' => 'editor@example.com']));
    }

    private function validData(array $changes = []): array
    {
        return array_merge([
            'title' => 'Unique Demo Project',
            'description' => 'A practice project with at least thirty characters in the description.',
            'tech_stack' => 'Laravel, React',
            'project_url' => 'https://example.com',
            'repository_url' => 'https://github.com/example/project',
            'status' => 'in_progress',
        ], $changes);
    }

    public function test_empty_form_shows_required_errors(): void
    {
        $this->from('/projects/create')->post('/projects', [])
            ->assertRedirect('/projects/create')
            ->assertSessionHasErrors(['title', 'description', 'tech_stack', 'status']);
    }

    public function test_overlong_project_title_is_rejected(): void
    {
        $this->post('/projects', $this->validData(['title' => str_repeat('A', 121)]))
            ->assertSessionHasErrors(['title']);
    }

    public function test_invalid_project_url_is_rejected(): void
    {
        $this->post('/projects', $this->validData(['project_url' => 'not-a-url']))
            ->assertSessionHasErrors(['project_url']);
    }

    public function test_duplicate_project_title_is_rejected(): void
    {
        Project::create($this->validData());
        $this->post('/projects', $this->validData())
            ->assertSessionHasErrors(['title']);
    }

    public function test_updating_same_title_is_allowed(): void
    {
        $project = Project::create($this->validData());
        $this->put("/projects/{$project->id}", $this->validData(['description' => 'This revision retains the same unique title while updating the description.']))
            ->assertRedirect('/projects')
            ->assertSessionHas('success');
        $this->assertDatabaseHas('projects', ['id' => $project->id, 'title' => 'Unique Demo Project']);
    }

    public function test_text_file_fails_image_validation(): void
    {
        $this->post('/projects', $this->validData([
            'image' => UploadedFile::fake()->create('not-an-image.txt', 5, 'text/plain'),
        ]))->assertSessionHasErrors(['image']);
    }

    public function test_project_create_update_delete_flow(): void
    {
        $this->post('/projects', $this->validData())->assertRedirect('/projects')->assertSessionHas('success');
        $project = Project::query()->firstOrFail();
        $this->put("/projects/{$project->id}", $this->validData(['tech_stack' => 'Laravel, React, SQLite']))
            ->assertRedirect('/projects')->assertSessionHas('success');
        $this->assertDatabaseHas('projects', ['id' => $project->id, 'tech_stack' => 'Laravel, React, SQLite']);
        $this->delete("/projects/{$project->id}")->assertRedirect('/projects')->assertSessionHas('success');
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }
}
