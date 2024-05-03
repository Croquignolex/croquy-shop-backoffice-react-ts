import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {log} from "../helpers/generalHelpers";
import {CountryType} from "../pages/countries/show/showCountryData";
import {v1URL} from "../helpers/apiRequestsHelpers";
import {getRequest} from "../helpers/axiosHelpers";
import {selectListApiURI} from "../constants/apiURIConstants";
import {FormSelectOptionType} from "../components/form/SelectField";

const useCountriesSelectListHook = (): CountriesSelectListHookType => {
    let selectListCountries: Array<FormSelectOptionType> = [];

    const countriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries-select-list"],
        queryFn: () => countriesSelectListRequest(),
    });

    if(countriesResponse.isSuccess && !countriesResponse.isFetching) {
        const countries: Array<CountryType> = countriesResponse.data.data || [];

        selectListCountries = countries.map((country: CountryType): FormSelectOptionType => ({label: country.name, key: country.id}));

        log("Select countries list successful", countriesResponse);
    }

    const isSelectListCountriesPending: boolean = countriesResponse.isFetching;

    return {selectListCountries, isSelectListCountriesPending};
};

export interface CountriesSelectListHookType {
    selectListCountries: Array<FormSelectOptionType>,
    isSelectListCountriesPending: boolean,
}

export const countriesSelectListRequest = (): Promise<any> => {
    const url: string = v1URL(selectListApiURI.countries);

    return getRequest(url);
};

export default useCountriesSelectListHook;