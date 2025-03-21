import { LangConfig } from "./index";

declare global {
    interface Window {
        Lang: LangConfig;
    }

    // noinspection ES6ConvertVarToLetConst
    var Lang: LangConfig;
}
