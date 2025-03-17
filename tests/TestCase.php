<?php

namespace Tests;

use Hosteeka\Lang\Lang;
use Hosteeka\Lang\LangServiceProvider;

abstract class TestCase extends \Orchestra\Testbench\TestCase
{
    protected function tearDown(): void
    {
        Lang::clearTranslations();
        parent::tearDown();
    }

    protected function getPackageProviders($app): array
    {
        return [LangServiceProvider::class];
    }

    protected function defineEnvironment($app): void
    {
        config()->set('filesystems.disks.local.serve', false);
    }
}
