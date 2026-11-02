<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePortfolioEditor
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()) {
            return redirect()->guest(route('portfolio.login'));
        }

        $allowed = config('portfolio.editor_emails', []);
        if (! in_array(strtolower((string) $request->user()->email), $allowed, true)) {
            abort(403, 'You do not have access to project management.');
        }

        return $next($request);
    }
}
