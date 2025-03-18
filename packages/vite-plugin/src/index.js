import path from "node:path";
import { exec } from "node:child_process";

export default (config) => {
    const cmd = ["php", "artisan", "lang:generate"];

    if (config && config.path) {
        cmd.push(config.path);
    }

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
            exec(`ps -o args= -p ${process.pid}`, (error, stdout, stderr) => {
                if (
                    error === null &&
                    stderr !== "" &&
                    stdout.trim().startsWith("sail")
                ) {
                    // Replace php with sail in cmd
                    cmd[0] = "sail";
                }
                runCommand();
            });
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
