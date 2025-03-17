import { createInertiaApp } from "@inertiajs/vue3"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, h } from "vue"

void createInertiaApp({
    resolve: name => resolvePageComponent(
        `./pages/${name}.vue`,
        import.meta.glob("./pages/**/*.vue"),
    ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .mount(el)
    },
})
