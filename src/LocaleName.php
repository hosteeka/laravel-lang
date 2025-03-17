<?php

namespace Hosteeka\Lang;

class LocaleName
{
    /**
     * Get the name of the locale.
     */
    public static function getName(string $locale): string
    {
        $mapping = config('lang.name_mapping');

        return $mapping[$locale] ?? static::getDefaultName($locale);
    }

    /**
     * Get the default name as defined in the package.
     *
     * If the locale name is not defined in the package, it will return the locale itself.
     */
    public static function getDefaultName(string $locale): string
    {
        $names = [
            'ar' => 'العربية',
            'de' => 'Deutsch',
            'en' => 'English',
            'es' => 'Español',
            'fr' => 'Français',
            'hi' => 'हिन्दी',
            'it' => 'Italiano',
            'ja' => '日本語',
            'pt' => 'Português',
            'ru' => 'Русский',
            'zh' => '中文',
        ];

        return $names[$locale] ?? $locale;
    }
}
