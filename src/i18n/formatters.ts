import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

require("dayjs/locale/fr");

dayjs.extend(localizedFormat)

const EN: string = "en";
const FR: string = "fr";

const qualifiedLngFor = (lng: string): string => {
    switch (lng) {
        case FR: return "fr-FR";
        case EN: return "en-US";
        default: return lng;
    }
}

export const date = (stringDate: string, lng: string | undefined = EN): string => {
    dayjs.locale(lng);
    let temp: string = dayjs(stringDate).format("LL");
    return (temp === "Invalid Date") ? "" : temp;
}

export const datetime = (stringDate: string, lng: string | undefined = EN): string => {
    dayjs.locale(lng);
    let temp: string = dayjs(stringDate).format("LLL");
    return (temp === "Invalid Date") ? "" : temp;
}

export const currency = (number: number, lng: string | undefined = EN): string => {
    const format = Intl.NumberFormat(qualifiedLngFor(lng), {
        style: "currency",
        currency: "XAF",
    });
    return format.format(number);
}