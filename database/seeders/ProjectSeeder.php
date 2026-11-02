<?php
namespace Database\Seeders;
use App\Models\Project;
use Illuminate\Database\Seeder;
class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $examples = [
            [
                'title' => 'SmartBroPrepaid / Load System',
                'description' => 'A sample prepaid load application to manage load balance, review transactions, and demonstrate a clear responsive interface.',
                'tech_stack' => 'C++',
                'project_url' => null,
                'repository_url' => null,
                'image_path' => 'assets/images/smartbroprepaid.png',
                'completed_at' => null,
                'status' => 'in_progress',
            ],
            [
                'title' => 'CrispyCloud / Ordering System',
                'description' => 'A concept for a customizable chicken ordering workflow. Replace the sample summary with the features actually completed.',
                'tech_stack' => 'Laravel, SQLite, Tailwind CSS',
                'project_url' => null,
                'repository_url' => null,
                'image_path' => 'assets/images/project-chickpops.svg',
                'completed_at' => null,
                'status' => 'in_progress',
            ],
            [
                'title' => 'Nutratrust / Mobile UI Concept',
                'description' => 'A sample mobile application concept focused on browsing products and viewing order history with an approachable user interface.',
                'tech_stack' => 'Flutter, Dart, Firebase, Figma',
                'project_url' => null,
                'repository_url' => null,
                'image_path' => 'assets/images/Nutratrust.jpg',
                'completed_at' => null,
                'status' => 'planned',
            ],
        ];
        foreach ($examples as $attributes) {
            Project::firstOrCreate(['title' => $attributes['title']], $attributes);
        }
    }
}
