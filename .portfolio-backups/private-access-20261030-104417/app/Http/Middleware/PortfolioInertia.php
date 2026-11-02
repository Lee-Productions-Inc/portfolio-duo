<?php
namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class PortfolioInertia extends Middleware
{
    protected $rootView = 'portfolio';

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => ['success' => fn () => $request->session()->get('success')],
        ]);
    }
}
