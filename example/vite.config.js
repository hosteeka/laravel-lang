import tailwindcss from '@tailwindcss/vite';
import vue from "@vitejs/plugin-vue";
import laravel from 'laravel-vite-plugin';
import path from "path";
import { defineConfig } from 'vite';
import laravelLang from 'vite-plugin-laravel-lang';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
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
        laravelLang(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "laravel-lang": path.resolve("vendor/hosteeka/laravel-lang"),
        }
    }
});
