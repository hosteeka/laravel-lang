<?php

use Hosteeka\Lang\Lang;
use Illuminate\Support\Facades\File;

test('should resolve locales', function () {
    // Mock the File::glob method
    File::shouldReceive('glob')
        ->once()
        ->with(lang_path().'/*')
        ->andReturn([
            lang_path('en'),
            lang_path('es'),
            lang_path('en.json'),
            lang_path('en_US.json'),
            lang_path('en_GB.yaml'),
        ]);

    // Mock the File::isDirectory method
    File::shouldReceive('isDirectory')
        ->times(5)
        ->andReturn(true, true, false, false, false);

    // Mock the File::dirname method
    File::shouldReceive('basename')
        ->times(2)
        ->andReturn('en', 'es');

    // Mock the File::extension method
    File::shouldReceive('extension')
        ->times(3)
        ->andReturn('json', 'json', 'yaml');

    // Mock the File::name method
    File::shouldReceive('name')
        ->times(2)
        ->andReturn('en', 'en_US');

    $locales = Lang::resolveLocales();

    expect($locales)->toBe(['en', 'es', 'en_US']);
});
