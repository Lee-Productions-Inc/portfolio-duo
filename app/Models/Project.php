<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'description', 'tech_stack', 'project_url',
        'repository_url', 'image_path', 'completed_at', 'status',
    ];

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return ['completed_at' => 'date:Y-m-d'];
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) return null;
        // Bundled portfolio previews and newly uploaded files are stored separately.
        if (str_starts_with($this->image_path, 'assets/')) {
            return asset($this->image_path);
        }
        return asset('storage/'.$this->image_path);
    }
}
