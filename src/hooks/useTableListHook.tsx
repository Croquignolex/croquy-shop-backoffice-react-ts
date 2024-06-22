import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult, keepPreviousData} from "@tanstack/react-query";

import {defaultPaginationData, SortAndFilterRequestDataType} from "./useSortAndFilterHook";
import {ErrorAlertType, PaginationType, URLParamType} from "../helpers/globalTypesHelper";
import {v1URL} from "../helpers/apiRequestsHelpers";
import {getRequest} from "../helpers/axiosHelpers";
import {errorAlert} from "../helpers/generalHelpers";

// ######################################## HOOK ######################################## //

const useTableListHook = ({fetch, sortAndFilterData}: TableListHookProps): TableListHookType => {
    let alertData: ErrorAlertType = {show: false};
    let responseData: ResponseDataType = defaultResponseData;

    const Response: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["paginated-list", sortAndFilterData],
        queryFn: () => request(sortAndFilterData),
        placeholderData: keepPreviousData,
        enabled: fetch,
    });

    if(!Response.isFetching && Response.isError) {
        alertData = errorAlert(Response.error);
    }

    if(!Response.isFetching && Response.isSuccess) {
        alertData = {show: false};
        responseData = Response.data.data;
    }

    const reloadList = (): void => {
        Response.refetch().then();
    }

    const isFetching: boolean = Response.isFetching;
    const isPending: boolean = Response.isPending;

    return {
        responseData,
        isFetching,
        isPending,
        alertData,
        reloadList,
    };
};

// ######################################## STATICS DATA ######################################## //

const defaultResponseData: ResponseDataType = {
    content: [],
    ...defaultPaginationData
}

interface ResponseDataType extends PaginationType {
    content: Array<any>,
}

export interface TableListHookType {
    responseData: ResponseDataType,
    isFetching: boolean,
    isPending: boolean,
    alertData: ErrorAlertType,
    reloadList: () => void,
}

interface TableListHookProps {
    fetch: boolean,
    sortAndFilterData: SortAndFilterRequestDataType,
}

const request = ({page, size, needle, baseUrl, sort, direction}: SortAndFilterRequestDataType): Promise<any> => {
    const queries: Array<URLParamType> = [];
    if(page) queries.push({param: "page", value: page});
    if(size) queries.push({param: "size", value: size});
    if(needle) queries.push({param: "needle", value: needle});
    if(sort) queries.push({param: "sort", value: sort});
    if(direction) queries.push({param: "direction", value: direction});

    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
}

export default useTableListHook;