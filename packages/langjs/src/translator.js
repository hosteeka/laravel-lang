export default class Translator {
    /**
     * Create a new Translator instance.
     *
     * @param {LangConfig} config The configuration object.
     */
    constructor(config) {
        this._config =
            config ?? (typeof Lang !== "undefined" ? Lang : globalThis?.Lang);
    }

    /**
     * Get the current locale.
     *
     * @returns {string}
     */
    getCurrentLocale() {
        const locale =
            document.documentElement.lang || this._config["defaultLocale"];
        return locale.replace("-", "_");
    }

    /**
     * Get the fallback locale.
     *
     * @returns {string}
     */
    getFallbackLocale() {
        return this._config["fallbackLocale"];
    }

    /**
     * Get the supported locales.
     *
     * @returns {Record<string, string>}
     */
    getSupportedLocales() {
        return this._config["supportedLocales"];
    }

    /**
     * Get the locale translations. By default, load from the current locale.
     *
     * @param fallback Whether to get the fallback locale translations.
     * @returns {Translations}
     */
    getLocaleTranslations(fallback = false) {
        const locale = fallback
            ? this.getFallbackLocale()
            : this.getCurrentLocale();
        return this._config["translations"][locale];
    }

    /**
     * Translate the given key.
     *
     * @param key The key to translate.
     * @param replace The replacements to apply.
     * @returns {string}
     */
    translate(key, replace) {
        const isKeyOfObject = /^\S+\.\S+$/.test(key);

        const getTranslation = (translations, key) => {
            return isKeyOfObject
                ? key.split(".").reduce((t, i) => t?.[i] ?? null, translations)
                : (translations?.[key] ?? null);
        };

        let translation = getTranslation(this.getLocaleTranslations(), key);

        // If no translation found, try to get from the fallback locale
        if (!translation) {
            translation = getTranslation(this.getLocaleTranslations(true), key);
        }

        // If no translation found, return the key
        if (!translation) return key;

        return this.handleReplacements(translation, replace);
    }

    /**
     * Handle the replacements.
     *
     * @param translation The translation to handle replacements.
     * @param replace The replacements to apply.
     * @returns {string}
     */
    handleReplacements(translation, replace) {
        if (replace) {
            for (const [key, value] of Object.entries(replace)) {
                translation = translation.replace(`:${key}`, value);
            }
        }

        return translation;
    }
}
