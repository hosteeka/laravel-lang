const Lang = {"defaultLocale":"en","fallbackLocale":"es","supportedLocales":{"en":{"name":"English","direction":"ltr"},"es":{"name":"Espa\u00f1ol","direction":"ltr"}},"translations":{"en":{"welcome":{"getting_started":"Let's get started :name"},"Laravel has an incredibly rich ecosystem.":"Laravel has an incredibly rich ecosystem.","We suggest starting with the following.":"We suggest starting with the following.","Read the":"Read the","Documentation":"Documentation","Watch video tutorials at":"Watch video tutorials at","Laracasts":"Laracasts","Deploy now":"Deploy now"},"es":{"welcome":{"getting_started":"Empecemos :name"},"Laravel has an incredibly rich ecosystem.":"Laravel tiene un ecosistema incre\u00edblemente rico.","We suggest starting with the following.":"Sugerimos comenzar con lo siguiente.","Read the":"Lee la","Documentation":"Documentaci\u00f3n","Watch video tutorials at":"Mira tutoriales en video en","Laracasts":"Laracasts","Deploy now":"Desplegar ahora"}}};

if (typeof window !== 'undefined' && typeof window.Lang !== 'undefined') {
    Object.assign(Lang.translations, window.Lang.translations);
}

export { Lang };
