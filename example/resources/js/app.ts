import { createInertiaApp } from "@inertiajs/vue3"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, DefineComponent, h } from "vue"
import { LangVue } from "laravel-lang";
import { Lang } from "./lang.js";

void createInertiaApp({
    resolve: name => resolvePageComponent(
        `./pages/${name}.vue`,
        import.meta.glob<DefineComponent>("./pages/**/*.vue"),
    ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(LangVue, Lang)
            .mount(el)
    },
});
