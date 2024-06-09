import { useTranslation } from "react-i18next";
import {supportedLanguages} from "../i18n/config";
import {Select} from "@chakra-ui/react";

export default function LocaleSwitcher() {
    const { i18n } = useTranslation();

    return (
        <Select
            value={i18n.resolvedLanguage}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
            {Object.entries(supportedLanguages).map(([code, name]) => (
                <option value={code} key={code}>
                    {name}
                </option>
            ))}
        </Select>
    );
}