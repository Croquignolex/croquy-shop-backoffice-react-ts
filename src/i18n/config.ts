import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {currency, date, datetime} from "./formatters";

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
        debug: process.env.NODE_ENV === "production",
        interpolation: {
            escapeValue: false,
        },
        backend: {loadPath: "/locales/{{lng}}.json"}
    }).then();

i18n.services.formatter?.add("date", date);
i18n.services.formatter?.add("datetime", datetime);
i18n.services.formatter?.add("currency", currency);

export default i18n;