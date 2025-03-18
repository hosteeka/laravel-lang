import Translator from "./translator.js";

/**
 * Get the current locale.
 *
 * This retrieves the locale set in the HTML lang attribute. If not found, it
 * will return the default locale set in `app.locale` as set in `LangConfig`.
 *
 * @param {LangConfig|null} config The configuration to use.
 * @returns {string} The current locale.
 */
export function getCurrentLocale(config) {
    return new Translator(config).getCurrentLocale();
}

/**
 * Get the fallback locale set in `app.locale` as set in `LangConfig`.
 *
 * @param {LangConfig|null} config The configuration to use.
 * @returns {string} The fallback locale.
 */
export function getFallbackLocale(config) {
    return new Translator(config).getFallbackLocale();
}

/**
 * Get the supported locales and their names from `LangConfig`.
 *
 * @param {LangConfig|null} config The configuration to use.
 * @returns {Record<string, string>} The supported locales and their names.
 */
export function getSupportedLocales(config) {
    return new Translator(config).getSupportedLocales();
}

/**
 * Retrieve the translation for the given key.
 *
 * @param {string} key The key to translate.
 * @param {Record<string, string>|null} replace The replacements to apply.
 * @param {LangConfig|null} config The configuration to use.
 * @returns {string} The translated string.
 */
export function trans(key, replace, config) {
    return new Translator(config).translate(key, replace);
}

/**
 * Retrieve the translation for the given key.
 *
 * @param {string} key The key to translate.
 * @param {Record<string, string>|null} replace The replacements to apply.
 * @param {LangConfig|null} config The configuration to use.
 * @returns {string} The translated string.
 */
export function __(key, replace, config) {
    return trans(key, replace, config);
}

/**
 * A Vue plugin to provide the translation functionality.
 */
export const LangVue = {
    install(app, options) {
        const cl = getCurrentLocale(options);
        const fl = getFallbackLocale(options);
        const sl = getSupportedLocales(options);
        const tr = (key, replace, config = options) => __(key, replace, config);

        if (parseInt(app.version) > 2) {
            app.config.globalProperties.currentLocale = cl;
            app.config.globalProperties.fallbackLocale = fl;
            app.config.globalProperties.supportedLocales = sl;
            app.config.globalProperties.trans = tr;
            app.config.globalProperties.__ = tr;

            app.provide("currentLocale", cl);
            app.provide("fallbackLocale", fl);
            app.provide("supportedLocales", sl);
            app.provide("trans", tr);
            app.provide("__", tr);
        } else {
            app.mixin({
                methods: {
                    currentLocale: cl,
                    fallbackLocale: fl,
                    supportedLocales: sl,
                    trans: tr,
                    __: tr,
                },
            });
        }
    },
};

/**
 * A hook that provides the translation functionality.
 *
 * @param {LangConfig|null} config
 */
export function useLang(config) {
    if (!config && !globalThis.Lang && typeof Lang === "undefined") {
        throw new Error("No Lang instance found.");
    }

    const tr = (key, replace) => __(key, replace, config);

    return {
        currentLocale: getCurrentLocale(config),
        fallbackLocale: getFallbackLocale(config),
        supportedLocales: getSupportedLocales(config),
        trans: tr,
        __: tr,
    };
}
