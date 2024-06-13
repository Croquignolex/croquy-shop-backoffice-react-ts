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
    empty: true
}

export interface SortAndFilterRequestDataType {
    page?: number,
    size?: number,
    needle?: string,
    baseUrl: string
}

export interface SortAndFilterHookType {
    showItems: (a: number) => void,
    search: (a: string) => void,
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
    });

    const showItems = (size: number): void => {
        setSortAndFilterData({...sortAndFilterData, size});
    }

    const search = (needle: string): void => {
        setSortAndFilterData({...sortAndFilterData, needle});
    }

    return {showItems, search, sortAndFilterData};
};

export default useSortAndFilterHook;