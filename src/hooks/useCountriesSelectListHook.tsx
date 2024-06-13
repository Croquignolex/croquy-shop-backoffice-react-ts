import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {CountryType} from "../pages/countries/show/showCountryData";
import {getRequest} from "../helpers/axiosHelpers";
import {selectListApiURI} from "../constants/apiURIConstants";
import {FormSelectOptionType} from "../components/form/SelectField";
import {apiBaseURL} from "../constants/envConstants";

// ######################################## STATICS DATA ######################################## //

export interface CountriesSelectListHookType {
    selectListCountries: Array<FormSelectOptionType>,
    isSelectListCountriesFetching: boolean,
    reloadList: () => void,
}

const countriesSelectListRequest = (): Promise<any> => {
    const url: string = `${apiBaseURL}/api/v1${selectListApiURI.countries}`;

    return getRequest(url, {headers: {public: true}});
};

// ######################################## HOOK ######################################## //

const useCountriesSelectListHook = (): CountriesSelectListHookType => {
    let selectListCountries: Array<FormSelectOptionType> = [];

    const countriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries-select-list"],
        queryFn: () => countriesSelectListRequest(),
    });

    if(!countriesResponse.isFetching && countriesResponse.isSuccess) {
        const countries: Array<CountryType> = countriesResponse.data.data || [];
        selectListCountries = countries.map((country: CountryType): FormSelectOptionType => ({label: country.name, key: country.id}));
    }

    const reloadList = (): void => {
        countriesResponse.refetch().then();
    }

    const isSelectListCountriesFetching: boolean = countriesResponse.isFetching;

    return {selectListCountries, isSelectListCountriesFetching, reloadList};
};

export default useCountriesSelectListHook;