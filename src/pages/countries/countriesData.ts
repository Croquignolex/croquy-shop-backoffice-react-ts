import {ErrorAlertType, URLParamType} from "../../helpers/globalTypesHelper";
import {CountryType} from "./show/showCountryData";
import {v1URL} from "../../helpers/apiRequestsHelpers";
import {countriesApiURI} from "../../constants/apiURIConstants";
import {getRequest} from "../../helpers/axiosHelpers";

export const defaultCountriesResponseData: CountriesResponseDataType = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    numberOfElements: 0,
    number: 0,
    first: false,
    last: false,
    empty: true
}

export interface CountriesResponseDataType {
    content: Array<CountryType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyCountryRequestDataType {
    id: string,
}

export interface CountriesHookType {
    countriesResponseData: CountriesResponseDataType,
    isCountriesPending: boolean,
    countriesAlertData: ErrorAlertType,
    fetchPaginatedCountries: (a: boolean) => void,
    fetchPaginatedNeedleCountries: (a: string) => void,
    selectedCountry: CountryType,
    showDeleteModal: (a: CountryType) => void,
    isDeleteModalOpen: boolean,
    deleteCountryAlertData: ErrorAlertType,
    isDeleteCountryPending: boolean,
    handleDeleteCountry: () => void,
    onDeleteModalClose: () => void,
}

export const countriesRequest = (page: number, size: number, needle: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(countriesApiURI.index, [], queries);

    return getRequest(url);
};