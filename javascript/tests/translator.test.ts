import { beforeEach, describe, expect, it } from "vitest";
import type { LangConfig } from "../types";
import Translator from "../src/translator";

describe("Translator", () => {
    let config: LangConfig;
    let translator: Translator;

    beforeEach(() => {
        config = {
            defaultLocale: "en",
            fallbackLocale: "en",
            supportedLocales: {
                ar: {
                    name: "Arabic",
                    direction: "rtl",
                },
                en: {
                    name: "English",
                    direction: "ltr",
                },
            },
            translations: {
                // ar: {
                //     "hello": "مرحبا",
                //     "welcome": "مرحبا, :name",
                //     "messages.help": "كيف يمكنني مساعدتك؟",
                //     "messages.greeting": "صباح الخير :name"
                // },
                en: {
                    hello: "Hello",
                    welcome: "welcome, :name",
                    messages: {
                        help: "How can I help you?",
                        greeting: "Good morning :name",
                    },
                    apples: "There is one apple|There are many apples",
                },
            },
        };
        translator = new Translator(config);
        document.documentElement.lang = "en";
    });

    describe("constructor", () => {
        it("throws error when no config is provided and global Lang is undefined", () => {
            expect(() => new Translator()).toThrow("Lang config is required.");
        });

        it("uses provided config", () => {
            const translator = new Translator(config);
            expect(translator.defaultLocale).toBe("en");
        });
    });

    describe("getters", () => {
        it("returns current locale", () => {
            expect(translator.currentLocale).toBe("en");

            document.documentElement.lang = "es-ES";
            expect(translator.currentLocale).toBe("es_ES");
        });

        it("returns default locale", () => {
            expect(translator.defaultLocale).toBe("en");
        });

        it("returns fallback locale", () => {
            expect(translator.fallbackLocale).toBe("en");
        });

        it("returns supported locales", () => {
            expect(translator.supportedLocales).toEqual({
                ar: {
                    name: "Arabic",
                    direction: "rtl",
                },
                en: {
                    name: "English",
                    direction: "ltr",
                },
            });
        });
    });

    describe("trans", () => {
        it("translate simple keys", () => {
            expect(translator.trans("hello")).toBe("Hello");
        });

        it("translate keys with replacements", () => {
            expect(translator.trans("welcome", { name: "John" })).toBe(
                "welcome, John",
            );
        });

        it("translate nested keys", () => {
            expect(translator.trans("messages.help")).toBe(
                "How can I help you?",
            );
        });

        it("translate nested keys with replacements", () => {
            expect(
                translator.trans("messages.greeting", { name: "John" }),
            ).toBe("Good morning John");
        });

        it("returns key when translation is missing", () => {
            expect(translator.trans("missing")).toBe("missing");
        });

        it("returns key with replacements when translation is missing", () => {
            expect(translator.trans("missing :key", { key: "missing" })).toBe(
                "missing missing",
            );
        });
    });
});
