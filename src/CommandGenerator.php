<?php

namespace Hosteeka\Lang;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class CommandGenerator extends Command
{
    protected $signature = 'lang:generate {path? : Path to the generated JavaScript file. Default: `resources/js/lang.js`.}';

    public function handle(Filesystem $filesystem): void
    {
        $path = $this->argument('path') ?? config('lang.output.path', 'resources/js/lang.js');

        if ($filesystem->isDirectory(base_path($path))) {
            $path .= '/lang';
        } else {
            $filesystem->ensureDirectoryExists(dirname(base_path($path)));
        }

        $path = preg_replace('/(\.d)?\.ts$|\.js$/', '', $path);

        // Generate the file and write it to the path
        $output = config('lang.output.file', OutputFile::class);
        $filesystem->put(base_path($path.'.js'), new $output(new Lang));

        $this->info('File generated successfully.');
    }
}
