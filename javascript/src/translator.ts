import type { LangConfig, Replace, SupportedLocales, Translations } from "../types";

export default class Translator {
    private _config: LangConfig;

    constructor(config?: LangConfig) {
        if (!config && typeof Lang === "undefined" && !globalThis.Lang) {
            throw new Error("Lang config is required.");
        }

        this._config = config || Lang || globalThis.Lang;
    }

    /**
     * Get the current locale.
     */
    get currentLocale(): string {
        return document.documentElement.lang.replace("-", "_");
    }

    /**
     * Get the default locale.
     */
    get defaultLocale(): string {
        return this._config.defaultLocale;
    }

    /**
     * Get the fallback locale.
     */
    get fallbackLocale(): string {
        return this._config.fallbackLocale;
    }

    /**
     * Get the supported locales.
     */
    get supportedLocales(): SupportedLocales {
        return this._config.supportedLocales;
    }

    /**
     * Translate the given key.
     */
    trans(key: string, replace?: Replace): string {
        const isKeyOfObject = /^\S+\.\S+$/.test(key);

        const translate = (translations: Translations): string | null => {
            const message = isKeyOfObject
                ? key.split(".").reduce((t, k) => (t?.[k] ?? null) as any, translations)
                : translations[key] ?? null;
            return typeof message === "string" ? message : null;
        }

        let value = translate(this.translations(this.currentLocale));

        if (!value && this.currentLocale !== this.defaultLocale) {
            value = translate(this.translations(this.defaultLocale));
        }

        if (!value) {
            value = translate(this.translations(this.fallbackLocale));
        }

        value = value ?? key;

        return replace ? this.replace(value, replace) : value;
    }

    /**
     * Replace the placeholders in the given value.
     */
    private replace(value: string, replace: Replace): string {
        return value.replace(/:([a-zA-Z0-9_]+)/g, (match, key) => {
            return replace[key] || match;
        });
    }

    /**
     * Get the translations for the given locale.
     */
    private translations(locale: string): Translations {
        return this._config.translations[locale] ?? {};
    }
}
