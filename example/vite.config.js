import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import runCommands from 'vite-plugin-run';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        tailwindcss(),
        runCommands([
            {
                name: 'laravel-lang',
                run: ['php', 'artisan', 'lang:generate'],
                pattern: ['lang/**/*'],
            },
        ]),
    ],
    resolve: {
        alias: {
            'laravel-lang': path.resolve('vendor/hosteeka/laravel-lang'),
        }
    }
});
