import type { LangConfig, Replace, SupportedLocales } from "../types";
import Translator from "./translator";

export function getCurrentLocale(): string {
    return document.documentElement.lang.replace("-", "_");
}

export function getDefaultLocale(config?: LangConfig): string {
    return new Translator(config).defaultLocale;
}

export function getFallbackLocale(config?: LangConfig): string {
    return new Translator(config).fallbackLocale;
}

export function getSupportedLocales(config?: LangConfig): SupportedLocales {
    return new Translator(config).supportedLocales;
}

export function trans(
    key: string,
    replace?: Replace,
    config?: LangConfig,
): string {
    return new Translator(config).trans(key, replace);
}

export function __(
    key: string,
    replace?: Replace,
    config?: LangConfig,
): string {
    return new Translator(config).trans(key, replace);
}

export function useLang(config?: LangConfig) {
    const translator = new Translator(config);

    return {
        currentLocale: translator.currentLocale,
        defaultLocale: translator.defaultLocale,
        fallbackLocale: translator.fallbackLocale,
        supportedLocales: translator.supportedLocales,
        trans: translator.trans,
        __: translator.trans,
    };
}

export const LangVue = {
    install(app: any, options: LangConfig) {
        const translator = new Translator(options);

        if (parseInt(app.version) > 2) {
            app.config.globalProperties.currentLocale = translator.currentLocale;
            app.config.globalProperties.defaultLocale = translator.defaultLocale;
            app.config.globalProperties.fallbackLocale = translator.fallbackLocale;
            app.config.globalProperties.supportedLocales = translator.supportedLocales;
            app.config.globalProperties.trans = translator.trans;
            app.config.globalProperties.__ = translator.trans;
        } else {
            app.mixin({
                methods: {
                    currentLocale: translator.currentLocale,
                    defaultLocale: translator.defaultLocale,
                    fallbackLocale: translator.fallbackLocale,
                    supportedLocales: translator.supportedLocales,
                    trans: translator.trans,
                    __: translator.trans,
                },
            });
        }
    },
};
