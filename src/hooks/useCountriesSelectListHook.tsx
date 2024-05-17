import {useState, Dispatch, SetStateAction} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {log} from "../helpers/generalHelpers";
import {CountryType} from "../pages/countries/show/showCountryData";
import {getRequest} from "../helpers/axiosHelpers";
import {selectListApiURI} from "../constants/apiURIConstants";
import {FormSelectOptionType} from "../components/form/SelectField";
import {apiBaseURL} from "../constants/envConstants";

const useCountriesSelectListHook = (): CountriesSelectListHookType => {
    const [selectListCountries, setSelectListCountries] = useState<Array<FormSelectOptionType>>([]);
    const [countriesQueryEnabled, setCountriesQueryEnabled] = useState<boolean>(true);

    const countriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries-select-list"],
        queryFn: () => countriesSelectListRequest(),
        enabled: countriesQueryEnabled,
    });

    if(countriesQueryEnabled && countriesResponse.isError) {
        setCountriesQueryEnabled(false);

        log("Countries list failure", countriesResponse);
    }

    if(countriesQueryEnabled && countriesResponse.isSuccess && !countriesResponse.isFetching) {
        const countries: Array<CountryType> = countriesResponse.data.data || [];

        const selectListCountries: Array<FormSelectOptionType> = countries.map((country: CountryType): FormSelectOptionType => ({label: country.name, key: country.id}));

        setCountriesQueryEnabled(false);
        setSelectListCountries(selectListCountries);

        log("Select countries list successful", countriesResponse);
    }

    const isSelectListCountriesPending: boolean = countriesResponse.isFetching;

    return {selectListCountries, isSelectListCountriesPending, setCountriesQueryEnabled};
};

export interface CountriesSelectListHookType {
    selectListCountries: Array<FormSelectOptionType>,
    isSelectListCountriesPending: boolean,
    setCountriesQueryEnabled: Dispatch<SetStateAction<boolean>>,
}

export const countriesSelectListRequest = (): Promise<any> => {
    const url: string = `${apiBaseURL}/api/v1${selectListApiURI.countries}`;

    return getRequest(url, {headers: {public: true}});
};

export default useCountriesSelectListHook;