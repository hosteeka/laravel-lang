# Laravel Lang - Use your Laravel translations in JavaScript

This package is heavily inspired by [Ziggy](https://github.com/tighten/ziggy) which enables you to use your Laravel routes in JavaScript.

- [**Installation**](#installation)
- [**Usage**](#usage)

## Installation

You can install the package via composer:

```bash
composer require hosteeka/laravel-lang
```

## Usage

Generate the JavaScript file with the translations:

```bash
php artisan lang:generate
```

This will create a `resources/js/lang.js` file with the translations:

```js
// resources/js/lang.js

const Lang = {
  "defaultLocale": "es",
  "fallbackLocale": "en",
  "supportedLocales": {
    "en": "English",
    "es": "Español"
  },
  "translations": {
    "en": {
      "welcome": {
        "getting_started": "Let's get started :name"
      },
      "Laravel has an incredibly rich ecosystem.": "Laravel has an incredibly rich ecosystem."
    },
    "es": {
      "welcome": {
        "getting_started": "Empecemos :name"
      },
      "Laravel has an incredibly rich ecosystem.": "Laravel tiene un ecosistema increíblemente rico."
    }
  }
}
```

To pass a custom path to generate the file, you can run the following command:

```bash
php artisan lang:generate public/js/lang.js
```
