import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Separate from vite.config.js so existing project entrypoints remain untouched.
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/portfolio.css', 'resources/js/portfolio-app.jsx'],
            buildDirectory: 'build-portfolio',
            hotFile: 'storage/vite-portfolio.hot',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
});
