import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const supportedLanguages = {
    en: "English",
    fr: "Français",
};

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: Object.keys(supportedLanguages),
        debug: process.env.NODE_ENV !== "production",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;