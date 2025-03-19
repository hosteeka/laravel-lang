import { exec } from "node:child_process";
import path from "node:path";
import { buildCommand } from "./utilities.js";

/**
 * Vite plugin to run the lang generator.
 *
 * @param {{ path: string }|null} config
 */
export default (config) => {
    const cmd = buildCommand(config);

    const runCommand = () => {
        exec(cmd.join(" "), (error, stdout, stderr) => {
            if (error) {
                console.error(
                    `[vite-plugin-laravel-lang] error: ${error.message}`,
                );
                return;
            }
            if (stderr) {
                console.error(`[vite-plugin-laravel-lang] stderr: ${stderr}`);
                return;
            }
            console.log(`[vite-plugin-laravel-lang] ${stdout}`);
        });
    };

    return {
        name: "vite-plugin-laravel-lang",
        buildStart: async () => {
            runCommand();
        },
        handleHotUpdate({ file }) {
            const langPath = path.join(process.cwd(), "lang");

            // Only run command if the file is in lang directory and is a PHP or JSON file
            if (
                file.startsWith(langPath) &&
                (file.endsWith(".php") || file.endsWith(".json"))
            ) {
                runCommand();
            }
        },
    };
};
