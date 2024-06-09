import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const supportedLanguages: Array<{code: string, label: string}> = [
    {code: "en", label: "English"},
    {code: "fr", label: "Français"},
];

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: supportedLanguages.map(({code}) => code),
        debug: process.env.NODE_ENV !== "production",
        interpolation: {
            escapeValue: false,
        },
        backend: {loadPath: "/locales/{{lng}}.json"}
    }).then();

export default i18n;