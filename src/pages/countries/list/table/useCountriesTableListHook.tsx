import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {errorAlert} from "../../../../helpers/generalHelpers";
import {v1URL} from "../../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../../helpers/axiosHelpers";
import {defaultPaginationData} from "../../../../constants/generalConstants";
import {CountryType,} from "../../show/showCountryData";
import {ErrorAlertType, PaginationType, URLParamType} from "../../../../helpers/globalTypesHelper";

// ######################################## STATICS DATA ######################################## //

export const defaultCountriesResponseData: CountriesResponseDataType = {
    content: [],
    ...defaultPaginationData
}

export interface CountriesResponseDataType extends PaginationType {
    content: Array<CountryType>,
}

export interface CountriesTableListHookType {
    countriesResponseData: CountriesResponseDataType,
    isCountriesPending: boolean,
    countriesAlertData: ErrorAlertType,
    reloadList: () => void,
}

export interface CountriesTableListHookProps {
    fetchCountries: boolean,
    countriesBaseUrl: string,
}

export const countriesRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [
        {param: "page", value: page.toString()},
        {param: "size", value: size.toString()},
        {param: "needle", value: needle.toString()}
    ];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
}

// ######################################## HOOK ######################################## //

const useCountriesTableListHook = ({fetchCountries, countriesBaseUrl}: CountriesTableListHookProps): CountriesTableListHookType => {
    const [countriesQueryEnabled, setCountriesQueryEnabled] = useState<boolean>(fetchCountries);
    const [countriesAlertData, setCountriesAlertData] = useState<ErrorAlertType>({show: false});
    const [countriesResponseData, setCountriesResponseData] = useState<CountriesResponseDataType>(defaultCountriesResponseData);
    const [searchNeedle, setSearchNeedle] = useState<string>("");

    const countriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries"],
        queryFn: () => countriesRequest(countriesResponseData.number, countriesResponseData.size, searchNeedle, countriesBaseUrl),
        enabled: countriesQueryEnabled,
    });
console.log("countriesResponse.isStale", countriesResponse.isStale)
    if(countriesQueryEnabled && !countriesResponse.isPending && countriesResponse.isError) {
        setCountriesQueryEnabled(false);
        setCountriesAlertData(errorAlert(countriesResponse.error));
    }

    if(countriesQueryEnabled && !countriesResponse.isPending && countriesResponse.isSuccess) {
        setCountriesQueryEnabled(false);
        setCountriesAlertData({show: false});
        setCountriesResponseData(countriesResponse.data.data);
    }

    const reloadList = (): void => {
        countriesResponse.refetch().then();
    }

    const isCountriesPending: boolean = countriesResponse.isFetching;
    console.log({countriesQueryEnabled, isCountriesPending})

    return {
        countriesResponseData,
        isCountriesPending,
        countriesAlertData,
        reloadList
    };
};

export default useCountriesTableListHook;