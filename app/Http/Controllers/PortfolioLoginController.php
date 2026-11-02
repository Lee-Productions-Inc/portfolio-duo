<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioLoginController extends Controller
{
    public function show(Request $request): Response|RedirectResponse
    {
        if ($request->user() && in_array(
            strtolower((string) $request->user()->email),
            config('portfolio.editor_emails', []),
            true
        )) {
            return to_route('projects.index');
        }

        return Inertia::render('Team/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string'],
        ]);

        $email = strtolower(trim($credentials['email']));
        $key = 'portfolio-login:' . sha1($email . '|' . $request->ip());

        if (RateLimiter::tooManyAttempts($key, 5)) {
            throw ValidationException::withMessages([
                'email' => 'Too many login attempts. Please try again in one minute.',
            ])->status(429);
        }

        $allowed = in_array($email, config('portfolio.editor_emails', []), true);
        if ($allowed && Auth::attempt(['email' => $email, 'password' => $credentials['password']])) {
            RateLimiter::clear($key);
            $request->session()->regenerate();

            return redirect()->intended(route('projects.index'));
        }

        RateLimiter::hit($key, 60);
        throw ValidationException::withMessages([
            'email' => 'The email or password is incorrect, or this account is not authorized.',
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('portfolio');
    }
}
