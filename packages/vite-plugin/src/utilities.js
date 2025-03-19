/**
 * Build the command to run the generator.
 *
 * @param {{ path: string }|null} config
 * @returns {string[]}
 */
export function buildCommand(config) {
    const cmd = ["php", "artisan", "lang:generate"];

    if (config && config.path) {
        cmd.push(config.path);
    }

    return cmd;
}
