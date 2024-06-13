import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult, keepPreviousData} from "@tanstack/react-query";

import {errorAlert} from "../../../../helpers/generalHelpers";
import {v1URL} from "../../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../../helpers/axiosHelpers";
import {CountryType,} from "../../show/showCountryData";
import {defaultPaginationData} from "../../../../constants/generalConstants";
import {
    ErrorAlertType,
    PaginationType,
    SortAndFilterRequestDataType,
    URLParamType
} from "../../../../helpers/globalTypesHelper";

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
    countriesAlertData: ErrorAlertType,
    reloadList: () => void,
    showItems: (a: number) => void
}

export interface CountriesTableListHookProps {
    fetchCountries: boolean,
    countriesBaseUrl: string,
}

const countriesRequest = ({page, size, needle, baseUrl}: SortAndFilterRequestDataType): Promise<any> => {
    const queries: Array<URLParamType> = [];
    if(page) queries.push({param: "page", value: page});
    if(size) queries.push({param: "size", value: size});
    if(needle) queries.push({param: "needle", value: needle});

    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
}

// ######################################## HOOK ######################################## //

const useCountriesTableListHook = ({fetchCountries, countriesBaseUrl}: CountriesTableListHookProps): CountriesTableListHookType => {
    const [sortAndFilterData, setSortAndFilterData] = useState<SortAndFilterRequestDataType>({
        size: defaultPaginationData.size,
        baseUrl: countriesBaseUrl,
        page: defaultPaginationData.number,
    });

    let countriesAlertData: ErrorAlertType = {show: false};
    let countriesResponseData: CountriesResponseDataType = defaultCountriesResponseData;

    const countriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["countries", {page: sortAndFilterData.page, size: sortAndFilterData.size}],
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

    const showItems = (size: number): void => {
        setSortAndFilterData({...sortAndFilterData, size});
    }

    const isCountriesFetching: boolean = countriesResponse.isFetching;

    return {
        countriesResponseData,
        isCountriesFetching,
        countriesAlertData,
        reloadList,
        showItems
    };
};

export default useCountriesTableListHook;