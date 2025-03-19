<?php

namespace Hosteeka\Lang;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use JsonSerializable;

class Lang implements JsonSerializable
{
    protected static ?Collection $cache;

    protected Collection $translations;

    public function __construct()
    {
        $this->translations = static::$cache ??= $this->makeTranslations();
    }

    /**
     * Clear the translation cache.
     */
    public static function clearTranslations(): void
    {
        static::$cache = null;
    }

    /**
     * Resolve the locales from the lang directory.
     */
    public static function resolveLocales(): array
    {
        $locales = [];

        foreach (File::glob(lang_path().'/*') as $path) {
            if (File::isDirectory($path)) {
                $locale = File::basename($path);
            } else {
                // Only accept JSON files
                if (File::extension($path) !== 'json') {
                    continue;
                }
                $locale = File::name($path);
            }

            if (! in_array($locale, $locales)) {
                $locales[] = $locale;
            }
        }

        return $locales;
    }

    /**
     * Get a list of supported locales with their names and direction.
     */
    public static function supportedLocales(): array
    {
        $locales = [];

        foreach (static::resolveLocales() as $locale) {
            $locales[$locale] = [
                'name' => LocaleDetails::getName($locale),
                'direction' => LocaleDetails::getDirection($locale),
            ];
        }

        return $locales;
    }

    /**
     * Serialize the instance to JSON.
     */
    public function jsonSerialize(): array
    {
        return [
            'defaultLocale' => config('app.locale'),
            'fallbackLocale' => config('app.fallback_locale'),
            'supportedLocales' => static::supportedLocales(),
            'translations' => $this->translations,
        ];
    }

    /**
     * Convert the instance to a JSON string.
     */
    public function toJson(int $flags = 0): string
    {
        return json_encode($this->jsonSerialize(), $flags);
    }

    /**
     * Generate a collection of translations from both PHP and JSON files.
     */
    private function makeTranslations(): Collection
    {
        $translations = collect();

        foreach (static::resolveLocales() as $locale) {
            $phpTranslations = $this->phpTranslations($locale);
            $jsonTranslations = $this->jsonTranslations($locale);
            $mergedTranslations = $phpTranslations->merge($jsonTranslations);
            $translations->put($locale, $mergedTranslations);
        }

        return $translations;
    }

    /**
     * Get the PHP translations for the given locale.
     */
    private function phpTranslations(string $locale): Collection
    {
        if (File::isDirectory($path = lang_path($locale))) {
            return collect(File::allFiles($path))->mapWithKeys(function ($file) {
                $key = $file->getBasename('.php');
                $value = require $file->getPathname();

                return [$key => $value];
            });
        }

        return collect(); // The locale path is not a directory
    }

    /**
     * Get the JSON translations for the given locale.
     */
    private function jsonTranslations(string $locale): array
    {
        if (File::isReadable($path = lang_path($locale.'.json'))) {
            // Return an empty array if the file is empty
            return File::json($path) ?? [];
        }

        return []; // The locale path is not readable (could be a directory)
    }
}
