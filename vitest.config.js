import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        root: "./javascript/tests",
        typecheck: {
            enabled: true,
        },
        environment: "jsdom",
    },
});
