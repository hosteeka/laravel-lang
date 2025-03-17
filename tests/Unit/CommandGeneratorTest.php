<?php

use function Pest\Laravel\artisan;

beforeEach(function () {
    if (is_dir(base_path('resources/js'))) {
        array_map(unlink(...), glob(base_path('resources/js/*')));
    }
});

test('generates lang file', function () {
    artisan('lang:generate');

    expect(base_path('resources/js/lang.js'))->toBeFile();
});

test('generates lang file with custom path', function () {
    artisan('lang:generate resources/js');

    expect(base_path('resources/js/lang.js'))->toBeFile();
});
