import {useState} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {errorAlert} from "../helpers/generalHelpers";
import {getRequest} from "../helpers/axiosHelpers";
import {ErrorAlertType, URLParamType} from "../helpers/globalTypesHelper";
import {v1URL} from "../helpers/apiRequestsHelpers";
import useGetHttpRequestHook from "./useGetHttpRequestHook";
import {UserType} from "../pages/users/show/showUserData";

const usePaginatedGetHttpRequestHook = ({key, page, size, needle, baseUrl, defaultResponseData = null, enableRequest = true}: any): any => {
    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [paginator, setPaginator] = useState<paginatorType>({
        totalPages: 0,
        totalElements: 0,
        size: 10,
        numberOfElements: 0,
        number: 0,
        first: false,
        last: false,
        empty: true
    });

    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    const {responseData, setResponseData, isPending, alertData, refetch}: any = useGetHttpRequestHook({key, url, defaultResponseData, enableRequest});

    const fetchPaginatedData = (next: boolean): void => {
        if(next && !paginator.last) setPaginator({...paginator, number: paginator.number + 1});
        else if(!next && !paginator.first) setPaginator({...paginator, number: paginator.number - 1})

        refetch();

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleData = (needle: string): void => {
        setSearchNeedle(needle);
        setPaginator({...paginator, number: 0});

        refetch();
    }

    return {responseData, isPending, alertData};
};

// ############################### STATIC

interface paginatorType {
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export default usePaginatedGetHttpRequestHook;