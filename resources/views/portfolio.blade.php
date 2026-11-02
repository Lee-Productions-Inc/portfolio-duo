<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth scheme-dark">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0b0e14" />
    <meta name="description" content="Two-person development portfolio with dynamic project case files." />
    <link rel="icon" type="image/svg+xml" href="{{ asset('assets/images/favicon.svg') }}" />
    <title inertia>{{ config('app.name') }}</title>
    @php(\Illuminate\Support\Facades\Vite::useHotFile(storage_path('vite-portfolio.hot'))->useBuildDirectory('build-portfolio'))
    @viteReactRefresh
    @vite(['resources/css/portfolio.css', 'resources/js/portfolio-app.jsx'], 'build-portfolio')
    @inertiaHead
</head>
<body class="min-w-80 overflow-x-hidden bg-[#0b0e14] font-sans text-[#e5eaf1] antialiased selection:bg-[#a9daf8] selection:text-[#09111b]">
    @inertia
</body>
</html>
