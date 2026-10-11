<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #fbf5ef;
            }

            html.dark {
                background-color: #1c1411;
            }
        </style>

        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <meta name="theme-color" content="#d53b3a">

        {{-- Link previews (WhatsApp, Facebook, LinkedIn, X) read these without running JavaScript. --}}
        <meta name="description" content="ShikaComp oleh Yushika: jasa pembuatan website (Laravel & React), aplikasi mobile (Flutter), maintenance, pemulihan website kena hack, dan integrasi sistem.">
        <link rel="canonical" href="{{ url()->current() }}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="ShikaComp">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="ShikaComp · Jasa Pembuatan Website & Aplikasi">
        <meta property="og:description" content="Website, aplikasi mobile, dan servernya. Dirancang teliti, dibangun sepenuh hati.">
        <meta property="og:image" content="{{ url('/images/og.jpg') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="id_ID">
        <meta name="twitter:card" content="summary_large_image">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
