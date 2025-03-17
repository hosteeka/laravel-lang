<?php

namespace Hosteeka\Lang;

use Illuminate\Support\ServiceProvider;

class LangServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands(CommandGenerator::class);
        }
    }
}
