import {useState} from "react";

import {PaginationType} from "../helpers/globalTypesHelper";

// ######################################## HOOK ######################################## //

const useSortAndFilterHook = ({baseUrl}: {baseUrl: string}): SortAndFilterHookType => {
    const [sortAndFilterData, setSortAndFilterData] = useState<SortAndFilterRequestDataType>({
        baseUrl,
        size: defaultPaginationData.size,
        page: defaultPaginationData.number,
        sort: "createdAt",
        direction: "desc",
    });

    const handleShowItems = (size: number): void => {
        setSortAndFilterData({...sortAndFilterData, size, page: defaultPaginationData.number});
    }

    const handleSearch = (needle: string): void => {
        setSortAndFilterData({...sortAndFilterData, needle, page: defaultPaginationData.number});
    }

    const handleSort = (sort: string, direction: string): void => {
        setSortAndFilterData({...sortAndFilterData, sort, direction});
    }

    const handleChangePage = (page: number): void => {
        setSortAndFilterData({...sortAndFilterData, page});
    }

    return {handleShowItems, handleSearch, handleSort, handleChangePage, sortAndFilterData};
};

// ######################################## STATICS DATA ######################################## //

export const defaultPaginationData: PaginationType = {
    totalPages: 0,
    totalElements: 0,
    size: 7,
    numberOfElements: 0,
    number: 0,
    first: false,
    last: false,
    empty: true,
}

export interface SortAndFilterRequestDataType {
    page?: number,
    size?: number,
    needle?: string,
    baseUrl: string,
    sort?: string,
    direction?: string,
}

export interface SortAndFilterHookType {
    handleShowItems: (a: number) => void,
    handleSearch: (a: string) => void,
    handleChangePage: (a: number) => void,
    handleSort: (a: string, b: string) => void,
    sortAndFilterData: SortAndFilterRequestDataType
}

export default useSortAndFilterHook;