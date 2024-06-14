import {useState} from "react";

import {PaginationType} from "../helpers/globalTypesHelper";

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
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType
}

export interface SortAndFilterHookProps {
    baseUrl: string,
}

// ######################################## HOOK ######################################## //

const useSortAndFilterHook = ({baseUrl}: SortAndFilterHookProps): SortAndFilterHookType => {
    const [sortAndFilterData, setSortAndFilterData] = useState<SortAndFilterRequestDataType>({
        baseUrl,
        size: defaultPaginationData.size,
        page: defaultPaginationData.number,
        sort: "createdAt",
        direction: "desc",
    });

    const handleShowItems = (size: number): void => {
        setSortAndFilterData({...sortAndFilterData, size});
    }

    const handleSearch = (needle: string): void => {
        setSortAndFilterData({...sortAndFilterData, needle});
    }

    const handleSort = (sort: string, direction: string): void => {
        setSortAndFilterData({...sortAndFilterData, sort, direction});
    }

    return {handleShowItems, handleSearch, handleSort, sortAndFilterData};
};

export default useSortAndFilterHook;