import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";
import {StateType} from "../../../pages/states/show/showStateData";

export const defaultStatesResponseData: StatesResponseDataType = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    numberOfElements: 0,
    number: 0,
    first: false,
    last: false,
    empty: true
}

export interface StatesResponseDataType {
    content: Array<StateType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyStateRequestDataType {
    id: string,
}

export interface StatesTableListHookType {
    statesResponseData: StatesResponseDataType,
    isStatesPending: boolean,
    statesAlertData: ErrorAlertType,
    fetchPaginatedStates: (a: boolean) => void,
    fetchPaginatedNeedleStates: (a: string) => void,
    selectedState: StateType,
    showDeleteModal: (a: StateType) => void,
    isDeleteModalOpen: boolean,
    deleteStateAlertData: ErrorAlertType,
    isDeleteStatePending: boolean,
    handleDeleteState: () => void,
    onDeleteModalClose: () => void,
}

export interface StatesTableListHookProps {
    fetchStates: boolean,
    statesBaseUrl: string,
}

export const statesRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};