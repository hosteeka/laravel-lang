export type Translations = {
    [key: string]: string | Translations;
};

export interface SupportedLocales {
    [key: string]: {
        name: string;
        direction: "ltr" | "rtl";
    };
}

export interface LangConfig {
    defaultLocale: string;
    fallbackLocale: string;
    supportedLocales: SupportedLocales;
    translations: Record<string, Translations>;
}

export function trans(
    key: string,
    replace?: Record<string, string>,
    config?: LangConfig,
): string;
