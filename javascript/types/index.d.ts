export type Replace = Record<string, string>;

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
