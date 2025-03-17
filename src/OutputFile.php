<?php

namespace Hosteeka\Lang;

use Stringable;

class OutputFile implements Stringable
{
    public function __construct(protected Lang $lang) {}

    public function __toString()
    {
        return <<<JAVASCRIPT
        const Lang = {$this->lang->toJson()};

        if (typeof window !== 'undefined' && typeof window.Lang !== 'undefined') {
            Object.assign(Lang.translations, window.Lang.translations);
        }

        export { Lang };

        JAVASCRIPT;
    }
}
