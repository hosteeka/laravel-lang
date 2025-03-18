type Translations = {
    [key: string]: string | Translations;
};

export interface LangConfig {
    defaultLocale: string;
    fallbackLocale: string;
    supportedLocales: Record<string, string>;
    translations: Record<string, Translations>;
}
