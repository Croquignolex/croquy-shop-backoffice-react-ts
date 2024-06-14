import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult, keepPreviousData} from "@tanstack/react-query";

import {errorAlert} from "../../../helpers/generalHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";
import {CountryType,} from "../show/showCountryData";
import {defaultPaginationData, SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import {ErrorAlertType, PaginationType, URLParamType} from "../../../helpers/globalTypesHelper";

// ######################################## STATICS DATA ######################################## //

const defaultCountriesResponseData: CountriesResponseDataType = {
    content: [],
    ...defaultPaginationData
}

export interface CountriesResponseDataType extends PaginationType {
    content: Array<CountryType>,
}

export interface CountriesTableListHookType {
    countriesResponseData: CountriesResponseDataType,
    isCountriesFetching: boolean,
    isCountriesPending: boolean,
    countriesAlertData: ErrorAlertType,
    reloadList: () => void,
}

export interface CountriesTableListHookProps {
    fetchCountries: boolean,
    sortAndFilterData: SortAndFilterRequestDataType,
}

const countriesRequest = ({page, size, needle, baseUrl, sort, direction}: SortAndFilterRequestDataType): Promise<any> => {
    const queries: Array<URLParamType> = [];
    if(page) queries.push({param: "page", value: page});
    if(size) queries.push({param: "size", value: size});
    if(needle) queries.push({param: "needle", value: needle});
    if(sort) queries.push({param: "sort", value: sort});
    if(direction) queries.push({param: "direction", value: direction});

    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
}

// ######################################## HOOK ######################################## //

const useCountriesTableListHook = ({fetchCountries, sortAndFilterData}: CountriesTableListHookProps): CountriesTableListHookType => {
    let countriesAlertData: ErrorAlertType = {show: false};
    let countriesResponseData: CountriesResponseDataType = defaultCountriesResponseData;

    const countriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries", sortAndFilterData],
        queryFn: () => countriesRequest(sortAndFilterData),
        placeholderData: keepPreviousData,
        enabled: fetchCountries,
    });

    if(!countriesResponse.isFetching && countriesResponse.isError) {
        countriesAlertData = errorAlert(countriesResponse.error);
    }

    if(!countriesResponse.isFetching && countriesResponse.isSuccess) {
        countriesAlertData = {show: false};
        countriesResponseData = countriesResponse.data.data;
    }

    const reloadList = (): void => {
        countriesResponse.refetch().then();
    }

    const isCountriesFetching: boolean = countriesResponse.isFetching;
    const isCountriesPending: boolean = countriesResponse.isPending;

    return {
        countriesResponseData,
        isCountriesFetching,
        isCountriesPending,
        countriesAlertData,
        reloadList,
    };
};

export default useCountriesTableListHook;