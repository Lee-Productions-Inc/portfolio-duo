<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PortfolioAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config()->set('portfolio.editor_emails', ['editor@example.com', 'partner@example.com']);
    }

    public function test_public_can_view_portfolio(): void
    {
        $this->get('/')->assertOk();
    }

    public function test_guests_cannot_access_project_management(): void
    {
        $this->get('/projects')->assertRedirect('/team/login');
        $this->get('/projects/create')->assertRedirect('/team/login');
        $this->post('/projects', [])->assertRedirect('/team/login');
    }

    public function test_signed_in_non_editors_cannot_manage_projects(): void
    {
        $this->actingAs(User::factory()->create(['email' => 'visitor@example.com']));
        $this->get('/projects')->assertForbidden();
        $this->post('/projects', [])->assertForbidden();
    }

    public function test_only_allowlisted_member_can_sign_in(): void
    {
        User::factory()->create([
            'email' => 'visitor@example.com', 'password' => Hash::make('long-passphrase-123'),
        ]);
        $this->post('/team/login', ['email' => 'visitor@example.com', 'password' => 'long-passphrase-123'])
            ->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    public function test_partner_can_sign_in_to_manage_projects_and_sign_out(): void
    {
        User::factory()->create([
            'email' => 'partner@example.com', 'password' => Hash::make('long-passphrase-123'),
        ]);
        $this->post('/team/login', ['email' => 'partner@example.com', 'password' => 'long-passphrase-123'])
            ->assertRedirect('/projects');
        $this->get('/projects')->assertOk();
        $this->post('/team/logout')->assertRedirect('/');
        $this->get('/projects')->assertRedirect('/team/login');
    }

    public function test_guest_cannot_delete_existing_project(): void
    {
        $project = Project::create([
            'title' => 'Safe example',
            'description' => 'This is a complete description long enough for testing.',
            'tech_stack' => 'Laravel, React',
            'status' => 'completed',
        ]);
        $this->delete('/projects/'.$project->id)->assertRedirect('/team/login');
        $this->assertDatabaseHas('projects', ['id' => $project->id]);
    }
}
